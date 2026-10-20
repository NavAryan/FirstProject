import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePlan,starterPlan,progress,shiftDate,validDate,nextAction,planHealth,moneySummary} from '../planner.js';

test('original-style notes become separate missions and schedule blocks, not falsely completed',()=>{
 const p=parsePlan('Tuesday 20th October 2026\nTasks\n- [x] Learn Spanish\n- [x] Find a laptop £700 - £800\nSchedule\n- 1:50 - 10:30 - Sleep 😴\n- 17:00 - 21:00 - Deliveroo.','2026-10-19');
 assert.equal(p.date,'2026-10-20');assert.equal(p.rows.length,4);assert.equal(p.rows[2].kind,'block');assert.equal(p.rows[2].duration,520);assert.equal(p.rows[3].duration,240);assert.ok(p.rows.every(r=>!r.done));assert.ok(p.rows.every(r=>r.date==='2026-10-20'));
});
test('checked status is preserved only when explicitly selected',()=>{assert.equal(parsePlan('- [x] Apply for a job','2026-10-20',true).rows[0].done,true);});
test('import handles overnight, 12-hour time, invalid ranges, and repeated lines',()=>{
 const p=parsePlan('Schedule\n11:00 pm - 1:00 am - Sleep\n25:00 - 26:00 - Invalid\nTasks\n- Read a book\n- Read a book','2026-10-20');assert.equal(p.rows.length,2);assert.equal(p.rows[0].duration,120);assert.equal(p.rows[0].time,'23:00');assert.ok(p.warnings.some(w=>w.includes('Check')));
});
test('starter plan has six outcomes and nine time blocks',()=>{const p=parsePlan(starterPlan,'2026-10-20');assert.equal(p.rows.filter(r=>r.kind==='task').length,6);assert.equal(p.rows.filter(r=>r.kind==='block').length,9);});
test('empty and optional-only days have zero completion',()=>{assert.equal(progress({tasks:[]}).pct,0);assert.equal(progress({tasks:[{done:true,bonus:true}]}).total,0);});
test('local calendar arithmetic handles month, year and leap boundaries',()=>{assert.equal(shiftDate('2026-12-31',1),'2027-01-01');assert.equal(shiftDate('2028-02-28',1),'2028-02-29');assert.equal(validDate('2026-02-30'),false);});
test('a future fixed event is not recommended as something to start now',()=>{
 const d={blocks:[],tasks:[{id:'future',title:'Delivery shift',time:'17:00',duration:240,fixed:true,done:false},{id:'now',title:'Read',time:'',duration:20,top:true}]};assert.equal(nextAction(d,{now:600}).item.id,'now');d.tasks.pop();assert.match(nextAction(d,{now:600}).label,/Coming up/);
});
test('an active sleep block is respected before productive work',()=>{const d={blocks:[{id:'sleep',title:'Sleep',time:'01:50',duration:520,done:false}],tasks:[{id:'job',title:'Job',duration:30,top:true,time:''}]};assert.equal(nextAction(d,{now:120}).item.id,'sleep');});
test('reserved time is not double-counted when a mission sits within a block',()=>{const d={blocks:[{title:'Work block',time:'10:00',duration:120}],tasks:[{title:'CV',time:'10:30',duration:30}]};const h=planHealth(d,{dayStart:'08:00',dayEnd:'22:00'});assert.equal(h.reserved,120);assert.equal(h.conflicts.length,0);});
test('overlap warnings and net hourly rate use actual entries',()=>{const d={blocks:[{title:'A',time:'10:00',duration:60},{title:'B',time:'10:30',duration:60}],tasks:[]};assert.equal(planHealth(d,{dayStart:'08:00',dayEnd:'22:00'}).conflicts.length,1);const m=moneySummary({money:[{type:'income',amount:100,hours:4,date:'2026-10-20'},{type:'expense',amount:20,date:'2026-10-20'}]},'2026-10-20');assert.equal(m.net,80);assert.equal(m.rate,20);});
test('mission inside a current block is the next action and is not counted as extra flexible time',()=>{const d={blocks:[{id:'work',title:'Career hour',time:'14:00',duration:60}],tasks:[{id:'cv',title:'Submit application',duration:30,time:'',blockId:'work',top:true}]};assert.equal(nextAction(d,{now:850}).item.id,'cv');assert.equal(planHealth(d,{dayStart:'08:00',dayEnd:'22:00'}).flexible,0);});
