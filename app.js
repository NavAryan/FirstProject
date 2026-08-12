// ---- db.js ----
const DB_NAME = 'mission-control-db';
const DB_VERSION = 2;
const STORE = 'kv';

let dbPromise;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function dbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve(value);
    tx.onerror = () => reject(tx.error);
  });
}

async function dbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function exportAll() {
  const state = await dbGet('state');
  return {
    app: 'Mission Control',
    schemaVersion: 2,
    exportedAt: new Date().toISOString(),
    state
  };
}

async function migrateLegacy() {
  const existing = await dbGet('state');
  if (existing) return existing;

  const possibleKeys = ['mission-control-v1', 'mission-control-v1-1', 'mission-control-v1.1'];
  for (const key of possibleKeys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const legacy = JSON.parse(raw);
      return { legacy };
    } catch (_) {}
  }
  return null;
}


// ---- defaults.js ----
const TODAY_KEY = '2026-08-12';

const defaultState = {
  version: 2,
  createdAt: new Date().toISOString(),
  profile: {
    name: 'Naweed',
    dailyCashTarget: 60,
    sleepTargetHours: 8,
    defaultEnergy: 3,
    smartPlanning: true,
    haptics: true
  },
  xpTotal: 100,
  history: [],
  daily: {
    '2026-08-12': {
      date: '2026-08-12',
      energy: 3,
      mood: 'steady',
      tasks: [
        {id:'sleep',title:'Sleep / Recharge',detail:'Protect roughly 8 hours so the rest of the plan has a functioning brain and body.',area:'Body',time:'01:30',duration:390,xp:100,done:false,priority:5,impact:5,urgency:5,income:0,energy:1,fixed:false},
        {id:'body',title:'Body Online',detail:'Prayer, water, breakfast, gym / conditioning, shower and get ready.',area:'Body',time:'08:00',duration:120,xp:150,done:false,priority:5,impact:5,urgency:4,income:0,energy:3,fixed:false},
        {id:'taxi',title:'Taxi Next Step',detail:'Find the exact Wolverhampton / Mercedes vehicle-licensing action.',area:'Taxi',time:'10:00',duration:30,xp:100,done:false,priority:4,impact:4,urgency:4,income:4,energy:2,fixed:false},
        {id:'adi',title:'ADI Training',detail:'Theory, hazard perception, review mistakes and teaching knowledge.',area:'ADI',time:'10:30',duration:30,xp:100,done:false,priority:4,impact:4,urgency:3,income:3,energy:2,fixed:false},
        {id:'shabir',title:'Shabir Driving Lesson',detail:'Teach if available. If cancelled, convert the hour into ADI / taxi progress.',area:'ADI',time:'11:00',duration:60,xp:125,done:false,priority:4,impact:4,urgency:3,income:5,energy:3,fixed:false,conditional:true},
        {id:'base-car',title:'Base + Mercedes',detail:'Accommodation shortlist, service status, oil and car-noise next action.',area:'Life',time:'12:00',duration:45,xp:75,done:false,priority:3,impact:3,urgency:2,income:1,energy:2,fixed:false},
        {id:'jubilee',title:'Jubilee Health Centre',detail:'Fixed appointment. Leave enough time for travel and check-in.',area:'Health',time:'14:00',duration:30,xp:150,done:false,priority:5,impact:5,urgency:5,income:0,energy:2,fixed:true,location:'Jubilee Health Centre'},
        {id:'deep-work',title:'Build the Future',detail:'Codex, data, ESG or portfolio. Finish one tangible improvement.',area:'Career',time:'15:00',duration:90,xp:200,done:false,priority:5,impact:5,urgency:3,income:4,energy:4,fixed:false},
        {id:'career-dronix',title:'Career + Dronix',detail:'2–3 quality job applications and one commercial Dronix action.',area:'Business',time:'16:30',duration:60,xp:150,done:false,priority:4,impact:5,urgency:3,income:4,energy:3,fixed:false},
        {id:'eclipse',title:'Experience the Eclipse',detail:'Take a real break and experience the eclipse safely.',area:'Life',time:'18:15',duration:65,xp:25,done:false,priority:2,impact:2,urgency:5,income:0,energy:1,fixed:true,bonus:true},
        {id:'cash',title:'Cash Mode',detail:'Delivery work if worthwhile. Protect profitability rather than driving aimlessly.',area:'Money',time:'19:30',duration:240,xp:150,done:false,priority:4,impact:4,urgency:3,income:5,energy:3,fixed:false}
      ],
      health: {
        prayer:false, gym:false, meals:false, water:false, lowScroll:false, sleep:false,
        note:''
      },
      review: null
    }
  },
  paths: {
    Taxi: {
      icon:'🚕', subtitle:'Cash-flow path', color:'income',
      items:[
        {id:'taxi-date',label:'Check exact Mercedes first-registration date',done:false},
        {id:'taxi-wolves',label:'Confirm Wolverhampton vehicle licensing next step',done:false},
        {id:'taxi-insurance',label:'Confirm hire-and-reward insurance route',done:false},
        {id:'taxi-docs',label:'Prepare vehicle documents',done:false},
        {id:'taxi-inspection',label:'Book inspection / licensing when eligible',done:false}
      ]
    },
    ADI: {
      icon:'🚘', subtitle:'Instructor path',
      items:[
        {id:'adi-theory',label:'Part 1 theory practice',done:false},
        {id:'adi-hazard',label:'Hazard perception practice',done:false},
        {id:'adi-review',label:'Review weak categories',done:false},
        {id:'adi-teach',label:'Practice structured teaching with Shabir',done:false},
        {id:'adi-mock',label:'Complete a timed mock test',done:false}
      ]
    },
    Dronix: {
      icon:'🚁', subtitle:'Business / upside path',
      items:[
        {id:'dro-post',label:'Publish one portfolio item',done:false},
        {id:'dro-leads',label:'Contact 5 prospects',done:false},
        {id:'dro-follow',label:'Follow up previous leads',done:false},
        {id:'dro-shoot',label:'Arrange one shoot',done:false},
        {id:'dro-offer',label:'Tighten one commercial offer',done:false}
      ]
    },
    Career: {
      icon:'💻', subtitle:'Stable future path',
      items:[
        {id:'car-build',label:'Make one portfolio improvement',done:false},
        {id:'car-apply',label:'Apply to 2–3 high-fit roles',done:false},
        {id:'car-cv',label:'Improve one CV bullet / case study',done:false},
        {id:'car-interview',label:'Complete one interview-prep block',done:false},
        {id:'car-github',label:'Ship one visible GitHub improvement',done:false}
      ]
    }
  },
  money: [],
  brain: [],
  settings: {
    compactMode:false,
    showXP:true,
    smartPlanner:true,
    badgeRemaining:true
  }
};


