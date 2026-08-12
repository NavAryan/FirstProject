// ---- defaults.js ----
const TODAY_KEY = '2026-08-12';

const goalMap = {
  Body: 'live', Health: 'live', Life: 'stabilise', Money: 'survive', Taxi: 'survive', ADI: 'survive', Career: 'stabilise', Business: 'build'
};

const defaultGoals = [
  {id:'survive',icon:'💷',title:'Survive',subtitle:'Income and obligations',target:'Keep cash flow moving without panic.',projects:['Taxi','ADI','Cash flow']},
  {id:'stabilise',icon:'🧱',title:'Stabilise',subtitle:'Career, home and security',target:'Build dependable work and a stable base.',projects:['Career','Accommodation','Admin']},
  {id:'build',icon:'🚀',title:'Build',subtitle:'Business and upside',target:'Create assets and opportunities that can compound.',projects:['Dronix','Products','Portfolio']},
  {id:'live',icon:'❤️',title:'Live',subtitle:'Body, faith and real life',target:'Protect health, faith, relationships and memorable experiences.',projects:['Body','Health','Faith']}
];

const defaultState = {
  version: 3,
  createdAt: new Date().toISOString(),
  profile: {
    name: 'Naweed',
    dailyCashTarget: 60,
    weeklyCashTarget: 400,
    sleepTargetHours: 8,
    defaultEnergy: 3,
    smartPlanning: true,
    haptics: true
  },
  xpTotal: 100,
  history: [],
  goals: defaultGoals,
  daily: {
    '2026-08-12': {
      date: '2026-08-12',
      energy: 3,
      mood: 'steady',
      planner: {mode:'execute',availableMinutes:null,behind:false,flexibleTimes:false,lastReplanAt:null},
      tasks: [
        {id:'sleep',title:'Sleep / Recharge',detail:'Protect roughly 8 hours so the rest of the plan has a functioning brain and body.',area:'Body',goal:'live',project:'Body',time:'01:30',duration:390,xp:100,done:false,priority:5,impact:5,urgency:5,income:0,energy:1,fixed:false},
        {id:'body',title:'Body Online',detail:'Prayer, water, breakfast, gym / conditioning, shower and get ready.',area:'Body',goal:'live',project:'Body',time:'08:00',duration:120,xp:150,done:false,priority:5,impact:5,urgency:4,income:0,energy:3,fixed:false},
        {id:'taxi',title:'Taxi Next Step',detail:'Find the exact Wolverhampton / Mercedes vehicle-licensing action.',area:'Taxi',goal:'survive',project:'Taxi',time:'10:00',duration:30,xp:100,done:false,priority:4,impact:4,urgency:4,income:4,energy:2,fixed:false},
        {id:'adi',title:'ADI Training',detail:'Theory, hazard perception, review mistakes and teaching knowledge.',area:'ADI',goal:'survive',project:'ADI',time:'10:30',duration:30,xp:100,done:false,priority:4,impact:4,urgency:3,income:3,energy:2,fixed:false},
        {id:'shabir',title:'Shabir Driving Lesson',detail:'Teach if available. If cancelled, convert the hour into ADI / taxi progress.',area:'ADI',goal:'survive',project:'ADI',time:'11:00',duration:60,xp:125,done:false,priority:4,impact:4,urgency:3,income:5,energy:3,fixed:false,conditional:true},
        {id:'base-car',title:'Base + Mercedes',detail:'Accommodation shortlist, service status, oil and car-noise next action.',area:'Life',goal:'stabilise',project:'Accommodation',time:'12:00',duration:45,xp:75,done:false,priority:3,impact:3,urgency:2,income:1,energy:2,fixed:false},
        {id:'jubilee',title:'Jubilee Health Centre',detail:'Fixed appointment. Leave enough time for travel and check-in.',area:'Health',goal:'live',project:'Health',time:'14:00',duration:30,xp:150,done:false,priority:5,impact:5,urgency:5,income:0,energy:2,fixed:true,location:'Jubilee Health Centre'},
        {id:'deep-work',title:'Build the Future',detail:'Codex, data, ESG or portfolio. Finish one tangible improvement.',area:'Career',goal:'stabilise',project:'Career',time:'15:00',duration:90,xp:200,done:false,priority:5,impact:5,urgency:3,income:4,energy:4,fixed:false},
        {id:'career-dronix',title:'Career + Dronix',detail:'2–3 quality job applications and one commercial Dronix action.',area:'Business',goal:'build',project:'Dronix',time:'16:30',duration:60,xp:150,done:false,priority:4,impact:5,urgency:3,income:4,energy:3,fixed:false},
        {id:'eclipse',title:'Experience the Eclipse',detail:'Take a real break and experience the eclipse safely.',area:'Life',goal:'live',project:'Life',time:'18:15',duration:65,xp:25,done:false,priority:2,impact:2,urgency:5,income:0,energy:1,fixed:true,bonus:true},
        {id:'cash',title:'Cash Mode',detail:'Delivery work if worthwhile. Protect profitability rather than driving aimlessly.',area:'Money',goal:'survive',project:'Cash flow',time:'19:30',duration:240,xp:150,done:false,priority:4,impact:4,urgency:3,income:5,energy:3,fixed:false}
      ],
      health: {prayer:false,gym:false,meals:false,water:false,lowScroll:false,sleep:false,sleepHours:null,note:''},
      review: null
    }
  },
  paths: {
    Taxi: {icon:'🚕',subtitle:'Cash-flow path',goal:'survive',items:[
      {id:'taxi-date',label:'Check exact Mercedes first-registration date',done:false},
      {id:'taxi-wolves',label:'Confirm Wolverhampton vehicle licensing next step',done:false},
      {id:'taxi-insurance',label:'Confirm hire-and-reward insurance route',done:false},
      {id:'taxi-docs',label:'Prepare vehicle documents',done:false},
      {id:'taxi-inspection',label:'Book inspection / licensing when eligible',done:false}
    ]},
    ADI: {icon:'🚘',subtitle:'Instructor path',goal:'survive',items:[
      {id:'adi-theory',label:'Part 1 theory practice',done:false},
      {id:'adi-hazard',label:'Hazard perception practice',done:false},
      {id:'adi-review',label:'Review weak categories',done:false},
      {id:'adi-teach',label:'Practice structured teaching with Shabir',done:false},
      {id:'adi-mock',label:'Complete a timed mock test',done:false}
    ]},
    Dronix: {icon:'🚁',subtitle:'Business / upside path',goal:'build',items:[
      {id:'dro-post',label:'Publish one portfolio item',done:false},
      {id:'dro-leads',label:'Contact 5 prospects',done:false},
      {id:'dro-follow',label:'Follow up previous leads',done:false},
      {id:'dro-shoot',label:'Arrange one shoot',done:false},
      {id:'dro-offer',label:'Tighten one commercial offer',done:false}
    ]},
    Career: {icon:'💻',subtitle:'Stable future path',goal:'stabilise',items:[
      {id:'car-build',label:'Make one portfolio improvement',done:false},
      {id:'car-apply',label:'Apply to 2–3 high-fit roles',done:false},
      {id:'car-cv',label:'Improve one CV bullet / case study',done:false},
      {id:'car-interview',label:'Complete one interview-prep block',done:false},
      {id:'car-github',label:'Ship one visible GitHub improvement',done:false}
    ]}
  },
  money: [],
  brain: [],
  settings: {compactMode:false,showXP:true,smartPlanner:true,badgeRemaining:true,showReasons:true}
};

// ---- db.js ----
const DB_NAME='mission-control-db'; const DB_VERSION=2; const STORE='kv'; let dbPromise;
function openDB(){if(dbPromise)return dbPromise;dbPromise=new Promise((resolve,reject)=>{const req=indexedDB.open(DB_NAME,DB_VERSION);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE);};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});return dbPromise;}
async function dbGet(key){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readonly');const req=tx.objectStore(STORE).get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
async function dbSet(key,value){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(value,key);tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);});}
async function exportAll(){const state=await dbGet('state');return {app:'Mission Control',schemaVersion:3,exportedAt:new Date().toISOString(),state};}
async function migrateLegacy(){const existing=await dbGet('state');if(existing)return existing;for(const key of ['mission-control-v1','mission-control-v1-1','mission-control-v1.1']){const raw=localStorage.getItem(key);if(!raw)continue;try{return {legacy:JSON.parse(raw)};}catch(_){}}return null;}

