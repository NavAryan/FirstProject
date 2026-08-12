import { dbGet, dbSet, migrateLegacy } from './db.js';
import { defaultState, TODAY_KEY, defaultGoals, goalMap } from './defaults.js';

const clone=value=>structuredClone(value); let state=null;
export function localDateKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function emptyHealth(){return {prayer:false,gym:false,meals:false,water:false,lowScroll:false,sleep:false,sleepHours:null,note:''};}
function emptyPlanner(){return {mode:'execute',availableMinutes:null,behind:false,flexibleTimes:false,lastReplanAt:null};}
function normalizeTask(t){return {...t,goal:t.goal||goalMap[t.area]||'stabilise',project:t.project||t.area||'Life',suggestedTime:t.suggestedTime||''};}
function normalizeDay(day){return {...day,energy:day.energy??3,mood:day.mood||'steady',planner:{...emptyPlanner(),...(day.planner||{})},tasks:(day.tasks||[]).map(normalizeTask),health:{...emptyHealth(),...(day.health||{})},review:day.review??null};}
function mergeDefaults(saved){
  if(!saved)return clone(defaultState); const base=clone(defaultState); const daily={...base.daily};
  Object.entries(saved.daily||{}).forEach(([k,d])=>daily[k]=normalizeDay(d));
  return {...base,...saved,version:4,profile:{...base.profile,...(saved.profile||{})},settings:{...base.settings,...(saved.settings||{})},goals:Array.isArray(saved.goals)?saved.goals:clone(defaultGoals),daily,paths:{...base.paths,...(saved.paths||{})},money:Array.isArray(saved.money)?saved.money:[],brain:Array.isArray(saved.brain)?saved.brain:[],history:Array.isArray(saved.history)?saved.history:[]};
}
function applyLegacy(s,legacy){
  if(!legacy)return s; const day=s.daily[TODAY_KEY]; const oldTasks=legacy.todayTasks||[]; const aliases={admin:'base-car',build:'deep-work',business:'career-dronix'};
  for(const old of oldTasks){const cleaned=(old.title||'').replace(/^\d{2}:\d{2}\s*·\s*/,'');const target=aliases[old.id]||old.id;const match=day.tasks.find(t=>t.id===target||t.title===cleaned||t.title.includes(cleaned));if(match)match.done=Boolean(old.done);}
  if(legacy.money)s.money=legacy.money.map(m=>({...m,date:m.date||TODAY_KEY})); if(legacy.brain)s.brain=legacy.brain;
  if(legacy.health&&day.health){for(const item of legacy.health){const label=String(item[1]||'').toLowerCase();if(label.includes('prayer'))day.health.prayer=Boolean(item[2]);if(label.includes('gym'))day.health.gym=Boolean(item[2]);if(label.includes('meal')||label.includes('protein'))day.health.meals=Boolean(item[2]);if(label.includes('water'))day.health.water=Boolean(item[2]);if(label.includes('scroll'))day.health.lowScroll=Boolean(item[2]);if(label.includes('sleep'))day.health.sleep=Boolean(item[2]);}day.health.note=legacy.healthNote||'';}
  const map={Taxi:'Taxi',ADI:'ADI',Dronix:'Dronix',Jobs:'Career'}; for(const [oldKey,newKey] of Object.entries(map)){const arr=legacy.pathChecks?.[oldKey];if(!Array.isArray(arr))continue;arr.forEach(old=>{const item=s.paths[newKey]?.items?.find(x=>x.id===old[0]||x.label===old[1]);if(item)item.done=Boolean(old[2]);});}
  return s;
}
function latestDay(){const dates=Object.keys(state.daily).sort();return dates.length?state.daily[dates[dates.length-1]]:null;}
export function ensureDay(key=localDateKey(),carry=true){
  if(state.daily[key]){state.daily[key]=normalizeDay(state.daily[key]);return state.daily[key];}
  const previous=latestDay(); const carried=carry?(previous?.tasks||[]).filter(t=>!t.done&&!t.fixed&&!t.bonus).map(t=>({...clone(t),id:`carry-${key}-${t.id}`,time:'',suggestedTime:'',done:false,carried:true,detail:`Carried forward · ${t.detail||''}`})):[];
  state.daily[key]=normalizeDay({date:key,energy:state.profile.defaultEnergy||3,mood:'steady',planner:emptyPlanner(),tasks:carried,health:emptyHealth(),review:null});
  if(previous&&!previous.review){previous.review={auto:true,closedAt:new Date().toISOString(),completed:previous.tasks.filter(t=>t.done).length,total:previous.tasks.length};}
  state.history.push({at:new Date().toISOString(),type:'day_created',date:key,carried:carried.length}); return state.daily[key];
}
export async function initState(){const saved=await dbGet('state');if(saved)state=mergeDefaults(saved);else{const migration=await migrateLegacy();state=clone(defaultState);if(migration?.legacy)state=applyLegacy(state,migration.legacy);}ensureDay();await saveState();return state;}
export function getState(){return state;} export function getToday(){return ensureDay();}
export async function saveState(){await dbSet('state',state);} export async function replaceState(next){state=mergeDefaults(next);ensureDay();await saveState();return state;}
export async function mutate(fn){fn(state);await saveState();return state;} export function addXP(amount){state.xpTotal=Math.max(0,(state.xpTotal||0)+Number(amount||0));}
export async function toggleTask(id,done,dateKey=localDateKey()){const day=ensureDay(dateKey);const task=day.tasks.find(t=>t.id===id);if(!task||task.done===done)return;task.done=done;addXP(done?task.xp:-task.xp);state.history.push({at:new Date().toISOString(),type:done?'task_done':'task_reopened',date:day.date,id:task.id,title:task.title,xp:done?task.xp:-task.xp,goal:task.goal,area:task.area});await saveState();}
export async function recordFocusSession(id,actualMinutes,completed=false,dateKey=localDateKey()){const day=ensureDay(dateKey);const task=day.tasks.find(t=>t.id===id);if(!task)return;const mins=Math.max(0,Math.round(Number(actualMinutes||0)*10)/10);if(mins<0.2)return;state.history.push({at:new Date().toISOString(),type:'focus_session',date:day.date,id:task.id,title:task.title,area:task.area,project:task.project||task.area,plannedMinutes:Number(task.duration||30),actualMinutes:mins,completed:Boolean(completed)});await saveState();}
export async function addTask(task,dateKey=task.date||localDateKey()){const day=ensureDay(dateKey,false);day.tasks.push(normalizeTask({id:`task-${crypto.randomUUID?.()||Date.now()}`,title:task.title,detail:task.detail||'',area:task.area||'Life',goal:task.goal||goalMap[task.area]||'stabilise',project:task.project||task.area||'Life',time:task.time||'',suggestedTime:'',duration:Number(task.duration||30),xp:Number(task.xp||Math.max(25,Math.min(250,((task.impact||3)+(task.urgency||3)+(task.income||0))*10))),done:false,priority:Number(task.priority||3),impact:Number(task.impact||3),urgency:Number(task.urgency||3),income:Number(task.income||0),energy:Number(task.energy||2),fixed:Boolean(task.fixed)}));state.history.push({at:new Date().toISOString(),type:'task_added',date:dateKey,title:task.title});await saveState();}
export async function updateTask(id,patch,dateKey=localDateKey()){const task=ensureDay(dateKey).tasks.find(t=>t.id===id);if(!task)return;Object.assign(task,patch);task.goal=task.goal||goalMap[task.area]||'stabilise';await saveState();}
export async function removeTask(id,dateKey=localDateKey()){const day=ensureDay(dateKey);const index=day.tasks.findIndex(t=>t.id===id);if(index<0)return;const [task]=day.tasks.splice(index,1);if(task.done)addXP(-task.xp);await saveState();}