// ---- state.js ----
const clone = value => structuredClone(value);
let state = null;

function localDateKey(date=new Date()) {
  const y=date.getFullYear();
  const m=String(date.getMonth()+1).padStart(2,'0');
  const d=String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}

function emptyHealth(){ return {prayer:false,gym:false,meals:false,water:false,lowScroll:false,sleep:false,note:''}; }

function mergeDefaults(saved) {
  if (!saved) return clone(defaultState);
  const base = clone(defaultState);
  return {
    ...base,
    ...saved,
    profile:{...base.profile,...(saved.profile||{})},
    settings:{...base.settings,...(saved.settings||{})},
    daily:{...base.daily,...(saved.daily||{})},
    paths:{...base.paths,...(saved.paths||{})},
    money:Array.isArray(saved.money)?saved.money:[],
    brain:Array.isArray(saved.brain)?saved.brain:[],
    history:Array.isArray(saved.history)?saved.history:[]
  };
}

function applyLegacy(state, legacy) {
  if (!legacy) return state;
  const day = state.daily[TODAY_KEY];
  const oldTasks = legacy.todayTasks || [];
  const legacyAliases={admin:'base-car',build:'deep-work',business:'career-dronix'};
  for (const old of oldTasks) {
    const cleaned=(old.title||'').replace(/^\d{2}:\d{2}\s*·\s*/, '');
    const targetId=legacyAliases[old.id]||old.id;
    const match = day.tasks.find(t => t.id === targetId || t.title===cleaned || t.title.includes(cleaned));
    if (match) match.done = Boolean(old.done);
  }
  if (legacy.money) state.money = legacy.money.map(m=>({...m,date:m.date||TODAY_KEY}));
  if (legacy.brain) state.brain = legacy.brain;
  if (legacy.health && day.health) {
    for (const item of legacy.health) {
      const label = String(item[1]||'').toLowerCase();
      if (label.includes('prayer')) day.health.prayer = Boolean(item[2]);
      if (label.includes('gym')) day.health.gym = Boolean(item[2]);
      if (label.includes('meal') || label.includes('protein')) day.health.meals = Boolean(item[2]);
      if (label.includes('water')) day.health.water = Boolean(item[2]);
      if (label.includes('scroll')) day.health.lowScroll = Boolean(item[2]);
      if (label.includes('sleep')) day.health.sleep = Boolean(item[2]);
    }
    day.health.note = legacy.healthNote || '';
  }
  const pathMap = {Taxi:'Taxi',ADI:'ADI',Dronix:'Dronix',Jobs:'Career'};
  for (const [oldKey,newKey] of Object.entries(pathMap)) {
    const arr = legacy.pathChecks?.[oldKey];
    if (!Array.isArray(arr)) continue;
    arr.forEach(old => {
      const item = state.paths[newKey]?.items?.find(x=>x.id===old[0] || x.label===old[1]);
      if(item) item.done=Boolean(old[2]);
    });
  }
  return state;
}

function ensureTodayRecord() {
  const key=localDateKey();
  if(state.daily[key]) return state.daily[key];

  const dates=Object.keys(state.daily).sort();
  const previous=dates.length ? state.daily[dates[dates.length-1]] : null;
  const carry=(previous?.tasks||[])
    .filter(t=>!t.done && !t.fixed && !t.bonus)
    .map(t=>({...clone(t),id:`carry-${key}-${t.id}`,time:'',done:false,carried:true,detail:`Carried forward · ${t.detail||''}`}));

  state.daily[key]={date:key,energy:3,mood:'steady',tasks:carry,health:emptyHealth(),review:null};
  if(previous && !previous.review){
    previous.review={auto:true,closedAt:new Date().toISOString(),completed:previous.tasks.filter(t=>t.done).length,total:previous.tasks.length};
  }
  state.history.push({at:new Date().toISOString(),type:'day_created',date:key,carried:carry.length});
  return state.daily[key];
}

async function initState() {
  const saved = await dbGet('state');
  if (saved) state = mergeDefaults(saved);
  else {
    const migration = await migrateLegacy();
    state = clone(defaultState);
    if (migration?.legacy) state = applyLegacy(state, migration.legacy);
  }
  ensureTodayRecord();
  await saveState();
  return state;
}

function getState() { return state; }
function getToday() { return ensureTodayRecord(); }
async function saveState() { await dbSet('state', state); }
async function replaceState(next) { state = mergeDefaults(next); ensureTodayRecord(); await saveState(); return state; }

async function mutate(fn) { fn(state); await saveState(); return state; }
function addXP(amount) { state.xpTotal = Math.max(0,(state.xpTotal||0)+Number(amount||0)); }

async function toggleTask(id, done) {
  const day = getToday();
  const task = day.tasks.find(t=>t.id===id);
  if (!task || task.done===done) return;
  task.done=done;
  addXP(done ? task.xp : -task.xp);
  state.history.push({at:new Date().toISOString(),type:done?'task_done':'task_reopened',date:day.date,id:task.id,title:task.title,xp:done?task.xp:-task.xp});
  await saveState();
}