// ---- smart.js ----
function minutesFromHHMM(value) {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return null;
  const [h,m] = value.split(':').map(Number);
  return h*60+m;
}
function hhmm(mins){ mins=Math.max(0,Math.min(1439,Math.round(mins))); return `${String(Math.floor(mins/60)).padStart(2,'0')}:${String(mins%60).padStart(2,'0')}`; }
function minutesNow(date = new Date()) { return date.getHours()*60 + date.getMinutes(); }
function taskTime(task){ return minutesFromHHMM(task.suggestedTime || task.time); }

function modeBoost(task, mode='execute') {
  if(mode==='earn') return (task.income||0)*9 + (['Money','Taxi','ADI'].includes(task.area)?18:0);
  if(mode==='build') return (['Career','Business'].includes(task.area)?24:0) + (task.impact||0)*4;
  if(mode==='recover') return (['Body','Health','Life'].includes(task.area)?24:0) - Math.max(0,(task.energy||2)-2)*9;
  if(mode==='plan') return task.fixed ? 10 : ((task.duration||60)<=30 ? 7 : 0);
  return 0;
}

function taskScore(task, context = {}) {
  if (task.done) return -Infinity;
  const nowMin = context.nowMin ?? minutesNow();
  const currentEnergy = context.energy ?? 3;
  const mode = context.mode || 'execute';
  const availableMinutes = context.availableMinutes ?? null;
  const behind = Boolean(context.behind);
  const tMin = taskTime(task);
  let score = 0;
  score += (task.impact ?? 3) * 8;
  score += (task.urgency ?? 3) * 7;
  score += (task.priority ?? 3) * 6;
  score += (task.income ?? 0) * 5;
  score += modeBoost(task,mode);

  const energyGap = Math.abs((task.energy ?? 2) - currentEnergy);
  score -= energyGap * (mode==='recover'?7:4);
  if ((task.duration ?? 60) <= 30) score += behind ? 14 : 5;
  else if ((task.duration ?? 60) > 120) score -= behind ? 18 : 3;
  if (availableMinutes && !task.fixed) {
    if ((task.duration||30) <= availableMinutes) score += 18;
    else score -= 120;
  }
  if (tMin !== null) {
    const delta = tMin - nowMin;
    if (task.fixed) {
      if (delta >= 0 && delta <= 120) score += 80 - Math.max(0, delta-15)*0.38;
      if (delta < 0 && Math.abs(delta) <= (task.duration ?? 30)+45) score += 70;
      if (delta < -(task.duration ?? 30)-45) score -= 100;
    } else if (!context.flexibleTimes) {
      if (delta >= -30 && delta <= 90) score += 16;
      if (delta < -180) score -= behind ? 2 : 7;
    }
  }
  if (task.conditional) score -= 4;
  if (task.bonus) score -= 12;
  return score;
}

function getNextTask(tasks, context = {}) {
  const open = tasks.filter(t => !t.done);
  if (!open.length) return null;
  return [...open].sort((a,b) => taskScore(b, context)-taskScore(a, context))[0];
}

function plannerReason(task, tasks, context = {}) {
  if (!task) return 'Everything important is complete.';
  const nowMin = context.nowMin ?? minutesNow();
  const tMin = taskTime(task);
  const reasons = [];
  if(context.mode==='earn' && (task.income||0)>=3) reasons.push('your Earn mode favours cash-producing work');
  if(context.mode==='build' && ['Career','Business'].includes(task.area)) reasons.push('your Build mode protects long-term progress');
  if(context.mode==='recover' && ['Body','Health','Life'].includes(task.area)) reasons.push('your Recover mode protects your capacity');
  if(context.availableMinutes && (task.duration||0)<=context.availableMinutes) reasons.push(`it fits your ${context.availableMinutes}-minute window`);
  if(context.behind && (task.duration||60)<=30) reasons.push('it is a short recovery win while you are behind');
  if (task.fixed && tMin !== null) {
    const delta = tMin-nowMin;
    if (delta > 0 && delta <= 120) reasons.push(`it is fixed in about ${Math.max(1,Math.round(delta))} min`);
    else if (delta <= 0) reasons.push('the fixed event is due now');
  }
  if ((task.income ?? 0) >= 4) reasons.push('it has strong income impact');
  if ((task.impact ?? 0) >= 5) reasons.push('it has high long-term impact');
  if ((task.urgency ?? 0) >= 4) reasons.push('it is time-sensitive');
  const nextFixed = tasks.filter(t=>!t.done&&t.fixed&&taskTime(t)!==null&&taskTime(t)>nowMin).sort((a,b)=>taskTime(a)-taskTime(b))[0];
  if (!task.fixed && nextFixed) {
    const gap=taskTime(nextFixed)-nowMin;
    if ((task.duration||60) <= Math.max(0,gap-25)) reasons.push(`it fits before ${nextFixed.title}`);
  }
  return reasons.length ? `Why now: ${reasons.slice(0,3).join(' · ')}.` : 'Why now: best balance of impact, urgency, timing and effort.';
}

function dayReadiness(tasks) {
  const core = tasks.filter(t=>!t.bonus);
  if (!core.length) return 100;
  const weightedTotal = core.reduce((s,t)=>s+(t.xp||50),0);
  const weightedDone = core.filter(t=>t.done).reduce((s,t)=>s+(t.xp||50),0);
  return Math.round(weightedDone/weightedTotal*100);
}

function estimateFreeWindow(tasks, date = new Date()) {
  const nowMin=minutesNow(date);
  const nextFixed=tasks.filter(t=>!t.done&&t.fixed).map(t=>({t,m:taskTime(t)})).filter(x=>x.m!==null&&x.m>nowMin).sort((a,b)=>a.m-b.m)[0];
  if(!nextFixed) return null;
  return {minutes:Math.max(0,nextFixed.m-nowMin),next:nextFixed.t};
}

function replanSchedule(tasks, context={}) {
  const nowMin=context.nowMin??minutesNow();
  const mode=context.mode||'execute';
  const energy=context.energy??3;
  const fixed=tasks.filter(t=>!t.done&&t.fixed&&minutesFromHHMM(t.time)!==null).sort((a,b)=>minutesFromHHMM(a.time)-minutesFromHHMM(b.time));
  const flexible=tasks.filter(t=>!t.done&&!t.fixed&&!t.bonus).sort((a,b)=>taskScore(b,{...context,mode,energy,flexibleTimes:true})-taskScore(a,{...context,mode,energy,flexibleTimes:true}));
  const result={};
  let cursor=nowMin+5;
  const dayEnd=23*60+30;
  for(const task of flexible){
    const dur=Math.max(10,Number(task.duration||30));
    let placed=false;
    for(let guard=0;guard<20&&!placed;guard++){
      const collision=fixed.find(f=>{const fm=minutesFromHHMM(f.time), fend=fm+(f.duration||30); return cursor < fend+20 && cursor+dur > fm-20;});
      if(collision){
        const fm=minutesFromHHMM(collision.time);
        if(cursor+dur<=fm-20){ placed=true; break; }
        cursor=fm+(collision.duration||30)+20;
      } else placed=true;
    }
    if(placed && cursor+dur<=dayEnd){ result[task.id]=hhmm(cursor); cursor+=dur+10; }
    else result[task.id]='';
  }
  return result;
}

function computeInsights(state, day) {
  const tasks=day.tasks||[]; const done=tasks.filter(t=>t.done); const core=tasks.filter(t=>!t.bonus);
  const money=(state.money||[]).filter(x=>!x.date||x.date===day.date);
  const income=money.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.amount||0),0);
  const expense=money.filter(x=>x.type==='expense').reduce((s,x)=>s+Number(x.amount||0),0);
  const hours=money.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.hours||0),0);
  const morning=tasks.filter(t=>taskTime(t)!==null&&taskTime(t)<12*60);
  const afternoon=tasks.filter(t=>taskTime(t)!==null&&taskTime(t)>=12*60&&taskTime(t)<18*60);
  const evening=tasks.filter(t=>taskTime(t)!==null&&taskTime(t)>=18*60);
  const pct=arr=>arr.length?Math.round(arr.filter(t=>t.done).length/arr.length*100):0;
  const areaMap={}; tasks.forEach(t=>{if(!areaMap[t.area])areaMap[t.area]={total:0,done:0};areaMap[t.area].total++;if(t.done)areaMap[t.area].done++;});
  const bestArea=Object.entries(areaMap).sort((a,b)=>(b[1].done/b[1].total)-(a[1].done/a[1].total))[0];
  return {completion:core.length?Math.round(core.filter(t=>t.done).length/core.length*100):0,morning:pct(morning),afternoon:pct(afternoon),evening:pct(evening),income,expense,net:income-expense,hourly:hours?income/hours:null,doneCount:done.length,bestArea:bestArea?bestArea[0]:'—',smartMessage:done.length>=6?'Momentum is strong. Protect the next high-impact block instead of adding more tasks.':done.length>=3?'You have momentum. Finish one important path task before opening another loop.':'Reduce friction: complete one short, high-impact mission first.'};
}

