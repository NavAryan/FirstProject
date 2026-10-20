export const TODAY_KEY = '2026-08-12'; // Used only when migrating the original v1 app.
export const goalMap = { Body:'live',Health:'live',Faith:'live',Learning:'build',Life:'stabilise',Money:'survive',Taxi:'survive',ADI:'survive',Career:'stabilise',Business:'build' };
export const defaultGoals = [
 {id:'survive',icon:'↗',title:'Earn',subtitle:'Income and obligations',target:'Build dependable, profitable income.',projects:['Taxi','ADI','Cash flow']},
 {id:'stabilise',icon:'◇',title:'Establish',subtitle:'Career and a stable base',target:'Make progress towards lasting work and security.',projects:['Career','Admin','Car']},
 {id:'build',icon:'✦',title:'Build',subtitle:'Skills, business and ideas',target:'Finish things that create future opportunities.',projects:['Dronix','Learning','Portfolio']},
 {id:'live',icon:'♡',title:'Live',subtitle:'Faith, health and everyday life',target:'Give your foundations time every day.',projects:['Faith','Health','Relationships']}
];
export const defaultHabits = [
 {id:'prayer',title:'Prayer',icon:'☾',target:5,unit:'prayers',active:true,detail:'Use your local prayer timetable.'},
 {id:'quran',title:'Quran',icon:'◈',target:1,unit:'session',active:true,detail:'Listen, read or memorise for a focused session.'},
 {id:'exercise',title:'Move your body',icon:'↗',target:1,unit:'session',active:true,detail:'Training, a walk or a recovery session.'},
 {id:'meals',title:'Proper meals',icon:'◌',target:3,unit:'meals',active:true,detail:'Make space for breakfast, lunch and dinner.'},
 {id:'spanish',title:'Spanish',icon:'ñ',target:1,unit:'session',active:true,detail:'20 focused minutes of practice.'},
 {id:'reading',title:'Read',icon:'▤',target:1,unit:'session',active:true,detail:'Ten minutes with a book that answers a real question.'},
 {id:'water',title:'Water breaks',icon:'◊',target:4,unit:'check-ins',active:true,detail:'A simple reminder to drink throughout the day.'}
];
export const defaultState = {
 version:5,createdAt:new Date().toISOString(),profile:{name:'Naweed',dailyCashTarget:60,weeklyCashTarget:400,sleepTargetHours:8,defaultEnergy:3,dayStart:'08:00',dayEnd:'22:00',haptics:true},xpTotal:0,history:[],goals:defaultGoals,daily:{},habits:defaultHabits,recurring:[],focus:null,
 paths:{
  Taxi:{icon:'🚕',subtitle:'Vehicle and licensing',goal:'survive',items:[{id:'taxi-repair',label:'Resolve car safety and warning-light issues',done:false},{id:'taxi-insurance',label:'Confirm the insurance route',done:false},{id:'taxi-docs',label:'Prepare vehicle documents',done:false},{id:'taxi-inspection',label:'Arrange the licensing inspection',done:false}]},
  Career:{icon:'💻',subtitle:'A stable data career',goal:'stabilise',items:[{id:'car-cv',label:'Create a strong master CV',done:false},{id:'car-portfolio',label:'Publish a clear portfolio case study',done:false},{id:'car-apply',label:'Submit a tailored application',done:false},{id:'car-interview',label:'Prepare for interviews',done:false}]},
  Dronix:{icon:'🚁',subtitle:'Build a commercial portfolio',goal:'build',items:[{id:'dro-offer',label:'Define one clear service offer',done:false},{id:'dro-post',label:'Publish a portfolio video',done:false},{id:'dro-leads',label:'Contact five suitable prospects',done:false},{id:'dro-follow',label:'Follow up on enquiries',done:false}]},
  ADI:{icon:'🚘',subtitle:'Instructor development',goal:'survive',items:[{id:'adi-next',label:'Confirm the next qualification milestone',done:false},{id:'adi-theory',label:'Practise weak knowledge areas',done:false},{id:'adi-teach',label:'Develop a structured lesson plan',done:false}]}
 },money:[],brain:[],settings:{showXP:false,smartPlanner:true,wakeLockFocus:true,badgeRemaining:true},lastBackupAt:null
};