async function addTask(task) {
  const day=getToday();
  day.tasks.push({id:`task-${crypto.randomUUID?.()||Date.now()}`,title:task.title,detail:task.detail||'',area:task.area||'Life',time:task.time||'',duration:Number(task.duration||30),xp:Number(task.xp||50),done:false,priority:Number(task.priority||3),impact:Number(task.impact||3),urgency:Number(task.urgency||3),income:Number(task.income||0),energy:Number(task.energy||2),fixed:Boolean(task.fixed)});
  await saveState();
}

async function updateTask(id, patch) { const task=getToday().tasks.find(t=>t.id===id); if (!task) return; Object.assign(task,patch); await saveState(); }
async function removeTask(id) { const day=getToday(); const index=day.tasks.findIndex(t=>t.id===id); if(index<0) return; const [task]=day.tasks.splice(index,1); if(task.done) addXP(-task.xp); await saveState(); }


// ---- smart.js ----
function minutesFromHHMM(value) {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return null;
  const [h,m] = value.split(':').map(Number);
  return h*60+m;
}

function minutesNow(date = new Date()) {
  return date.getHours()*60 + date.getMinutes();
}

function taskScore(task, context = {}) {
  if (task.done) return -Infinity;
  const nowMin = context.nowMin ?? minutesNow();
  const currentEnergy = context.energy ?? 3;
  const tMin = minutesFromHHMM(task.time);

  let score = 0;
  score += (task.impact ?? 3) * 8;
  score += (task.urgency ?? 3) * 7;
  score += (task.priority ?? 3) * 6;
  score += (task.income ?? 0) * 5;

  // Prefer tasks whose energy demand matches the user's current energy.
  const energyGap = Math.abs((task.energy ?? 2) - currentEnergy);
  score -= energyGap * 4;

  // Short tasks get a slight execution bonus when the day is moving.
  if ((task.duration ?? 60) <= 30) score += 5;
  else if ((task.duration ?? 60) > 120) score -= 3;

  if (tMin !== null) {
    const delta = tMin - nowMin;
    if (task.fixed) {
      if (delta >= 0 && delta <= 120) score += 70 - Math.max(0, delta-15)*0.35;
      if (delta < 0 && Math.abs(delta) <= (task.duration ?? 30)+45) score += 60;
      if (delta < -(task.duration ?? 30)-45) score -= 80;
    } else {
      if (delta >= -30 && delta <= 90) score += 16;
      if (delta < -180) score -= 7;
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
  const tMin = minutesFromHHMM(task.time);
  const reasons = [];

  if (task.fixed && tMin !== null) {
    const delta = tMin-nowMin;
    if (delta > 0 && delta <= 120) reasons.push(`Fixed event in about ${Math.max(1,Math.round(delta))} min`);
    else if (delta <= 0) reasons.push('Fixed event is due now');
  }
  if ((task.income ?? 0) >= 4) reasons.push('strong income impact');
  if ((task.impact ?? 0) >= 5) reasons.push('high long-term impact');
  if ((task.urgency ?? 0) >= 4) reasons.push('time-sensitive');
  if ((task.duration ?? 60) <= 30) reasons.push('quick to complete');

  const nextFixed = tasks
    .filter(t => !t.done && t.fixed && minutesFromHHMM(t.time) !== null && minutesFromHHMM(t.time) > nowMin)
    .sort((a,b)=>minutesFromHHMM(a.time)-minutesFromHHMM(b.time))[0];
  if (!task.fixed && nextFixed) {
    const gap = minutesFromHHMM(nextFixed.time)-nowMin;
    if ((task.duration ?? 60) <= Math.max(0,gap-25)) reasons.push(`fits before ${nextFixed.title}`);
  }

  return reasons.length ? `Recommended because it is ${reasons.join(', ')}.` : 'Best balance of priority, impact, timing and effort right now.';
}

function dayReadiness(tasks) {
  const core = tasks.filter(t=>!t.bonus);
  if (!core.length) return 100;
  const weightedTotal = core.reduce((s,t)=>s+(t.xp||50),0);
  const weightedDone = core.filter(t=>t.done).reduce((s,t)=>s+(t.xp||50),0);
  return Math.round(weightedDone/weightedTotal*100);
}

function computeInsights(state, day) {
  const tasks = day.tasks || [];
  const done = tasks.filter(t=>t.done);
  const core = tasks.filter(t=>!t.bonus);
  const money = (state.money || []).filter(x => !x.date || x.date === day.date);
  const income = money.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.amount||0),0);
  const expense = money.filter(x=>x.type==='expense').reduce((s,x)=>s+Number(x.amount||0),0);

  const morning = tasks.filter(t => minutesFromHHMM(t.time) !== null && minutesFromHHMM(t.time)<12*60);
  const afternoon = tasks.filter(t => minutesFromHHMM(t.time) !== null && minutesFromHHMM(t.time)>=12*60 && minutesFromHHMM(t.time)<18*60);
  const evening = tasks.filter(t => minutesFromHHMM(t.time) !== null && minutesFromHHMM(t.time)>=18*60);
  const pct = arr => arr.length ? Math.round(arr.filter(t=>t.done).length/arr.length*100) : 0;

  const areaMap = {};
  tasks.forEach(t=>{
    if(!areaMap[t.area]) areaMap[t.area]={total:0,done:0};
    areaMap[t.area].total++;
    if(t.done) areaMap[t.area].done++;
  });
  const bestArea = Object.entries(areaMap).sort((a,b)=>(b[1].done/b[1].total)-(a[1].done/a[1].total))[0];

  return {
    completion: core.length ? Math.round(core.filter(t=>t.done).length/core.length*100) : 0,
    morning:pct(morning), afternoon:pct(afternoon), evening:pct(evening),
    income, expense, net:income-expense,
    doneCount:done.length,
    bestArea:bestArea ? bestArea[0] : '—',
    smartMessage: done.length >= 6
      ? 'Momentum is strong. Protect the next high-impact block instead of adding more tasks.'
      : done.length >= 3
        ? 'You have momentum. Finishing one important path task will improve the day more than starting something new.'
        : 'Reduce friction: complete one short, high-impact mission first to create momentum.'
  };
}

