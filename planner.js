import { parseCapture } from './smart.js';

export const dateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export const shiftDate = (key, n) => { const d = new Date(key+'T12:00:00'); d.setDate(d.getDate()+n); return dateKey(d); };
export const validDate = key => typeof key === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(key) && !Number.isNaN(new Date(key+'T12:00:00').getTime()) && dateKey(new Date(key+'T12:00:00')) === key;
export const minutes = time => typeof time === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time) ? Number(time.slice(0,2))*60+Number(time.slice(3)) : null;
export const clock = mins => `${String(Math.floor(((mins%1440)+1440)%1440/60)).padStart(2,'0')}:${String(((mins%1440)+1440)%1440%60).padStart(2,'0')}`;
export const nowMinutes = () => new Date().getHours()*60+new Date().getMinutes();
export const normalTitle = s => String(s||'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
export const durationLabel = n => n >= 60 ? `${Math.floor(n/60)}h${n%60?' '+n%60+'m':''}` : `${n}m`;
export function progress(day) { const tasks=day.tasks.filter(t=>!t.bonus); const done=tasks.filter(t=>t.done).length; return {total:tasks.length,done,pct:tasks.length?Math.round(done/tasks.length*100):0}; }
export function habitProgress(state, day) {const active=state.habits.filter(h=>h.active!==false);return {total:active.length,done:active.filter(h=>(day.habits[h.id]||0)>=h.target).length};}
export function moneySummary(state, date) { const items=state.money.filter(x=>x.date===date||!x.date);const sum=type=>items.filter(x=>x.type===type).reduce((s,x)=>s+Number(x.amount||0),0);const income=sum('income'),expense=sum('expense'),hours=items.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.hours||0),0);return {income,expense,net:income-expense,hours,rate:hours?(income-expense)/hours:null}; }
export function schedule(day) {return [...day.blocks.map(b=>({...b,kind:'block'})),...day.tasks.filter(t=>minutes(t.suggestedTime||t.time)!==null).map(t=>({...t,time:t.suggestedTime||t.time,kind:'task'}))].sort((a,b)=>minutes(a.time)-minutes(b.time));}
export function planHealth(day, profile) {
  const entries=schedule(day).filter(e=>!e.done),conflicts=[];
  for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++){
    const a=entries[i],b=entries[j];
    if(a.kind!==b.kind)continue;
    if(minutes(b.time)<minutes(a.time)+a.duration)conflicts.push([a.title,b.title]);
  }
  const start=minutes(profile.dayStart)??480,end=minutes(profile.dayEnd)??1320;
  const intervals=entries.filter(e=>!/\bsleep\b|recharge/i.test(e.title)).map(e=>[Math.max(start,minutes(e.time)),Math.min(end,minutes(e.time)+e.duration)]).filter(([a,b])=>b>a).sort((a,b)=>a[0]-b[0]);
  let reserved=0,last=start;for(const [a,b] of intervals){reserved+=Math.max(0,b-Math.max(a,last));last=Math.max(last,b);}
  const flexible=day.tasks.filter(t=>!t.done&&!t.bonus&&!t.blockId&&minutes(t.time)===null).reduce((s,t)=>s+t.duration,0);
  const available=Math.max(0,end-start-reserved);
  return {conflicts,reserved,flexible,available,overbooked:Math.max(0,flexible-available)};
}
export function nextAction(day, context={}) {
  const now=context.now??nowMinutes();const items=schedule(day).filter(x=>!x.done);
  const current=items.find(x=>minutes(x.time)<=now&&minutes(x.time)+x.duration>now);
  if(current?.kind==='block'){const linked=day.tasks.filter(t=>!t.done&&t.blockId===current.id).sort((a,b)=>Number(b.top)-Number(a.top))[0];if(linked)return {item:{...linked,kind:'task'},label:'Inside your current block',reason:current.title+' · '+current.time+'–'+clock(minutes(current.time)+current.duration)};}
  if(current)return {item:current,label:current.kind==='block'?'Current time block':'Scheduled now',reason:`${current.time}–${clock(minutes(current.time)+current.duration)} · ${durationLabel(current.duration)}`};
  const open=day.tasks.filter(t=>!t.done);
  const future=items.filter(x=>minutes(x.time)>now).sort((a,b)=>minutes(a.time)-minutes(b.time));
  const upcoming=future[0];
  const timeLimit=upcoming?minutes(upcoming.time)-now:1440-now;
  const candidates=open.filter(t=>!t.fixed&&!t.blockId&&minutes(t.time)===null&&(!context.available||t.duration<=context.available)&&t.duration<=timeLimit);
  const score=t=>(t.top?100:0)+(t.impact||3)*8+(t.urgency||3)*4+(context.mode==='earn'?(t.income||0)*15:0)+(context.mode==='build'&&['Career','Business'].includes(t.area)?40:0)-(context.energy<=2?Math.max(0,(t.energy||2)-2)*20:0);
  const best=candidates.sort((a,b)=>score(b)-score(a))[0];
  if(best)return {item:{...best,kind:'task'},label:best.top?'A core priority':'A useful next step',reason:best.top?'One of the three results you chose to protect.':`A ${durationLabel(best.duration)} action that fits your available time.`};
  if(upcoming)return {item:upcoming,label:'Coming up at '+upcoming.time,reason:'Your next scheduled commitment. There is room to pause before it.'};
  return {item:null,label:open.length?'Choose what to move forward':'Room to reset',reason:open.length?'Some scheduled missions need a new time. Review your plan before adding more.':day.tasks.length?'Your missions are complete. Reflect, rest and give tomorrow a little direction.':'Give today direction with one meaningful mission or paste your whole plan.'};
}