function weeklyInsights(state, anchorDate=new Date()) {
  const days=[];
  for(let i=6;i>=0;i--){const d=new Date(anchorDate);d.setHours(12,0,0,0);d.setDate(d.getDate()-i);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;const day=state.daily[key];const tasks=day?.tasks||[];const core=tasks.filter(t=>!t.bonus);days.push({key,label:new Intl.DateTimeFormat(undefined,{weekday:'short'}).format(d),completion:core.length?Math.round(core.filter(t=>t.done).length/core.length*100):null,done:core.filter(t=>t.done).length,total:core.length});}
  const usable=days.filter(d=>d.completion!==null);
  const avg=usable.length?Math.round(usable.reduce((s,d)=>s+d.completion,0)/usable.length):0;
  const lane={survive:{done:0,total:0},stabilise:{done:0,total:0},build:{done:0,total:0},live:{done:0,total:0}};
  usable.forEach(({key})=>(state.daily[key]?.tasks||[]).filter(t=>!t.bonus).forEach(t=>{const g=t.goal||goalMap[t.area]||'stabilise';if(!lane[g])return;lane[g].total++;if(t.done)lane[g].done++;}));
  const lanePct=Object.fromEntries(Object.entries(lane).map(([k,v])=>[k,v.total?Math.round(v.done/v.total*100):0]));
  const weakest=Object.entries(lanePct).filter(([,v])=>v>0||usable.length).sort((a,b)=>a[1]-b[1])[0]?.[0]||'build';
  return {days,avg,lanePct,weakest,baselineDays:usable.length};
}

function parseCapture(text, now=new Date()) {
  const raw=String(text||'').trim(); const lower=raw.toLowerCase();
  let area='Life',goal='stabilise',project='Life';
  if(/taxi|wolverhampton|private hire|vehicle licen/.test(lower)){area='Taxi';goal='survive';project='Taxi';}
  else if(/adi|driving instructor|theory|hazard|shabir|lesson/.test(lower)){area='ADI';goal='survive';project='ADI';}
  else if(/dronix|drone|client|prospect|shoot/.test(lower)){area='Business';goal='build';project='Dronix';}
  else if(/job|cv|interview|codex|data|portfolio|github|sql|python/.test(lower)){area='Career';goal='stabilise';project='Career';}
  else if(/gym|workout|exercise|conditioning|run/.test(lower)){area='Body';goal='live';project='Body';}
  else if(/deliver|cash|earn|income|money|fuel/.test(lower)){area='Money';goal='survive';project='Cash flow';}
  else if(/doctor|health|appointment|hospital|gp/.test(lower)){area='Health';goal='live';project='Health';}
  let duration=/\b(\d{1,3})\s*(?:min|mins|minutes)\b/.exec(lower)?.[1]; duration=duration?Number(duration):null;
  const hours=/\b(\d+(?:\.\d+)?)\s*(?:hour|hours|hr|hrs)\b/.exec(lower)?.[1]; if(!duration&&hours)duration=Math.round(Number(hours)*60);
  if(!duration) duration=/call|message|email|check|book/.test(lower)?15:30;
  let time=''; const tm=/\b(?:at\s*)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/.exec(lower); if(tm){let h=Number(tm[1])%12;if(tm[3]==='pm')h+=12;time=`${String(h).padStart(2,'0')}:${String(Number(tm[2]||0)).padStart(2,'0')}`;}
  const tomorrow=/\btomorrow\b/.test(lower); const target=new Date(now); if(tomorrow)target.setDate(target.getDate()+1);
  const date=`${target.getFullYear()}-${String(target.getMonth()+1).padStart(2,'0')}-${String(target.getDate()).padStart(2,'0')}`;
  const fixed=/appointment|meeting|test|assessment|doctor|hospital|at\s+\d/.test(lower) && Boolean(time);
  const income=/£|paid|earn|delivery|lesson|client/.test(lower)?4:0;
  const cleaned=raw.replace(/\b(today|tomorrow)\b/ig,'').replace(/\b(?:at\s*)?\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/ig,'').replace(/\b\d+(?:\.\d+)?\s*(?:min|mins|minutes|hour|hours|hr|hrs)\b/ig,'').replace(/\bfor\b\s*$/i,'').replace(/\s+/g,' ').trim();
  return {title:cleaned||raw,detail:'Captured in Command Centre',area,goal,project,date,time,duration,impact:3,urgency:tomorrow?3:4,income,energy:area==='Career'?4:2,priority:3,fixed};
}