function estimateFreeWindow(tasks, date = new Date()) {
  const nowMin = minutesNow(date);
  const nextFixed = tasks.filter(t=>!t.done && t.fixed)
    .map(t=>({t,m:minutesFromHHMM(t.time)}))
    .filter(x=>x.m !== null && x.m>nowMin)
    .sort((a,b)=>a.m-b.m)[0];
  if (!nextFixed) return null;
  return { minutes: Math.max(0,nextFixed.m-nowMin), next:nextFixed.t };
}


// ---- ui.js ----
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

const areaIcon = area => ({Body:'🏋️',Taxi:'🚕',ADI:'🚘',Life:'🏠',Health:'🏥',Career:'💻',Business:'🚁',Money:'💷'}[area] || '⚡');

function taskCard(task, currentId, showXP=true) {
  const tags = [task.area, task.time || null, task.duration ? `${task.duration} min` : null].filter(Boolean);
  return `<article class="task-card ${task.done?'done':''} ${task.id===currentId?'current':''}" data-task-id="${esc(task.id)}">
    <input class="check task-toggle" type="checkbox" ${task.done?'checked':''} aria-label="Mark ${esc(task.title)} complete">
    <div class="task-main task-open" role="button">
      <div class="task-title">${areaIcon(task.area)} ${esc(task.title)}</div>
      <div class="task-meta">${esc(task.detail)}</div>
      <div class="task-footer">${tags.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}${task.fixed?'<span class="tag priority-high">fixed</span>':''}${task.carried?'<span class="tag">carried forward</span>':''}</div>
    </div>
    ${showXP?`<div class="xp">+${task.xp} XP</div>`:''}
  </article>`;
}

function formatDayLabel(dateKey){ const d=new Date(dateKey+'T12:00:00'); return new Intl.DateTimeFormat(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d).toUpperCase(); }

function todayView(state, day) {
  const next = state.settings.smartPlanner ? getNextTask(day.tasks,{energy:day.energy}) : day.tasks.find(t=>!t.done);
  const readiness = dayReadiness(day.tasks);
  const done = day.tasks.filter(t=>t.done).length;
  const income = state.money.filter(x=>x.type==='income' && (!x.date || x.date===day.date)).reduce((s,x)=>s+Number(x.amount||0),0);
  const free = estimateFreeWindow(day.tasks);
  const coreOpen = day.tasks.filter(t=>!t.done && !t.bonus).length;
  return `<div class="view-enter">
    <section class="hero">
      <div class="hero-top">
        <div>
          <div class="date-label">${esc(formatDayLabel(day.date))}</div>
          <h2>Direct the day. Don't drift through it.</h2>
          <p>${free ? `${free.minutes} min until ${esc(free.next.title)}.` : 'No upcoming fixed event is blocking the next move.'}</p>
        </div>
        <div class="score-ring" style="--p:${readiness}"><div><strong>${readiness}%</strong><small>DAY</small></div></div>
      </div>
      <div class="metrics">
        <div class="metric"><span>MISSIONS LEFT</span><strong>${coreOpen}</strong></div>
        <div class="metric"><span>CASH TODAY</span><strong>£${income.toFixed(0)}</strong></div>
        <div class="metric"><span>LEVEL XP</span><strong>${state.xpTotal}</strong></div>
      </div>
      <div class="chiprow" style="margin-top:12px"><span class="tag">ENERGY</span>${[1,2,3,4,5].map(n=>`<button class="pill energy-btn" data-energy="${n}" style="${day.energy===n?'border-color:var(--accent);color:var(--text)':''}">${'●'.repeat(n)}</button>`).join('')}</div>
      <div class="next-card">
        <div class="next-top"><div><div class="label">SMART NEXT</div><h3>${next?`${areaIcon(next.area)} ${esc(next.title)}`:'🏆 Core missions complete'}</h3><p>${next?esc(next.detail):'Review the day and choose tomorrow’s top three.'}</p></div>${next?`<span class="pill">${next.duration} min</span>`:''}</div>
        <div class="reason">${next?esc(plannerReason(next,day.tasks,{energy:day.energy})):'You have cleared the important queue.'}</div>
        ${next?`<div class="button-row" style="margin-top:12px"><button class="primary start-focus" data-id="${esc(next.id)}">Focus now</button><button class="secondary mark-next-done" data-id="${esc(next.id)}">Mark done</button></div>`:''}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h3>Mission queue</h3><small>${done}/${day.tasks.length} complete</small></div>
      <div class="progress-track"><div class="progress-fill" style="width:${Math.round(done/day.tasks.length*100)}%"></div></div>
      <div class="task-list" style="margin-top:10px">${day.tasks.map(t=>taskCard(t,next?.id,state.settings.showXP)).join('')}</div>
    </section>
    <button class="fab" id="quickAdd" aria-label="Add mission">+</button>
  </div>`;
}

