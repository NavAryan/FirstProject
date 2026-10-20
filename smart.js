import { goalMap } from './defaults.js?v=4.0.2';

export function minutesFromHHMM(value) {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return null;
  const [h,m] = value.split(':').map(Number);
  return h*60+m;
}
export function hhmm(mins){ mins=Math.max(0,Math.min(1439,Math.round(mins))); return `${String(Math.floor(mins/60)).padStart(2,'0')}:${String(mins%60).padStart(2,'0')}`; }
export function minutesNow(date = new Date()) { return date.getHours()*60 + date.getMinutes(); }
export function taskTime(task){ return minutesFromHHMM(task.suggestedTime || task.time); }

function modeBoost(task, mode='execute') {
  if(mode==='earn') return (task.income||0)*9 + (['Money','Taxi','ADI'].includes(task.area)?18:0);
  if(mode==='build') return (['Career','Business'].includes(task.area)?24:0) + (task.impact||0)*4;
  if(mode==='recover') return (['Body','Health','Life'].includes(task.area)?24:0) - Math.max(0,(task.energy||2)-2)*9;
  if(mode==='plan') return task.fixed ? 10 : ((task.duration||60)<=30 ? 7 : 0);
  return 0;
}

export function taskScore(task, context = {}) {
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

export function getNextTask(tasks, context = {}) {
  const open = tasks.filter(t => !t.done);
  if (!open.length) return null;
  return [...open].sort((a,b) => taskScore(b, context)-taskScore(a, context))[0];
}

export function plannerReason(task, tasks, context = {}) {
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

export function dayReadiness(tasks) {
  const core = tasks.filter(t=>!t.bonus);
  if (!core.length) return 0;
  const weightedTotal = core.reduce((s,t)=>s+(t.xp||50),0);
  const weightedDone = core.filter(t=>t.done).reduce((s,t)=>s+(t.xp||50),0);
  return Math.round(weightedDone/weightedTotal*100);
}

export function estimateFreeWindow(tasks, date = new Date()) {
  const nowMin=minutesNow(date);
  const nextFixed=tasks.filter(t=>!t.done&&t.fixed).map(t=>({t,m:taskTime(t)})).filter(x=>x.m!==null&&x.m>nowMin).sort((a,b)=>a.m-b.m)[0];
  if(!nextFixed) return null;
  return {minutes:Math.max(0,nextFixed.m-nowMin),next:nextFixed.t};
}

export function replanSchedule(tasks, context={}) {
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

export function computeInsights(state, day) {
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

export function weeklyInsights(state, anchorDate=new Date()) {
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

export function parseCapture(text, now=new Date()) {
  const raw=String(text||'').trim(); const lower=raw.toLowerCase();
  let area='Life',goal='stabilise',project='Life';
  if(/taxi|wolverhampton|private hire|vehicle licen/.test(lower)){area='Taxi';goal='survive';project='Taxi';}
  else if(/adi|driving instructor|theory|hazard|shabir|lesson/.test(lower)){area='ADI';goal='survive';project='ADI';}
  else if(/dronix|drone|client|prospect|shoot/.test(lower)){area='Business';goal='build';project='Dronix';}
  else if(/job|cv|interview|codex|data|portfolio|github|sql|python/.test(lower)){area='Career';goal='stabilise';project='Career';}
  else if(/quran|prayer|memorisation|memorization/.test(lower)){area='Faith';goal='live';project='Faith';}
  else if(/spanish|language|reading|read a|read my/.test(lower)){area='Learning';goal='build';project='Learning';}
  else if(/gym|workout|exercise|conditioning|run/.test(lower)){area='Body';goal='live';project='Body';}
  else if(/deliver|cash|earn|income|money|fuel/.test(lower)){area='Money';goal='survive';project='Cash flow';}
  else if(/doctor|health|appointment|hospital|gp|dentist/.test(lower)){area='Health';goal='live';project='Health';}

  const relativeExpr=/\bin\s+(\d+(?:\.\d+)?)\s*(minutes?|mins?|hours?|hrs?)\b/.exec(lower);
  const durationText=relativeExpr?lower.replace(relativeExpr[0],''):lower;
  let duration=/\b(\d{1,3})\s*(?:min|mins|minutes)\b/.exec(durationText)?.[1]; duration=duration?Number(duration):null;
  const hours=/\b(\d+(?:\.\d+)?)\s*(?:hour|hours|hr|hrs)\b/.exec(durationText)?.[1]; if(!duration&&hours)duration=Math.round(Number(hours)*60);
  if(!duration) duration=/call|message|email|check|book|reply/.test(lower)?15:30;

  const target=new Date(now); target.setSeconds(0,0); let time=''; let relativeTime=false;
  const inTime=relativeExpr;
  if(inTime){const n=Number(inTime[1]);const mins=/hour|hr/.test(inTime[2])?n*60:n;target.setMinutes(target.getMinutes()+Math.round(mins));time=`${String(target.getHours()).padStart(2,'0')}:${String(target.getMinutes()).padStart(2,'0')}`;relativeTime=true;}
  if(!time){const tm12=/\b(?:at\s*)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/.exec(lower);if(tm12){let h=Number(tm12[1])%12;if(tm12[3]==='pm')h+=12;time=`${String(h).padStart(2,'0')}:${String(Number(tm12[2]||0)).padStart(2,'0')}`;}}
  if(!time){const tm24=/\bat\s+(?:about\s+)?([01]?\d|2[0-3]):([0-5]\d)\b/.exec(lower);if(tm24)time=`${String(Number(tm24[1])).padStart(2,'0')}:${tm24[2]}`;}
  if(!time){if(/\bthis morning\b|\bmorning\b/.test(lower))time='09:00';else if(/\bthis afternoon\b|\bafternoon\b/.test(lower))time='15:00';else if(/\bthis evening\b|\bevening\b|\btonight\b/.test(lower))time='19:00';}

  if(!relativeTime){
    if(/\btomorrow\b/.test(lower))target.setDate(target.getDate()+1);
    else {
      const explicit=/\b(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?\b/.exec(lower);
      if(explicit){let y=explicit[3]?Number(explicit[3]):target.getFullYear();if(y<100)y+=2000;target.setFullYear(y,Number(explicit[2])-1,Number(explicit[1]));}
      else {
        const days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
        const match=days.findIndex(d=>new RegExp(`\\b(?:next\\s+)?${d}\\b`).test(lower));
        if(match>=0){const current=target.getDay();let add=(match-current+7)%7;if(add===0||new RegExp(`\\bnext\\s+${days[match]}\\b`).test(lower))add=add||7;target.setDate(target.getDate()+add);}
      }
    }
  }
  const date=`${target.getFullYear()}-${String(target.getMonth()+1).padStart(2,'0')}-${String(target.getDate()).padStart(2,'0')}`;
  const fixed=/appointment|meeting|test|assessment|doctor|hospital|dentist|interview/.test(lower)&&Boolean(time);
  const income=/£|paid|earn|delivery|lesson|client/.test(lower)?4:0;
  const urgent=/urgent|asap|important|deadline|must/.test(lower)?5:(/today|tonight|in\s+\d/.test(lower)?4:3);
  const cleaned=raw
    .replace(/\b(today|tomorrow|tonight|this morning|this afternoon|this evening|morning|afternoon|evening)\b/ig,'')
    .replace(/\b(?:next\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/ig,'')
    .replace(/\b\d{1,2}[\/-]\d{1,2}(?:[\/-]\d{2,4})?\b/g,'')
    .replace(/\b(?:at\s*)?\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/ig,'')
    .replace(/\bat\s+\d{1,2}:\d{2}\b/ig,'')
    .replace(/\bin\s+\d+(?:\.\d+)?\s*(?:minutes?|mins?|hours?|hrs?)\b/ig,'')
    .replace(/\b\d+(?:\.\d+)?\s*(?:min|mins|minutes|hour|hours|hr|hrs)\b/ig,'')
    .replace(/\bfor\b\s*$/i,'').replace(/\s+/g,' ').trim();
  return {title:cleaned||raw,detail:'Captured in Command Centre',area,goal,project,date,time,duration,impact:3,urgency:urgent,income,energy:area==='Career'?4:2,priority:3,fixed};
}

