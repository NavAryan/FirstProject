export const TODAY_KEY = '2026-08-12';

export const goalMap = {
  Body: 'live', Health: 'live', Life: 'stabilise', Money: 'survive', Taxi: 'survive', ADI: 'survive', Career: 'stabilise', Business: 'build'
};

export const defaultGoals = [
  {id:'survive',icon:'💷',title:'Survive',subtitle:'Income and obligations',target:'Keep cash flow moving without panic.',projects:['Taxi','ADI','Cash flow']},
  {id:'stabilise',icon:'🧱',title:'Stabilise',subtitle:'Career, home and security',target:'Build dependable work and a stable base.',projects:['Career','Accommodation','Admin']},
  {id:'build',icon:'🚀',title:'Build',subtitle:'Business and upside',target:'Create assets and opportunities that can compound.',projects:['Dronix','Products','Portfolio']},
  {id:'live',icon:'❤️',title:'Live',subtitle:'Body, faith and real life',target:'Protect health, faith, relationships and memorable experiences.',projects:['Body','Health','Faith']}
];

export const defaultState = {
  version: 4,
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
  settings: {compactMode:false,showXP:true,smartPlanner:true,badgeRemaining:true,showReasons:true,learningEnabled:true,wakeLockFocus:true,persistentStorage:true}
};