function focusView(state, day, focusState) {
  const next = focusState.taskId ? day.tasks.find(t=>t.id===focusState.taskId) : getNextTask(day.tasks,{energy:day.energy});
  const seconds = focusState.remaining ?? ((next?.duration || 25)*60);
  const mm = String(Math.floor(seconds/60)).padStart(2,'0');
  const ss = String(seconds%60).padStart(2,'0');
  return `<div class="view-enter">
    <section class="hero focus-wrap">
      <div class="date-label">FOCUS MODE</div>
      <div class="focus-orb"><div><strong id="focusTime">${mm}:${ss}</strong><small>${focusState.running?'RUNNING':'READY'}</small></div></div>
      <div class="focus-title">${next?esc(next.title):'No mission selected'}</div>
      <div class="focus-sub">${next?esc(next.detail):'Choose a mission from Today.'}</div>
      <div class="button-row" style="margin-top:18px;justify-content:center">
        <button class="primary" id="focusToggle" ${next?'':'disabled'}>${focusState.running?'Pause':'Start focus'}</button>
        <button class="secondary" id="focusReset" ${next?'':'disabled'}>Reset</button>
      </div>
      ${next?`<div class="chiprow"><span class="tag">${esc(next.area)}</span><span class="tag">${next.duration} min planned</span><span class="tag">+${next.xp} XP</span></div>`:''}
    </section>
    ${next?`<section class="section"><div class="panel"><div class="section-head"><h3>Finish state</h3></div><div class="button-row"><button class="primary focus-complete" data-id="${esc(next.id)}">Complete mission</button><button class="secondary focus-blocked" data-id="${esc(next.id)}">Blocked / postpone</button></div></div></section>`:''}
  </div>`;
}

function pathCard(name,path) {
  const done=path.items.filter(x=>x.done).length;
  const pct=Math.round(done/path.items.length*100);
  return `<section class="path-card">
    <div class="path-header"><div class="icon-bubble">${path.icon}</div><div><h4>${esc(name)}</h4><p>${esc(path.subtitle)}</p></div><span class="pill" style="margin-left:auto">${pct}%</span></div>
    <div class="progress-track" style="margin-top:12px"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="mini-list">${path.items.map(i=>`<label class="mini-item ${i.done?'muted':''}"><input type="checkbox" class="path-toggle" data-path="${esc(name)}" data-id="${esc(i.id)}" ${i.done?'checked':''}><span>${esc(i.label)}</span></label>`).join('')}</div>
  </section>`;
}

function pathsView(state) {
  return `<div class="view-enter"><section class="hero"><div class="date-label">ACTIVE PATHS</div><h2>Cash now. Security next. Upside always.</h2><p>Keep the survival path moving without letting it consume the career and business paths.</p></section><section class="section grid-2">${Object.entries(state.paths).map(([n,p])=>pathCard(n,p)).join('')}</section></div>`;
}

function insightsView(state,day) {
  const i=computeInsights(state,day);
  const bars=[i.morning,i.afternoon,i.evening];
  return `<div class="view-enter">
    <section class="hero"><div class="date-label">INTELLIGENCE</div><h2>${esc(i.smartMessage)}</h2><p>Mission Control turns what you actually do into useful signals instead of guilt.</p></section>
    <section class="section grid-2">
      <article class="insight-card"><span class="muted small">CORE COMPLETION</span><strong>${i.completion}%</strong><div class="progress-track" style="margin-top:9px"><div class="progress-fill" style="width:${i.completion}%"></div></div><p>${i.doneCount} missions completed today.</p></article>
      <article class="insight-card"><span class="muted small">NET CASH</span><strong class="${i.net>=0?'positive':'negative'}">£${i.net.toFixed(2)}</strong><p>£${i.income.toFixed(2)} income · £${i.expense.toFixed(2)} expenses.</p></article>
      <article class="insight-card"><span class="muted small">DAY SHAPE</span><strong>${Math.max(...bars)}% strongest block</strong><div class="spark" aria-label="Morning afternoon evening completion"><i style="height:${Math.max(6,i.morning)}%"></i><i style="height:${Math.max(6,i.afternoon)}%"></i><i style="height:${Math.max(6,i.evening)}%"></i></div><p>Morning ${i.morning}% · afternoon ${i.afternoon}% · evening ${i.evening}%.</p></article>
      <article class="insight-card"><span class="muted small">BEST AREA TODAY</span><strong>${esc(i.bestArea)}</strong><p>Keep using momentum, but don't let the easiest category monopolise the day.</p></article>
    </section>
    <section class="section"><div class="section-head"><h3>Timeline</h3></div><div class="panel timeline">${day.tasks.map((t,idx)=>`<div class="timeline-row"><div class="timeline-time">${esc(t.time||'—')}</div><div class="timeline-mark"><div class="timeline-dot" style="opacity:${t.done?1:.35}"></div>${idx<day.tasks.length-1?'<div class="timeline-line"></div>':''}</div><div class="timeline-content"><strong>${esc(t.title)}</strong><small>${t.done?'completed':'open'} · ${esc(t.area)}</small></div></div>`).join('')}</div></section>
  </div>`;
}