// ---- state.js ----
const clone=value=>structuredClone(value); let state=null;
function localDateKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function emptyHealth(){return {prayer:false,gym:false,meals:false,water:false,lowScroll:false,sleep:false,sleepHours:null,note:''};}
function emptyPlanner(){return {mode:'execute',availableMinutes:null,behind:false,flexibleTimes:false,lastReplanAt:null};}
function normalizeTask(t){return {...t,goal:t.goal||goalMap[t.area]||'stabilise',project:t.project||t.area||'Life',suggestedTime:t.suggestedTime||''};}
function normalizeDay(day){return {...day,energy:day.energy??3,mood:day.mood||'steady',planner:{...emptyPlanner(),...(day.planner||{})},tasks:(day.tasks||[]).map(normalizeTask),health:{...emptyHealth(),...(day.health||{})},review:day.review??null};}
function mergeDefaults(saved){
  if(!saved)return clone(defaultState); const base=clone(defaultState); const daily={...base.daily};
  Object.entries(saved.daily||{}).forEach(([k,d])=>daily[k]=normalizeDay(d));
  return {...base,...saved,version:3,profile:{...base.profile,...(saved.profile||{})},settings:{...base.settings,...(saved.settings||{})},goals:Array.isArray(saved.goals)?saved.goals:clone(defaultGoals),daily,paths:{...base.paths,...(saved.paths||{})},money:Array.isArray(saved.money)?saved.money:[],brain:Array.isArray(saved.brain)?saved.brain:[],history:Array.isArray(saved.history)?saved.history:[]};
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
function ensureDay(key=localDateKey(),carry=true){
  if(state.daily[key]){state.daily[key]=normalizeDay(state.daily[key]);return state.daily[key];}
  const previous=latestDay(); const carried=carry?(previous?.tasks||[]).filter(t=>!t.done&&!t.fixed&&!t.bonus).map(t=>({...clone(t),id:`carry-${key}-${t.id}`,time:'',suggestedTime:'',done:false,carried:true,detail:`Carried forward · ${t.detail||''}`})):[];
  state.daily[key]=normalizeDay({date:key,energy:state.profile.defaultEnergy||3,mood:'steady',planner:emptyPlanner(),tasks:carried,health:emptyHealth(),review:null});
  if(previous&&!previous.review){previous.review={auto:true,closedAt:new Date().toISOString(),completed:previous.tasks.filter(t=>t.done).length,total:previous.tasks.length};}
  state.history.push({at:new Date().toISOString(),type:'day_created',date:key,carried:carried.length}); return state.daily[key];
}
async function initState(){const saved=await dbGet('state');if(saved)state=mergeDefaults(saved);else{const migration=await migrateLegacy();state=clone(defaultState);if(migration?.legacy)state=applyLegacy(state,migration.legacy);}ensureDay();await saveState();return state;}
function getState(){return state;} function getToday(){return ensureDay();}
async function saveState(){await dbSet('state',state);} async function replaceState(next){state=mergeDefaults(next);ensureDay();await saveState();return state;}
async function mutate(fn){fn(state);await saveState();return state;} function addXP(amount){state.xpTotal=Math.max(0,(state.xpTotal||0)+Number(amount||0));}
async function toggleTask(id,done,dateKey=localDateKey()){const day=ensureDay(dateKey);const task=day.tasks.find(t=>t.id===id);if(!task||task.done===done)return;task.done=done;addXP(done?task.xp:-task.xp);state.history.push({at:new Date().toISOString(),type:done?'task_done':'task_reopened',date:day.date,id:task.id,title:task.title,xp:done?task.xp:-task.xp,goal:task.goal,area:task.area});await saveState();}
async function addTask(task,dateKey=task.date||localDateKey()){const day=ensureDay(dateKey,false);day.tasks.push(normalizeTask({id:`task-${crypto.randomUUID?.()||Date.now()}`,title:task.title,detail:task.detail||'',area:task.area||'Life',goal:task.goal||goalMap[task.area]||'stabilise',project:task.project||task.area||'Life',time:task.time||'',suggestedTime:'',duration:Number(task.duration||30),xp:Number(task.xp||Math.max(25,Math.min(250,((task.impact||3)+(task.urgency||3)+(task.income||0))*10))),done:false,priority:Number(task.priority||3),impact:Number(task.impact||3),urgency:Number(task.urgency||3),income:Number(task.income||0),energy:Number(task.energy||2),fixed:Boolean(task.fixed)}));state.history.push({at:new Date().toISOString(),type:'task_added',date:dateKey,title:task.title});await saveState();}
async function updateTask(id,patch,dateKey=localDateKey()){const task=ensureDay(dateKey).tasks.find(t=>t.id===id);if(!task)return;Object.assign(task,patch);task.goal=task.goal||goalMap[task.area]||'stabilise';await saveState();}
async function removeTask(id,dateKey=localDateKey()){const day=ensureDay(dateKey);const index=day.tasks.findIndex(t=>t.id===id);if(index<0)return;const [task]=day.tasks.splice(index,1);if(task.done)addXP(-task.xp);await saveState();}

// ---- ui.js ----
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const icons={Body:'🏋️',Taxi:'🚕',ADI:'🚘',Life:'🏠',Health:'🏥',Career:'💻',Business:'🚁',Money:'💷'};
const areaIcon=area=>icons[area]||'⚡';
const modeMeta={execute:['⚡','Execute','Do the best next thing'],earn:['💷','Earn','Prioritise cash flow'],build:['🚀','Build','Protect long-term upside'],recover:['🌙','Recover','Restore capacity'],plan:['🧭','Plan','Organise before acting']};
function formatDayLabel(dateKey){const d=new Date(dateKey+'T12:00:00');return new Intl.DateTimeFormat(undefined,{weekday:'long',day:'numeric',month:'long'}).format(d);}
function timeLabel(task){return task.suggestedTime||task.time||'Flexible';}
function context(day){return {energy:day.energy,mode:day.planner?.mode||'execute',availableMinutes:day.planner?.availableMinutes,behind:day.planner?.behind,flexibleTimes:day.planner?.flexibleTimes};}
function taskCard(task,currentId,showXP=true){const tags=[task.area,timeLabel(task),task.duration?`${task.duration} min`:null].filter(Boolean);return `<article class="task-card ${task.done?'done':''} ${task.id===currentId?'current':''}" data-task-id="${esc(task.id)}"><input class="check task-toggle" type="checkbox" ${task.done?'checked':''} aria-label="Complete ${esc(task.title)}"><div class="task-main task-open" role="button"><div class="task-title">${areaIcon(task.area)} ${esc(task.title)}</div><div class="task-meta">${esc(task.detail)}</div><div class="task-footer">${tags.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}${task.suggestedTime&&task.suggestedTime!==task.time?'<span class="tag replan-tag">replanned</span>':''}${task.fixed?'<span class="tag priority-high">fixed</span>':''}${task.carried?'<span class="tag">carried</span>':''}</div></div>${showXP?`<div class="xp">+${task.xp}</div>`:''}</article>`;}
function timeline(day){const now=minutesNow();const list=[...day.tasks].filter(t=>taskTime(t)!==null).sort((a,b)=>taskTime(a)-taskTime(b));let inserted=false;const rows=[];for(let i=0;i<list.length;i++){const t=list[i];if(!inserted&&taskTime(t)>=now){rows.push(`<div class="now-row"><span>${new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date())}</span><i></i><strong>NOW</strong></div>`);inserted=true;}rows.push(`<div class="timeline-row ${t.done?'timeline-done':''}"><div class="timeline-time">${esc(timeLabel(t))}</div><div class="timeline-mark"><div class="timeline-dot"></div>${i<list.length-1?'<div class="timeline-line"></div>':''}</div><div class="timeline-content"><strong>${esc(t.title)}</strong><small>${esc(t.area)} · ${t.duration||30} min${t.fixed?' · fixed':''}</small></div></div>`);}if(!inserted)rows.push(`<div class="now-row"><span>${new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date())}</span><i></i><strong>NOW</strong></div>`);return rows.join('');}
function goalStats(state,day,goalId){const tasks=day.tasks.filter(t=>(t.goal||'stabilise')===goalId&&!t.bonus);const done=tasks.filter(t=>t.done).length;const pathItems=Object.values(state.paths).filter(p=>p.goal===goalId).flatMap(p=>p.items||[]);const pDone=pathItems.filter(i=>i.done).length;const total=tasks.length+pathItems.length;return {done:done+pDone,total,pct:total?Math.round((done+pDone)/total*100):0};}

function todayView(state,day){const ctx=context(day);const next=state.settings.smartPlanner?getNextTask(day.tasks,ctx):day.tasks.find(t=>!t.done);const readiness=dayReadiness(day.tasks);const income=state.money.filter(x=>x.type==='income'&&(!x.date||x.date===day.date)).reduce((s,x)=>s+Number(x.amount||0),0);const free=estimateFreeWindow(day.tasks);const coreOpen=day.tasks.filter(t=>!t.done&&!t.bonus).length;const mode=day.planner?.mode||'execute';const meta=modeMeta[mode];return `<div class="view-enter">
<section class="now-hero"><div class="now-clock" id="liveClock">${new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date())}</div><div class="date-label">${esc(formatDayLabel(day.date))} · ${esc(meta[1].toUpperCase())}</div><h2>${next?`${areaIcon(next.area)} ${esc(next.title)}`:'🏆 Core missions complete'}</h2><p>${next?esc(next.detail):'Close the day cleanly and decide tomorrow’s top three.'}</p><div class="now-actions">${next?`<button class="primary start-focus" data-id="${esc(next.id)}">Start now</button><button class="secondary mark-next-done" data-id="${esc(next.id)}">Done</button>`:''}<button class="ghost command-open">⌘ Capture</button></div>${next?`<div class="intelligence-strip"><span>SMART NEXT</span><p>${esc(plannerReason(next,day.tasks,ctx))}</p></div>`:''}</section>
<section class="mode-strip" aria-label="Execution mode">${Object.entries(modeMeta).map(([id,m])=>`<button class="mode-btn ${mode===id?'active':''}" data-mode="${id}"><span>${m[0]}</span><b>${m[1]}</b><small>${m[2]}</small></button>`).join('')}</section>
<section class="metrics metrics-4"><div class="metric"><span>DAY</span><strong>${readiness}%</strong></div><div class="metric"><span>LEFT</span><strong>${coreOpen}</strong></div><div class="metric"><span>CASH</span><strong>£${income.toFixed(0)}</strong></div><div class="metric"><span>ENERGY</span><strong>${day.energy}/5</strong></div></section><section class="energy-row"><span>How are you running?</span><div>${[1,2,3,4,5].map(n=>`<button class="energy-btn ${day.energy===n?'active':''}" data-energy="${n}">${n}</button>`).join('')}</div></section>
<section class="section"><div class="section-head"><h3>Reality controls</h3><small>${free?`${free.minutes} min to ${esc(free.next.title)}`:'Open runway'}</small></div><div class="reality-grid"><button class="reality-btn planner-action" data-action="behind">⏱️<span><b>I'm behind</b><small>Compress the plan</small></span></button><button class="reality-btn planner-action" data-action="low">🪫<span><b>Low energy</b><small>Reduce cognitive load</small></span></button><button class="reality-btn planner-action" data-action="30">◷<span><b>I have 30 min</b><small>Find a clean fit</small></span></button><button class="reality-btn planner-action" data-action="changed">↻<span><b>Plans changed</b><small>Rebuild remaining day</small></span></button></div>${day.planner?.behind||day.planner?.availableMinutes||day.planner?.flexibleTimes?`<button class="text-button planner-action" data-action="reset">Reset temporary planner context</button>`:''}</section>
<section class="section"><div class="section-head"><h3>Live timeline</h3><button class="pill planner-action" data-action="replan">Replan remaining</button></div><div class="panel timeline">${timeline(day)}</div></section>
<section class="section"><div class="section-head"><h3>Mission queue</h3><small>${day.tasks.filter(t=>t.done).length}/${day.tasks.length}</small></div><div class="task-list">${day.tasks.map(t=>taskCard(t,next?.id,state.settings.showXP)).join('')}</div></section>
<button class="fab command-open" aria-label="Open Command Centre">⌘</button></div>`;}

function focusView(state,day,focusState){const next=focusState.taskId?day.tasks.find(t=>t.id===focusState.taskId):getNextTask(day.tasks,context(day));const seconds=focusState.remaining??((next?.duration||25)*60);const mm=String(Math.floor(seconds/60)).padStart(2,'0'),ss=String(seconds%60).padStart(2,'0');return `<div class="view-enter"><section class="focus-stage"><div class="date-label">FOCUS MODE</div><div class="focus-orb"><div><strong id="focusTime">${mm}:${ss}</strong><small>${focusState.running?'IN MOTION':'READY'}</small></div></div><h2>${next?esc(next.title):'Choose a mission'}</h2><p>${next?esc(next.detail):'Open Today and choose what deserves your attention.'}</p><div class="button-row centered"><button class="primary" id="focusToggle" ${next?'':'disabled'}>${focusState.running?'Pause':'Begin'}</button><button class="secondary" id="focusReset" ${next?'':'disabled'}>Reset</button></div>${next?`<div class="focus-meta"><span class="tag">${esc(next.area)}</span><span class="tag">${next.duration} min</span><span class="tag">+${next.xp} XP</span></div><div class="finish-grid"><button class="primary focus-complete" data-id="${esc(next.id)}">✓ Complete</button><button class="secondary focus-blocked" data-id="${esc(next.id)}">↻ Postpone</button></div>`:''}</section></div>`;}

function planView(state,day){const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);const tKey=`${tomorrow.getFullYear()}-${String(tomorrow.getMonth()+1).padStart(2,'0')}-${String(tomorrow.getDate()).padStart(2,'0')}`;const tDay=state.daily[tKey];return `<div class="view-enter"><section class="hero"><div class="date-label">LIFE ARCHITECTURE</div><h2>Today's emergencies should not steal your future.</h2><p>Every action belongs to one of four lanes. Mission Control watches the balance.</p></section><section class="section goal-grid">${state.goals.map(g=>{const s=goalStats(state,day,g.id);return `<article class="goal-card"><div class="goal-top"><div class="goal-icon">${g.icon}</div><div><h3>${esc(g.title)}</h3><p>${esc(g.subtitle)}</p></div><strong>${s.pct}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${s.pct}%"></div></div><div class="project-chips">${g.projects.map(p=>`<span class="tag">${esc(p)}</span>`).join('')}</div><p class="goal-target">${esc(g.target)}</p><button class="secondary goal-add" data-goal="${g.id}" data-project="${esc(g.projects[0])}">+ Add action</button></article>`;}).join('')}</section>
<section class="section"><div class="section-head"><h3>Tomorrow</h3><button class="secondary command-open">Add naturally</button></div>${tDay?.tasks?.length?`<div class="tomorrow-list">${tDay.tasks.map(t=>`<div class="tomorrow-card"><span>${areaIcon(t.area)}</span><div><strong>${esc(t.title)}</strong><small>${esc(t.time||'Flexible')} · ${t.duration||30} min · ${esc(t.project||t.area)}</small></div></div>`).join('')}</div>`:'<div class="empty">No missions are deliberately placed tomorrow yet. That can be a good thing.</div>'}</section>
<section class="section"><div class="section-head"><h3>Calendar layer</h3></div><div class="install-card"><strong>Import fixed events from an .ics calendar file</strong><p class="task-meta">Events are read on-device and turned into fixed missions. Nothing is uploaded anywhere.</p><button class="secondary" id="importICS">Import .ics</button><input id="icsFile" type="file" accept="text/calendar,.ics" hidden></div></section></div>`;}

function pathCard(name,path){const done=path.items.filter(x=>x.done).length,pct=Math.round(done/path.items.length*100);const next=path.items.find(x=>!x.done);return `<section class="path-card"><div class="path-header"><div class="icon-bubble">${path.icon}</div><div><h4>${esc(name)}</h4><p>${esc(path.subtitle)}</p></div><span class="pill">${pct}% READY</span></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>${next?`<div class="path-next"><small>NEXT ACTION</small><strong>${esc(next.label)}</strong></div>`:'<div class="path-next complete"><strong>Path checklist complete ✓</strong></div>'}<div class="mini-list">${path.items.map(i=>`<label class="mini-item ${i.done?'muted':''}"><input type="checkbox" class="path-toggle" data-path="${esc(name)}" data-id="${esc(i.id)}" ${i.done?'checked':''}><span>${esc(i.label)}</span></label>`).join('')}</div></section>`;}
function pathsView(state){return `<div class="view-enter"><section class="hero"><div class="date-label">ACTIVE PATHS</div><h2>Each path is a mini-product.</h2><p>See readiness, the next action and progress without digging through a generic checklist.</p></section><section class="section grid-2">${Object.entries(state.paths).map(([n,p])=>pathCard(n,p)).join('')}</section></div>`;}

function insightsView(state,day){const i=computeInsights(state,day),w=weeklyInsights(state);const bars=[i.morning,i.afternoon,i.evening];const laneNames={survive:'💷 Survive',stabilise:'🧱 Stabilise',build:'🚀 Build',live:'❤️ Live'};return `<div class="view-enter"><section class="hero"><div class="date-label">WEEKLY INTELLIGENCE</div><h2>${esc(i.smartMessage)}</h2><p>${w.baselineDays<3?`Mission Control is building your baseline. ${w.baselineDays} day${w.baselineDays===1?'':'s'} of usable history so far.`:`Your 7-day completion average is ${w.avg}%.`}</p></section><section class="week-strip">${w.days.map(d=>`<div class="week-day"><span>${d.label}</span><div class="week-bar"><i style="height:${d.completion??4}%"></i></div><b>${d.completion===null?'—':d.completion+'%'}</b></div>`).join('')}</section><section class="section grid-2"><article class="insight-card"><span class="muted small">TODAY</span><strong>${i.completion}%</strong><p>${i.doneCount} missions complete.</p></article><article class="insight-card"><span class="muted small">NET CASH</span><strong class="${i.net>=0?'positive':'negative'}">£${i.net.toFixed(2)}</strong><p>${i.hourly?`£${i.hourly.toFixed(2)}/hour from logged income time.`:'Add hours to income entries to learn your effective rate.'}</p></article><article class="insight-card"><span class="muted small">DAY SHAPE</span><strong>${Math.max(...bars)}%</strong><div class="spark"><i style="height:${Math.max(6,i.morning)}%"></i><i style="height:${Math.max(6,i.afternoon)}%"></i><i style="height:${Math.max(6,i.evening)}%"></i></div><p>Morning ${i.morning}% · afternoon ${i.afternoon}% · evening ${i.evening}%.</p></article><article class="insight-card"><span class="muted small">BALANCE SIGNAL</span><strong>${laneNames[w.weakest]}</strong><p>${w.baselineDays<2?'Needs more history before this becomes meaningful.':'This lane has received the least completion attention this week.'}</p></article></section><section class="section"><div class="section-head"><h3>Life balance</h3></div><div class="panel lane-list">${Object.entries(w.lanePct).map(([k,v])=>`<div class="lane-row"><span>${laneNames[k]}</span><div class="progress-track"><div class="progress-fill" style="width:${v}%"></div></div><b>${v}%</b></div>`).join('')}</div></section><section class="section"><div class="section-head"><h3>Achievements</h3></div><div class="achievement-grid"><div class="achievement ${state.xpTotal>=1000?'unlocked':''}"><span>🏆</span><b>Level Up</b><small>1,000 total XP</small></div><div class="achievement ${state.history.filter(h=>h.type==='task_done').length>=10?'unlocked':''}"><span>⚡</span><b>Executor</b><small>10 missions completed</small></div><div class="achievement ${state.money.some(m=>m.type==='income')?'unlocked':''}"><span>💷</span><b>Cash Logged</b><small>Track real income</small></div><div class="achievement ${Object.values(state.paths).some(p=>p.items.every(i=>i.done))?'unlocked':''}"><span>🧭</span><b>Path Clear</b><small>Complete a path</small></div></div></section></div>`;}

function moreView(state,day){const dailyMoney=state.money.filter(x=>!x.date||x.date===day.date);const income=dailyMoney.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.amount||0),0),expense=dailyMoney.filter(x=>x.type==='expense').reduce((s,x)=>s+Number(x.amount||0),0),net=income-expense;const health=day.health;const healthItems=[['prayer','Prayer / spiritual reset'],['gym','Gym / conditioning'],['meals','Proper meals / protein'],['water','Water'],['lowScroll','Avoid pointless scrolling'],['sleep','Sleep target']];const bySource={};state.money.filter(m=>m.type==='income').forEach(m=>{const k=m.source||m.note||'Other';if(!bySource[k])bySource[k]={amount:0,hours:0};bySource[k].amount+=Number(m.amount||0);bySource[k].hours+=Number(m.hours||0);});const rates=Object.entries(bySource).filter(([,v])=>v.hours>0).map(([k,v])=>({k,rate:v.amount/v.hours})).sort((a,b)=>b.rate-a.rate);return `<div class="view-enter"><section class="hero"><div class="date-label">LIFE SYSTEMS</div><h2>Body, money, brain and settings.</h2><p>The quiet systems that keep everything else working.</p></section><section class="section"><div class="section-head"><h3>Body & discipline</h3></div><div class="panel">${healthItems.map(([k,label])=>`<label class="task-card ${health[k]?'done':''}"><input class="check health-toggle" data-key="${k}" type="checkbox" ${health[k]?'checked':''}><div class="task-main"><div class="task-title">${esc(label)}</div></div><span class="xp">+15</span></label>`).join('')}<div class="field"><label>Hours slept</label><input class="input" id="sleepHours" type="number" min="0" max="14" step="0.25" value="${health.sleepHours??''}" placeholder="8"></div><div class="field"><label>Conditioning note</label><textarea id="healthNote">${esc(health.note||'')}</textarea></div></div></section><section class="section"><div class="section-head"><h3>Money intelligence</h3><span class="pill ${net>=0?'positive':'negative'}">NET £${net.toFixed(2)}</span></div><div class="panel"><div class="metrics"><div class="metric"><span>INCOME</span><strong class="positive">£${income.toFixed(0)}</strong></div><div class="metric"><span>EXPENSE</span><strong class="negative">£${expense.toFixed(0)}</strong></div><div class="metric"><span>TARGET</span><strong>£${state.profile.dailyCashTarget}</strong></div></div>${rates.length?`<div class="money-insight">Best logged effective rate: <strong>${esc(rates[0].k)} · £${rates[0].rate.toFixed(2)}/hr</strong></div>`:''}<div class="form-grid"><div class="field"><label>Amount</label><input id="moneyAmount" class="input" type="number" step="0.01"></div><div class="field"><label>Type</label><select id="moneyType"><option value="income">Income</option><option value="expense">Expense</option></select></div><div class="field"><label>Source</label><input id="moneySource" class="input" placeholder="Deliveroo / Shabir / Dronix"></div><div class="field"><label>Hours</label><input id="moneyHours" class="input" type="number" step="0.25" placeholder="4"></div></div><div class="field"><label>Note</label><input id="moneyNote" class="input" placeholder="Optional detail"></div><button class="primary full" id="addMoney">Log transaction</button><ul class="entry-list">${dailyMoney.slice(0,8).map(m=>`<li><div class="entry-top"><div><strong>${esc(m.source||m.note||m.type)}</strong><div class="task-meta">${m.hours?`${m.hours}h · `:''}${esc(m.note||'')}</div></div><span class="${m.type==='income'?'positive':'negative'}">${m.type==='income'?'+':'-'}£${Number(m.amount).toFixed(2)}</span></div></li>`).join('')}</ul></div></section><section class="section"><div class="section-head"><h3>Brain dump</h3><span class="pill">${state.brain.length}</span></div><div class="panel"><textarea id="brainInput" placeholder="Park the thought here instead of carrying it around..."></textarea><button class="primary full" id="addBrain">Save thought</button></div><ul class="entry-list">${state.brain.map((n,idx)=>`<li><div class="brain-item"><span>${esc(n.text||n)}</span><button class="ghost brain-done" data-index="${idx}">Done</button></div></li>`).join('')}</ul></section><section class="section"><div class="section-head"><h3>Backup & data</h3></div><div class="install-card"><strong>Private by default.</strong><p class="task-meta">Your operational data stays in this browser unless you export it.</p><div class="button-row"><button class="secondary" id="exportBackup">Export backup</button><button class="secondary" id="importBackup">Import backup</button><input id="importFile" type="file" accept="application/json,.json" hidden></div></div></section><section class="section"><div class="section-head"><h3>Settings</h3></div><div class="settings-list"><label class="setting-row"><div><strong>Smart planner</strong><small>Timing, mode, impact, income and energy.</small></div><input class="switch setting-toggle" data-key="smartPlanner" type="checkbox" ${state.settings.smartPlanner?'checked':''}></label><label class="setting-row"><div><strong>Show XP</strong><small>Use game mechanics as feedback, not the objective.</small></div><input class="switch setting-toggle" data-key="showXP" type="checkbox" ${state.settings.showXP?'checked':''}></label><label class="setting-row"><div><strong>App badge</strong><small>Remaining core missions when supported.</small></div><input class="switch setting-toggle" data-key="badgeRemaining" type="checkbox" ${state.settings.badgeRemaining?'checked':''}></label></div></section></div>`;}

function taskDialog(task){return `<div class="sheet-body"><div class="sheet-head"><h3>Edit mission</h3><button class="icon-button dialog-close">×</button></div><div class="field"><label>Title</label><input class="input" id="editTitle" value="${esc(task.title)}"></div><div class="field"><label>Outcome</label><textarea id="editDetail">${esc(task.detail)}</textarea></div><div class="form-grid"><div class="field"><label>Time</label><input class="input" id="editTime" type="time" value="${esc(task.time||'')}"></div><div class="field"><label>Minutes</label><input class="input" id="editDuration" type="number" value="${task.duration||30}"></div><div class="field"><label>Area</label><select id="editArea">${Object.keys(icons).map(a=>`<option ${task.area===a?'selected':''}>${a}</option>`).join('')}</select></div><div class="field"><label>Project</label><input class="input" id="editProject" value="${esc(task.project||task.area)}"></div><div class="field"><label>Impact 1–5</label><input class="input" id="editImpact" type="number" min="1" max="5" value="${task.impact||3}"></div><div class="field"><label>Urgency 1–5</label><input class="input" id="editUrgency" type="number" min="1" max="5" value="${task.urgency||3}"></div></div><label class="setting-row"><div><strong>Fixed event</strong><small>Appointments dominate scheduling.</small></div><input id="editFixed" class="switch" type="checkbox" ${task.fixed?'checked':''}></label><div class="button-row"><button class="primary full save-task" data-id="${esc(task.id)}">Save</button><button class="danger delete-task" data-id="${esc(task.id)}">Delete</button></div></div>`;}
function quickAddDialog(prefill={}){return `<div class="sheet-body"><div class="sheet-head"><h3>New mission</h3><button class="icon-button dialog-close">×</button></div><div class="field"><label>Mission</label><input class="input" id="newTitle" value="${esc(prefill.title||'')}" placeholder="What needs doing?"></div><div class="field"><label>Outcome</label><textarea id="newDetail" placeholder="Define done">${esc(prefill.detail||'')}</textarea></div><div class="form-grid"><div class="field"><label>Date</label><input class="input" id="newDate" type="date" value="${esc(prefill.date||'')}"></div><div class="field"><label>Time</label><input class="input" id="newTime" type="time" value="${esc(prefill.time||'')}"></div><div class="field"><label>Minutes</label><input class="input" id="newDuration" type="number" value="${prefill.duration||30}"></div><div class="field"><label>Area</label><select id="newArea">${Object.keys(icons).map(a=>`<option ${prefill.area===a?'selected':''}>${a}</option>`).join('')}</select></div><div class="field"><label>Project</label><input class="input" id="newProject" value="${esc(prefill.project||'')}"></div><div class="field"><label>Impact</label><input class="input" id="newImpact" type="number" min="1" max="5" value="${prefill.impact||3}"></div><div class="field"><label>Urgency</label><input class="input" id="newUrgency" type="number" min="1" max="5" value="${prefill.urgency||3}"></div><div class="field"><label>Income impact</label><input class="input" id="newIncome" type="number" min="0" max="5" value="${prefill.income||0}"></div></div><label class="setting-row"><div><strong>Fixed event</strong><small>Appointment / event.</small></div><input id="newFixed" class="switch" type="checkbox" ${prefill.fixed?'checked':''}></label><button class="primary full create-task">Create mission</button></div>`;}
function commandDialog(parsed=null){return `<div class="sheet-body command-sheet"><div class="sheet-head"><div><div class="date-label">COMMAND CENTRE</div><h3>Tell Mission Control naturally.</h3></div><button class="icon-button dialog-close">×</button></div><textarea id="commandInput" class="command-input" placeholder="e.g. Call Mercedes tomorrow at 10am for 20 minutes"></textarea><div class="command-examples"><button data-example="Gym tomorrow at 8am for 60 minutes">Gym tomorrow</button><button data-example="Apply for 2 data jobs tomorrow for 45 minutes">Job applications</button><button data-example="Call Mercedes tomorrow at 10am for 20 minutes">Mercedes call</button></div><div id="commandPreview" class="command-preview">Type a thought, commitment or task. Mission Control will infer the area, day, time and duration locally.</div><button class="primary full" id="commandCreate">Create from sentence</button><div class="divider"><span>or</span></div><button class="secondary full" id="manualAdd">Open detailed mission form</button></div>`;}

// ---- app.js ----
const root=document.getElementById('viewRoot'); const tabs=[...document.querySelectorAll('.tab')];
const taskDialogEl=document.getElementById('taskDialog'),quickAddEl=document.getElementById('quickAddDialog'),commandEl=document.getElementById('commandDialog'),toast=document.getElementById('toast');
let currentView='today'; let focusState={taskId:null,remaining:null,running:false,timer:null,startedAt:null}; let toastTimer,minuteTimer;
const transition=fn=>document.startViewTransition?document.startViewTransition(fn):fn();
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2000);}
function haptic(ms=12){if(getState().profile?.haptics&&navigator.vibrate)navigator.vibrate(ms);} function today(){return getToday();}
function plannerContext(day=today()){return {energy:day.energy,mode:day.planner?.mode||'execute',availableMinutes:day.planner?.availableMinutes,behind:day.planner?.behind,flexibleTimes:day.planner?.flexibleTimes};}

function render(){const state=getState(),day=today();if(currentView==='today')root.innerHTML=todayView(state,day);if(currentView==='focus')root.innerHTML=focusView(state,day,focusState);if(currentView==='plan')root.innerHTML=planView(state,day);if(currentView==='paths')root.innerHTML=pathsView(state);if(currentView==='insights')root.innerHTML=insightsView(state,day);if(currentView==='more')root.innerHTML=moreView(state,day);tabs.forEach(t=>t.classList.toggle('active',t.dataset.view===currentView));bindViewEvents();updateBadge();}
async function updateBadge(){const state=getState();if(!state.settings.badgeRemaining){if(navigator.clearAppBadge)try{await navigator.clearAppBadge();}catch(_){}return;}const remaining=today().tasks.filter(t=>!t.done&&!t.bonus).length;if(navigator.setAppBadge)try{remaining?await navigator.setAppBadge(remaining):await navigator.clearAppBadge();}catch(_){} }
function switchView(view){currentView=view;transition(render);window.scrollTo({top:0,behavior:'smooth'});} tabs.forEach(tab=>tab.addEventListener('click',()=>switchView(tab.dataset.view))); document.getElementById('profileButton').addEventListener('click',()=>switchView('more')); document.getElementById('commandButton').addEventListener('click',openCommand);

function openTask(id){const task=today().tasks.find(t=>t.id===id);if(!task)return;taskDialogEl.innerHTML=taskDialog(task);taskDialogEl.showModal();bindTaskDialog();}
function bindTaskDialog(){taskDialogEl.querySelector('.dialog-close')?.addEventListener('click',()=>taskDialogEl.close());taskDialogEl.querySelector('.save-task')?.addEventListener('click',async e=>{const id=e.currentTarget.dataset.id;const area=document.getElementById('editArea').value;await updateTask(id,{title:document.getElementById('editTitle').value.trim(),detail:document.getElementById('editDetail').value.trim(),time:document.getElementById('editTime').value,suggestedTime:'',duration:Number(document.getElementById('editDuration').value)||30,area,project:document.getElementById('editProject').value.trim()||area,impact:Number(document.getElementById('editImpact').value)||3,urgency:Number(document.getElementById('editUrgency').value)||3,fixed:document.getElementById('editFixed').checked});taskDialogEl.close();haptic();notify('Mission updated');render();});taskDialogEl.querySelector('.delete-task')?.addEventListener('click',async e=>{if(!confirm('Delete this mission?'))return;await removeTask(e.currentTarget.dataset.id);taskDialogEl.close();notify('Mission deleted');render();});}

function openQuickAdd(prefill={}){quickAddEl.innerHTML=quickAddDialog({...prefill,date:prefill.date||localDateKey()});quickAddEl.showModal();bindQuickAdd(prefill);setTimeout(()=>document.getElementById('newTitle')?.focus(),40);}
function bindQuickAdd(prefill={}){quickAddEl.querySelector('.dialog-close')?.addEventListener('click',()=>quickAddEl.close());quickAddEl.querySelector('.create-task')?.addEventListener('click',async()=>{const title=document.getElementById('newTitle').value.trim();if(!title){notify('Give the mission a title');return;}const impact=Number(document.getElementById('newImpact').value)||3,urgency=Number(document.getElementById('newUrgency').value)||3,income=Number(document.getElementById('newIncome').value)||0;const area=document.getElementById('newArea').value;const goal=prefill.goal||({Money:'survive',Taxi:'survive',ADI:'survive',Career:'stabilise',Business:'build',Body:'live',Health:'live',Life:'stabilise'}[area]||'stabilise');await addTask({title,detail:document.getElementById('newDetail').value.trim(),date:document.getElementById('newDate').value||localDateKey(),time:document.getElementById('newTime').value,duration:Number(document.getElementById('newDuration').value)||30,area,goal,project:document.getElementById('newProject').value.trim()||prefill.project||area,impact,urgency,income,priority:Math.max(1,Math.min(5,Math.round((impact+urgency)/2))),energy:area==='Career'?4:2,xp:Math.max(25,Math.min(250,(impact+urgency+income)*10)),fixed:document.getElementById('newFixed').checked});quickAddEl.close();haptic();notify('Mission created');render();});}

function openCommand(){commandEl.innerHTML=commandDialog();commandEl.showModal();bindCommand();setTimeout(()=>document.getElementById('commandInput')?.focus(),40);}
function previewCapture(){const input=document.getElementById('commandInput');const preview=document.getElementById('commandPreview');if(!input||!preview)return;const text=input.value.trim();if(!text){preview.textContent='Type a thought, commitment or task. Mission Control will infer the area, day, time and duration locally.';return;}const p=parseCapture(text);preview.innerHTML=`<strong>${p.area} · ${p.date}${p.time?' · '+p.time:''} · ${p.duration} min</strong><span>${p.fixed?'Fixed event':'Flexible mission'}${p.income?' · income relevant':''}</span>`;}
function bindCommand(){commandEl.querySelector('.dialog-close')?.addEventListener('click',()=>commandEl.close());const input=document.getElementById('commandInput');input?.addEventListener('input',previewCapture);commandEl.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.example;previewCapture();}));document.getElementById('manualAdd')?.addEventListener('click',()=>{commandEl.close();openQuickAdd();});document.getElementById('commandCreate')?.addEventListener('click',async()=>{const text=input.value.trim();if(!text){notify('Tell Mission Control what needs doing');return;}const p=parseCapture(text);await addTask(p,p.date);commandEl.close();notify(p.date===localDateKey()?'Captured for today':'Captured for '+p.date);render();});}

function selectFocus(id){stopTimer();const task=today().tasks.find(t=>t.id===id);focusState={taskId:id,remaining:(task?.duration||25)*60,running:false,timer:null,startedAt:null};switchView('focus');}
function stopTimer(){if(focusState.timer)clearInterval(focusState.timer);focusState.timer=null;focusState.running=false;}
function startTimer(){if(focusState.running)return;focusState.running=true;focusState.startedAt=Date.now();focusState.timer=setInterval(()=>{focusState.remaining=Math.max(0,(focusState.remaining??0)-1);const el=document.getElementById('focusTime');if(el){const mm=String(Math.floor(focusState.remaining/60)).padStart(2,'0'),ss=String(focusState.remaining%60).padStart(2,'0');el.textContent=`${mm}:${ss}`;}if(focusState.remaining<=0){stopTimer();haptic(40);notify('Focus block complete');render();}},1000);render();}
function pauseTimer(){stopTimer();render();} function resetTimer(){stopTimer();const task=today().tasks.find(t=>t.id===focusState.taskId);focusState.remaining=(task?.duration||25)*60;render();}
async function setTaskDone(id,done){await toggleTask(id,done);haptic(done?18:8);notify(done?'Mission complete · XP earned':'Mission reopened');render();}

async function replan(action='replan'){
  await mutate(state=>{const day=getTodayFromState(state);const p=day.planner||(day.planner={mode:'execute',availableMinutes:null,behind:false,flexibleTimes:false});if(action==='behind'){p.behind=true;p.availableMinutes=null;}if(action==='low'){day.energy=1;p.mode='recover';p.availableMinutes=null;}if(action==='30'){p.availableMinutes=30;p.behind=false;}if(action==='changed'){p.flexibleTimes=true;p.behind=true;p.availableMinutes=null;}if(action==='reset'){p.behind=false;p.flexibleTimes=false;p.availableMinutes=null;day.tasks.forEach(t=>{if(!t.fixed)t.suggestedTime='';});}if(action==='replan'||action==='behind'||action==='changed'){const proposed=replanSchedule(day.tasks,{...plannerContext(day),behind:p.behind,flexibleTimes:p.flexibleTimes});day.tasks.forEach(t=>{if(!t.fixed&&!t.done)t.suggestedTime=proposed[t.id]??t.suggestedTime??'';});p.lastReplanAt=new Date().toISOString();}});haptic();notify(action==='reset'?'Planner context reset':'Remaining day recalculated');render();
}
async function setMode(mode){await mutate(state=>{const day=getTodayFromState(state);day.planner.mode=mode;if(mode==='recover')day.energy=Math.min(day.energy,2);if(mode==='earn')day.planner.availableMinutes=null;});haptic();notify(`${mode[0].toUpperCase()+mode.slice(1)} mode`);render();}

async function exportBackup(){const payload=await exportAll();const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`mission-control-v3-backup-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Backup exported');}
async function importBackup(file){try{const parsed=JSON.parse(await file.text());if(parsed?.app!=='Mission Control'||!parsed.state)throw new Error('Not a Mission Control backup');if(!confirm('Replace current Mission Control data with this backup?'))return;await replaceState(parsed.state);notify('Backup restored');render();}catch(err){notify(err.message||'Import failed');}}

function unfoldICS(text){return text.replace(/\r?\n[ \t]/g,'');}
function parseICS(text){const blocks=unfoldICS(text).split('BEGIN:VEVENT').slice(1).map(x=>x.split('END:VEVENT')[0]);const out=[];for(const block of blocks){const lines=block.split(/\r?\n/);const prop=name=>lines.find(l=>l.startsWith(name+':')||l.startsWith(name+';'));const summary=(prop('SUMMARY')||'').split(':').slice(1).join(':').replace(/\\,/g,',').trim()||'Calendar event';const location=(prop('LOCATION')||'').split(':').slice(1).join(':').replace(/\\,/g,',').trim();const dt=prop('DTSTART');const de=prop('DTEND');if(!dt)continue;const raw=dt.split(':').slice(1).join(':').trim();const parseDate=v=>{if(/^\d{8}T\d{6}Z$/.test(v)){const d=new Date(Date.UTC(+v.slice(0,4),+v.slice(4,6)-1,+v.slice(6,8),+v.slice(9,11),+v.slice(11,13),+v.slice(13,15)));return d;}if(/^\d{8}T\d{6}/.test(v))return new Date(+v.slice(0,4),+v.slice(4,6)-1,+v.slice(6,8),+v.slice(9,11),+v.slice(11,13));if(/^\d{8}$/.test(v))return new Date(+v.slice(0,4),+v.slice(4,6)-1,+v.slice(6,8),9,0);return null;};const start=parseDate(raw),end=de?parseDate(de.split(':').slice(1).join(':').trim()):null;if(!start)continue;const date=localDateKey(start),time=`${String(start.getHours()).padStart(2,'0')}:${String(start.getMinutes()).padStart(2,'0')}`,duration=end?Math.max(15,Math.round((end-start)/60000)):60;out.push({title:summary,detail:location?`Calendar · ${location}`:'Imported calendar event',date,time,duration,area:'Life',goal:'live',project:'Calendar',impact:4,urgency:5,income:0,energy:2,priority:5,fixed:true});}return out;}
async function importICS(file){try{const events=parseICS(await file.text());if(!events.length)throw new Error('No readable events found');for(const e of events)await addTask(e,e.date);notify(`${events.length} calendar event${events.length===1?'':'s'} imported`);render();}catch(err){notify(err.message||'Calendar import failed');}}

function bindViewEvents(){
  root.querySelectorAll('.task-toggle').forEach(box=>box.addEventListener('change',e=>setTaskDone(e.target.closest('[data-task-id]').dataset.taskId,e.target.checked)));
  root.querySelectorAll('.task-open').forEach(el=>el.addEventListener('click',()=>openTask(el.closest('[data-task-id]').dataset.taskId)));
  root.querySelectorAll('.start-focus').forEach(b=>b.addEventListener('click',()=>selectFocus(b.dataset.id))); root.querySelectorAll('.mark-next-done').forEach(b=>b.addEventListener('click',()=>setTaskDone(b.dataset.id,true)));
  root.querySelectorAll('.command-open').forEach(b=>b.addEventListener('click',openCommand)); root.querySelectorAll('.energy-btn').forEach(b=>b.addEventListener('click',async()=>{await mutate(state=>getTodayFromState(state).energy=Number(b.dataset.energy));haptic();notify('Energy updated · recommendations recalculated');render();})); root.querySelectorAll('.mode-btn').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode))); root.querySelectorAll('.planner-action').forEach(b=>b.addEventListener('click',()=>replan(b.dataset.action)));
  root.querySelectorAll('.goal-add').forEach(b=>b.addEventListener('click',()=>openQuickAdd({goal:b.dataset.goal,project:b.dataset.project})));
  root.querySelectorAll('.path-toggle').forEach(box=>box.addEventListener('change',async e=>{const {path,id}=e.target.dataset;await mutate(state=>{const item=state.paths[path].items.find(x=>x.id===id);if(item&&item.done!==e.target.checked){item.done=e.target.checked;addXP(e.target.checked?25:-25);}});haptic();render();}));
  document.getElementById('focusToggle')?.addEventListener('click',()=>focusState.running?pauseTimer():startTimer());document.getElementById('focusReset')?.addEventListener('click',resetTimer);root.querySelector('.focus-complete')?.addEventListener('click',async e=>{stopTimer();await setTaskDone(e.target.dataset.id,true);switchView('today');});root.querySelector('.focus-blocked')?.addEventListener('click',async e=>{stopTimer();await updateTask(e.target.dataset.id,{urgency:Math.max(1,(today().tasks.find(t=>t.id===e.target.dataset.id)?.urgency||3)-1),suggestedTime:''});notify('Postponed · planner recalculated');switchView('today');});
  root.querySelectorAll('.health-toggle').forEach(box=>box.addEventListener('change',async e=>{const key=e.target.dataset.key;await mutate(state=>{const h=getTodayFromState(state).health;if(h[key]!==e.target.checked){h[key]=e.target.checked;addXP(e.target.checked?15:-15);}});haptic();render();}));document.getElementById('healthNote')?.addEventListener('change',async e=>{await mutate(state=>getTodayFromState(state).health.note=e.target.value);notify('Health note saved');});document.getElementById('sleepHours')?.addEventListener('change',async e=>{await mutate(state=>getTodayFromState(state).health.sleepHours=Number(e.target.value)||null);notify('Sleep logged');render();});
  document.getElementById('addMoney')?.addEventListener('click',async()=>{const amount=Number(document.getElementById('moneyAmount').value);if(!amount){notify('Enter an amount');return;}const type=document.getElementById('moneyType').value,note=document.getElementById('moneyNote').value.trim(),source=document.getElementById('moneySource').value.trim(),hours=Number(document.getElementById('moneyHours').value)||0;await mutate(state=>state.money.unshift({id:crypto.randomUUID?.()||String(Date.now()),amount,type,note,source,hours,date:localDateKey(),at:new Date().toISOString()}));notify(type==='income'?'Income logged':'Expense logged');render();});
  document.getElementById('addBrain')?.addEventListener('click',async()=>{const input=document.getElementById('brainInput'),text=input.value.trim();if(!text)return;await mutate(state=>state.brain.unshift({id:crypto.randomUUID?.()||String(Date.now()),text,at:new Date().toISOString()}));notify('Thought parked');render();});root.querySelectorAll('.brain-done').forEach(b=>b.addEventListener('click',async()=>{await mutate(state=>state.brain.splice(Number(b.dataset.index),1));render();}));
  document.getElementById('exportBackup')?.addEventListener('click',exportBackup);document.getElementById('importBackup')?.addEventListener('click',()=>document.getElementById('importFile').click());document.getElementById('importFile')?.addEventListener('change',e=>{const f=e.target.files?.[0];if(f)importBackup(f);});root.querySelectorAll('.setting-toggle').forEach(box=>box.addEventListener('change',async e=>{await mutate(state=>state.settings[e.target.dataset.key]=e.target.checked);render();}));
  document.getElementById('importICS')?.addEventListener('click',()=>document.getElementById('icsFile').click());document.getElementById('icsFile')?.addEventListener('change',e=>{const f=e.target.files?.[0];if(f)importICS(f);});
}
function getTodayFromState(state){return state.daily[localDateKey()]||Object.values(state.daily).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0];}
async function boot(){try{await initState();render();minuteTimer=setInterval(()=>{if(currentView==='today')render();},60000);if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});}catch(err){root.innerHTML=`<div class="panel"><h3>Mission Control could not start</h3><p class="task-meta">${String(err.message||err)}</p></div>`;}}
boot();