const parseTime = raw => {
  const m=/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i.exec(raw.trim());if(!m)return null;
  let h=Number(m[1]),min=Number(m[2]||0);if(min>59)return null;
  if(m[3]){if(h<1||h>12)return null;h=h%12+(m[3].toLowerCase()==='pm'?12:0);}if(h>23)return null;return h*60+min;
};
const rangePattern=/^([0-2]?\d(?::\d{2})?\s*(?:am|pm)?)\s*[-–—]\s*([0-2]?\d(?::\d{2})?\s*(?:am|pm)?)\s*(?:[-–—:|]\s*)?(.+)$/i;
export function parsePlan(text, selectedDate=dateKey(), keepCompleted=false) {
  const rows=[],warnings=[];let section='tasks';let parsedDate=selectedDate;
  for(const rawLine of String(text||'').split(/\r?\n/).slice(0,250)){
    let line=rawLine.trim().replace(/^#{1,6}\s*/,'');if(!line)continue;
    const iso=/^(\d{4}-\d{2}-\d{2})$/.exec(line);if(iso&&validDate(iso[1])){parsedDate=iso[1];continue;}
    if(/^(?:tasks?|missions?|to[ -]?do|priorities)\s*:?(?:\s*[📝:])?$/i.test(line)){section='tasks';continue;}
    if(/^(?:schedule|time\s*blocks?|agenda)\s*:?$/i.test(line)){section='blocks';continue;}
    const dateHeading=/^(?:(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)[,\s]+)?(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})$/i.exec(line);
    if(dateHeading){const months=['january','february','march','april','may','june','july','august','september','october','november','december'];const key=`${dateHeading[3]}-${String(months.indexOf(dateHeading[2].toLowerCase())+1).padStart(2,'0')}-${dateHeading[1].padStart(2,'0')}`;if(validDate(key))parsedDate=key;continue;}
    const checked=/^\s*[-*•]?\s*\[[xX]\]/.test(line);line=line.replace(/^[-*•]\s*/,'').replace(/^\d+[.)]\s+/,'').replace(/^\[[ xX]\]\s*/, '').trim();if(!line)continue;
    const range=rangePattern.exec(line);
    if(range){const a=parseTime(range[1]),b=parseTime(range[2]);if(a===null||b===null){warnings.push('Check this time: '+line);continue;}const duration=b>a?b-a:1440-a+b;if(duration>960||duration===0){warnings.push('Check this time range: '+line);continue;}
      const title=range[3].trim();rows.push({kind:'block',title,detail:'',time:clock(a),duration,fixed:true,done:keepCompleted&&checked,date:parsedDate});continue;}
    if(section==='blocks'){warnings.push('No time range found: '+line);continue;}
    const parsed=parseCapture(line,new Date(parsedDate+'T12:00:00'));rows.push({...parsed,title:parsed.title||line,kind:'task',done:keepCompleted&&checked,date:parsedDate,detail:'Imported from daily plan'});
  }
  const seen=new Set();const unique=rows.filter(r=>{const key=[r.kind,r.date,normalTitle(r.title),r.time||''].join('|');if(seen.has(key))return false;seen.add(key);return true;});
  if(rows.length!==unique.length)warnings.push(`${rows.length-unique.length} duplicate line(s) removed.`);
  if(unique.some(r=>r.kind==='block'))warnings.push('Time blocks reserve your day; missions track outcomes. Blocks do not count towards mission completion.');
  const stop=new Set(['the','and','for','my','one','a','to','on','of','or','with','if','is','in','make','progress','complete']);
  const tokens=s=>new Set(normalTitle(s).split(' ').filter(t=>t.length>2&&!stop.has(t)));
  unique.forEach((r,i)=>r.sourceKey=String(i));
  const blocks=unique.filter(r=>r.kind==='block');
  for(const r of unique.filter(r=>r.kind==='task')){const words=tokens(r.title);let best=null,bestScore=1;for(const b of blocks){if(b.date!==r.date)continue;const bWords=tokens(b.title);const score=[...words].filter(w=>bWords.has(w)).length;if(score>bestScore){best=b;bestScore=score;}}if(best)r.blockKey=best.sourceKey;}
  return {rows:unique,warnings,date:parsedDate};
}

export const starterPlan = `Tasks
- [ ] Diagnose car hesitation and arrange the seatbelt wiring repair
- [ ] Improve my CV and submit one tailored job application
- [ ] Complete a profitable Deliveroo shift if the car is safe to drive
- [ ] Shortlist a powerful laptop within £700–£800
- [ ] Capture clips for my car repair mini vlog
- [ ] Make progress on my Dronix video
Schedule
01:50 - 10:30 - Sleep and recharge
10:30 - 12:00 - Breakfast, exercise and Quran listening
12:00 - 13:00 - Spanish practice, prayer and contact repair shops
13:00 - 14:00 - Car diagnosis and repair visit
14:00 - 15:00 - CV and one tailored job application
15:00 - 16:00 - Laptop research or vlog editing
16:00 - 17:00 - Second meal, reading and prayer
17:00 - 21:00 - Deliveroo shift with a meal break
21:00 - 22:00 - Journal, review, prayer and plan tomorrow`;