function moreView(state,day) {
  const dailyMoney=state.money.filter(x=>!x.date || x.date===day.date);
  const income=dailyMoney.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.amount||0),0);
  const expense=dailyMoney.filter(x=>x.type==='expense').reduce((s,x)=>s+Number(x.amount||0),0);
  const net=income-expense;
  const health=day.health;
  const healthItems=[['prayer','Prayer / spiritual reset'],['gym','Gym / conditioning'],['meals','Proper meals / protein'],['water','Water'],['lowScroll','Avoid pointless scrolling'],['sleep','Sleep target']];
  return `<div class="view-enter">
    <section class="hero"><div class="date-label">LIFE SYSTEMS</div><h2>Body, money, brain and settings.</h2><p>The quieter systems that keep everything else working.</p></section>

    <section class="section"><div class="section-head"><h3>Body & discipline</h3></div><div class="panel">${healthItems.map(([k,label])=>`<label class="task-card ${health[k]?'done':''}" style="margin-bottom:7px"><input class="check health-toggle" data-key="${k}" type="checkbox" ${health[k]?'checked':''}><div class="task-main"><div class="task-title">${esc(label)}</div></div><span class="xp">+15 XP</span></label>`).join('')}<div class="field"><label for="healthNote">Conditioning note</label><textarea id="healthNote" placeholder="Energy, training, how the body feels...">${esc(health.note||'')}</textarea></div></div></section>

    <section class="section"><div class="section-head"><h3>Money</h3><span class="pill ${net>=0?'positive':'negative'}">NET £${net.toFixed(2)}</span></div><div class="panel"><div class="metrics" style="margin-top:0"><div class="metric"><span>INCOME</span><strong class="positive">£${income.toFixed(0)}</strong></div><div class="metric"><span>EXPENSES</span><strong class="negative">£${expense.toFixed(0)}</strong></div><div class="metric"><span>TARGET</span><strong>£${state.profile.dailyCashTarget}</strong></div></div><div class="form-grid"><div class="field"><label>Amount</label><input id="moneyAmount" class="input" type="number" step="0.01" placeholder="20"></div><div class="field"><label>Type</label><select id="moneyType"><option value="income">Income</option><option value="expense">Expense</option></select></div></div><div class="field"><label>Note</label><input id="moneyNote" class="input" placeholder="Deliveroo, lesson, fuel..."></div><button class="primary full" id="addMoney" style="margin-top:10px">Add transaction</button><ul class="entry-list">${dailyMoney.slice(0,8).map(m=>`<li><div class="entry-top"><div><strong>${esc(m.note||m.type)}</strong><div class="task-meta">${esc(m.type)}</div></div><span class="${m.type==='income'?'positive':'negative'}">${m.type==='income'?'+':'-'}£${Number(m.amount).toFixed(2)}</span></div></li>`).join('')}</ul></div></section>

    <section class="section"><div class="section-head"><h3>Brain dump</h3><span class="pill">${state.brain.length}</span></div><div class="panel"><textarea id="brainInput" placeholder="Park the thought here instead of carrying it around..."></textarea><button class="primary full" id="addBrain" style="margin-top:9px">Save thought</button></div><ul class="entry-list">${state.brain.map((n,idx)=>`<li><div class="brain-item"><span>${esc(n.text||n)}</span><button class="ghost brain-done" data-index="${idx}">Done</button></div></li>`).join('')}</ul></section>

    <section class="section"><div class="section-head"><h3>Backup & install</h3></div><div class="install-card"><strong>Keep Mission Control yours.</strong><p class="task-meta">Export a full JSON backup anytime. On iPhone, open the GitHub Pages URL in Safari → Share → Add to Home Screen.</p><div class="button-row" style="margin-top:10px"><button class="secondary" id="exportBackup">Export backup</button><button class="secondary" id="importBackup">Import backup</button><input id="importFile" type="file" accept="application/json,.json" hidden></div></div></section>

    <section class="section"><div class="section-head"><h3>Settings</h3></div><div class="settings-list"><label class="setting-row"><div><strong>Smart planner</strong><small>Rank tasks using timing, impact, income and energy.</small></div><input class="switch setting-toggle" data-key="smartPlanner" type="checkbox" ${state.settings.smartPlanner?'checked':''}></label><label class="setting-row"><div><strong>Show XP</strong><small>Gamify completion without making XP the objective.</small></div><input class="switch setting-toggle" data-key="showXP" type="checkbox" ${state.settings.showXP?'checked':''}></label><label class="setting-row"><div><strong>App badge</strong><small>Show remaining core missions when supported.</small></div><input class="switch setting-toggle" data-key="badgeRemaining" type="checkbox" ${state.settings.badgeRemaining?'checked':''}></label></div></section>
  </div>`;
}

function taskDialog(task) {
  return `<div class="sheet-body"><div class="sheet-head"><h3>Edit mission</h3><button class="icon-button dialog-close">×</button></div><div class="field"><label>Title</label><input class="input" id="editTitle" value="${esc(task.title)}"></div><div class="field"><label>Detail</label><textarea id="editDetail">${esc(task.detail)}</textarea></div><div class="form-grid"><div class="field"><label>Time</label><input class="input" id="editTime" type="time" value="${esc(task.time||'')}"></div><div class="field"><label>Duration (min)</label><input class="input" id="editDuration" type="number" value="${task.duration||30}"></div><div class="field"><label>Area</label><select id="editArea">${['Body','Taxi','ADI','Life','Health','Career','Business','Money'].map(a=>`<option ${task.area===a?'selected':''}>${a}</option>`).join('')}</select></div><div class="field"><label>Priority 1–5</label><input class="input" id="editPriority" type="number" min="1" max="5" value="${task.priority||3}"></div></div><label class="setting-row" style="margin-top:10px"><div><strong>Fixed event</strong><small>Appointments and events that should dominate scheduling.</small></div><input id="editFixed" class="switch" type="checkbox" ${task.fixed?'checked':''}></label><div class="button-row" style="margin-top:14px"><button class="primary full save-task" data-id="${esc(task.id)}">Save changes</button><button class="danger delete-task" data-id="${esc(task.id)}">Delete</button></div></div>`;
}

function quickAddDialog() {
  return `<div class="sheet-body"><div class="sheet-head"><h3>New mission</h3><button class="icon-button dialog-close">×</button></div><div class="field"><label>Mission</label><input class="input" id="newTitle" placeholder="What needs doing?"></div><div class="field"><label>Why / outcome</label><textarea id="newDetail" placeholder="Define what 'done' looks like"></textarea></div><div class="form-grid"><div class="field"><label>Time</label><input class="input" id="newTime" type="time"></div><div class="field"><label>Minutes</label><input class="input" id="newDuration" type="number" value="30"></div><div class="field"><label>Area</label><select id="newArea">${['Life','Career','Money','Taxi','ADI','Business','Body','Health'].map(a=>`<option>${a}</option>`).join('')}</select></div><div class="field"><label>Impact 1–5</label><input class="input" id="newImpact" type="number" min="1" max="5" value="3"></div><div class="field"><label>Urgency 1–5</label><input class="input" id="newUrgency" type="number" min="1" max="5" value="3"></div><div class="field"><label>Income impact 0–5</label><input class="input" id="newIncome" type="number" min="0" max="5" value="0"></div></div><label class="setting-row" style="margin-top:10px"><div><strong>Fixed event</strong><small>Give it scheduling priority.</small></div><input id="newFixed" class="switch" type="checkbox"></label><button class="primary full create-task" style="margin-top:14px">Create mission</button></div>`;
}


// ---- app.js ----
const root = document.getElementById('viewRoot');
const tabs = [...document.querySelectorAll('.tab')];
const taskDialogEl = document.getElementById('taskDialog');
const quickAddEl = document.getElementById('quickAddDialog');
const toast = document.getElementById('toast');
let currentView = 'today';
let focusState = { taskId:null, remaining:null, running:false, timer:null, startedAt:null };
let toastTimer;

const runTransition = fn => {
  if (document.startViewTransition) document.startViewTransition(fn);
  else fn();
};

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove('show'),1800);
}

function haptic(ms=12) {
  if (getState().profile?.haptics && navigator.vibrate) navigator.vibrate(ms);
}

function today() { return getToday(); }

function render() {
  const state = getState();
  const day = today();
  if (currentView === 'today') root.innerHTML = todayView(state,day);
  if (currentView === 'focus') root.innerHTML = focusView(state,day,focusState);
  if (currentView === 'paths') root.innerHTML = pathsView(state);
  if (currentView === 'insights') root.innerHTML = insightsView(state,day);
  if (currentView === 'more') root.innerHTML = moreView(state,day);
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.view===currentView));
  bindViewEvents();
  updateBadge();
}

async function updateBadge() {
  const state=getState();
  if (!state.settings.badgeRemaining) {
    if (navigator.clearAppBadge) try { await navigator.clearAppBadge(); } catch(_){}
    return;
  }
  const remaining=today().tasks.filter(t=>!t.done && !t.bonus).length;
  if (navigator.setAppBadge) {
    try { remaining ? await navigator.setAppBadge(remaining) : await navigator.clearAppBadge(); } catch(_){}
  }
}

function switchView(view) {
  currentView=view;
  runTransition(render);
  window.scrollTo({top:0,behavior:'smooth'});
}

tabs.forEach(tab=>tab.addEventListener('click',()=>switchView(tab.dataset.view)));
document.getElementById('profileButton').addEventListener('click',()=>switchView('more'));

function openTask(id) {
  const task=today().tasks.find(t=>t.id===id);
  if(!task) return;
  taskDialogEl.innerHTML=taskDialog(task);
  taskDialogEl.showModal();
  bindTaskDialog();
}

function openQuickAdd() {
  quickAddEl.innerHTML=quickAddDialog();
  quickAddEl.showModal();
  bindQuickAdd();
  setTimeout(()=>document.getElementById('newTitle')?.focus(),50);
}

function bindTaskDialog() {
  taskDialogEl.querySelector('.dialog-close')?.addEventListener('click',()=>taskDialogEl.close());
  taskDialogEl.querySelector('.save-task')?.addEventListener('click',async e=>{
    const id=e.currentTarget.dataset.id;
    await updateTask(id,{
      title:document.getElementById('editTitle').value.trim(),
      detail:document.getElementById('editDetail').value.trim(),
      time:document.getElementById('editTime').value,
      duration:Number(document.getElementById('editDuration').value)||30,
      area:document.getElementById('editArea').value,
      priority:Number(document.getElementById('editPriority').value)||3,
      fixed:document.getElementById('editFixed').checked
    });
    taskDialogEl.close();haptic();notify('Mission updated');render();
  });
  taskDialogEl.querySelector('.delete-task')?.addEventListener('click',async e=>{
    const id=e.currentTarget.dataset.id;
    if(!confirm('Delete this mission?')) return;
    await removeTask(id);taskDialogEl.close();notify('Mission deleted');render();
  });
}

function bindQuickAdd() {
  quickAddEl.querySelector('.dialog-close')?.addEventListener('click',()=>quickAddEl.close());
  quickAddEl.querySelector('.create-task')?.addEventListener('click',async()=>{
    const title=document.getElementById('newTitle').value.trim();
    if(!title){notify('Give the mission a title');return;}
    const impact=Number(document.getElementById('newImpact').value)||3;
    const urgency=Number(document.getElementById('newUrgency').value)||3;
    const income=Number(document.getElementById('newIncome').value)||0;
    await addTask({
      title,
      detail:document.getElementById('newDetail').value.trim(),
      time:document.getElementById('newTime').value,
      duration:Number(document.getElementById('newDuration').value)||30,
      area:document.getElementById('newArea').value,
      impact,urgency,income,priority:Math.max(1,Math.min(5,Math.round((impact+urgency)/2))),
      energy:2,xp:Math.max(25,Math.min(250,(impact+urgency+income)*10)),
      fixed:document.getElementById('newFixed').checked
    });
    quickAddEl.close();haptic();notify('Mission added');render();
  });
}

function selectFocus(id) {
  stopTimer();
  const task=today().tasks.find(t=>t.id===id);
  focusState={taskId:id,remaining:(task?.duration||25)*60,running:false,timer:null,startedAt:null};
  switchView('focus');
}

function stopTimer() {
  if(focusState.timer) clearInterval(focusState.timer);
  focusState.timer=null;focusState.running=false;
}

function startTimer() {
  if(focusState.running) return;
  focusState.running=true;focusState.startedAt=Date.now();
  focusState.timer=setInterval(()=>{
    focusState.remaining=Math.max(0,(focusState.remaining??0)-1);
    const el=document.getElementById('focusTime');
    if(el){
      const mm=String(Math.floor(focusState.remaining/60)).padStart(2,'0');
      const ss=String(focusState.remaining%60).padStart(2,'0');
      el.textContent=`${mm}:${ss}`;
    }
    if(focusState.remaining<=0){
      stopTimer();haptic(40);notify('Focus block complete');render();
    }
  },1000);
  render();
}

function pauseTimer(){ stopTimer(); render(); }
function resetTimer(){
  stopTimer();
  const task=today().tasks.find(t=>t.id===focusState.taskId);
  focusState.remaining=(task?.duration||25)*60;render();
}

async function setTaskDone(id,done) {
  await toggleTask(id,done);
  haptic(done?18:8);
  notify(done?'Mission complete · XP earned':'Mission reopened');
  render();
}

async function exportBackup() {
  const payload=await exportAll();
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`mission-control-v2-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  notify('Backup exported');
}

async function importBackup(file) {
  try{
    const parsed=JSON.parse(await file.text());
    if(parsed?.app!=='Mission Control' || !parsed.state) throw new Error('Not a Mission Control backup');
    if(!confirm('Replace current Mission Control data with this backup?')) return;
    await replaceState(parsed.state);
    notify('Backup restored');render();
  }catch(err){notify(err.message||'Import failed');}
}

function bindViewEvents() {
  root.querySelectorAll('.task-toggle').forEach(box=>box.addEventListener('change',e=>setTaskDone(e.target.closest('[data-task-id]').dataset.taskId,e.target.checked)));
  root.querySelectorAll('.task-open').forEach(el=>el.addEventListener('click',()=>openTask(el.closest('[data-task-id]').dataset.taskId)));
  root.querySelectorAll('.energy-btn').forEach(b=>b.addEventListener('click',async()=>{await mutate(state=>getTodayFromState(state).energy=Number(b.dataset.energy));haptic();notify('Energy updated · planner recalculated');render();}));
  root.querySelectorAll('.start-focus').forEach(b=>b.addEventListener('click',()=>selectFocus(b.dataset.id)));
  root.querySelectorAll('.mark-next-done').forEach(b=>b.addEventListener('click',()=>setTaskDone(b.dataset.id,true)));
  document.getElementById('quickAdd')?.addEventListener('click',openQuickAdd);

  root.querySelectorAll('.path-toggle').forEach(box=>box.addEventListener('change',async e=>{
    const {path,id}=e.target.dataset;
    await mutate(state=>{
      const item=state.paths[path].items.find(x=>x.id===id);
      if(item && item.done!==e.target.checked){item.done=e.target.checked;addXP(e.target.checked?25:-25);}
    });
    haptic();render();
  }));

  document.getElementById('focusToggle')?.addEventListener('click',()=>focusState.running?pauseTimer():startTimer());
  document.getElementById('focusReset')?.addEventListener('click',resetTimer);
  root.querySelector('.focus-complete')?.addEventListener('click',async e=>{stopTimer();await setTaskDone(e.target.dataset.id,true);switchView('today');});
  root.querySelector('.focus-blocked')?.addEventListener('click',async e=>{
    stopTimer();
    await updateTask(e.target.dataset.id,{urgency:Math.max(1,(today().tasks.find(t=>t.id===e.target.dataset.id)?.urgency||3)-1)});
    notify('Postponed · planner recalculated');switchView('today');
  });

  root.querySelectorAll('.health-toggle').forEach(box=>box.addEventListener('change',async e=>{
    const key=e.target.dataset.key;
    await mutate(state=>{
      const h=getTodayFromState(state).health;
      if(h[key]!==e.target.checked){h[key]=e.target.checked;addXP(e.target.checked?15:-15);}
    });haptic();render();
  }));
  document.getElementById('healthNote')?.addEventListener('change',async e=>{await mutate(state=>getTodayFromState(state).health.note=e.target.value);notify('Health note saved');});

  document.getElementById('addMoney')?.addEventListener('click',async()=>{
    const amount=Number(document.getElementById('moneyAmount').value);
    if(!amount){notify('Enter an amount');return;}
    const type=document.getElementById('moneyType').value;
    const note=document.getElementById('moneyNote').value.trim();
    await mutate(state=>state.money.unshift({id:crypto.randomUUID?.()||String(Date.now()),amount,type,note,date:localDateKey(),at:new Date().toISOString()}));
    notify(type==='income'?'Income logged':'Expense logged');render();
  });
  document.getElementById('addBrain')?.addEventListener('click',async()=>{
    const input=document.getElementById('brainInput');const text=input.value.trim();if(!text)return;
    await mutate(state=>state.brain.unshift({id:crypto.randomUUID?.()||String(Date.now()),text,at:new Date().toISOString()}));
    notify('Thought parked');render();
  });
  root.querySelectorAll('.brain-done').forEach(b=>b.addEventListener('click',async()=>{await mutate(state=>state.brain.splice(Number(b.dataset.index),1));render();}));

  document.getElementById('exportBackup')?.addEventListener('click',exportBackup);
  document.getElementById('importBackup')?.addEventListener('click',()=>document.getElementById('importFile').click());
  document.getElementById('importFile')?.addEventListener('change',e=>{const f=e.target.files?.[0];if(f)importBackup(f);});

  root.querySelectorAll('.setting-toggle').forEach(box=>box.addEventListener('change',async e=>{await mutate(state=>state.settings[e.target.dataset.key]=e.target.checked);render();}));
}

function getTodayFromState(state){ return state.daily[localDateKey()] || Object.values(state.daily).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0]; }

async function boot() {
  try {
    await initState();
    render();
    if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
  } catch (err) {
    root.innerHTML=`<div class="panel"><h3>Mission Control could not start</h3><p class="task-meta">${String(err.message||err)}</p></div>`;
  }
}

boot();
