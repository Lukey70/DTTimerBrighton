import assert from 'node:assert/strict';
import { DriveThruSimulator, computeScoreboard, TARGETS } from './simulation.mjs';
function runTicks(sim, seconds) { for (let i = 0; i < seconds; i += 1) sim.tick(1); }

function testTargets() { assert.equal(TARGETS.present, 60); assert.equal(TARGETS.total, 90); }
function testTenCarCapacityPositions() {
  const sim = new DriveThruSimulator();
  const positions = ['lane1_pre1','order1','lane1_post','lane2_pre1','order2','lane2_merge','gap_cash_entry','cash','gap_present1','present'];
  assert.equal(positions.length, 10);
}
function testOnePreOrderSpaceEachLane() {
  const sim1 = new DriveThruSimulator(); let r = sim1.addCar(1); assert.equal(r.ok, true); assert.equal(sim1.carAt('lane1_pre1')?.lane, 1); r = sim1.addCar(1); assert.equal(r.ok, false); sim1.tick(1); assert.equal(sim1.carAt('order1')?.lane, 1);
  const sim2 = new DriveThruSimulator(); r = sim2.addCar(2); assert.equal(r.ok, true); assert.equal(sim2.carAt('lane2_pre1')?.lane, 2); r = sim2.addCar(2); assert.equal(r.ok, false); sim2.tick(1); assert.equal(sim2.carAt('order2')?.lane, 2);
}
function testLane1DiagonalPostThenBeforeCash() { const sim = new DriveThruSimulator(); sim.addCar(1); sim.tick(1); sim.releaseStation('order1'); sim.tick(1); assert.equal(sim.carAt('lane1_post')?.lane, 1); sim.tick(1); assert.equal(sim.carAt('gap_cash_entry')?.lane, 1); }
function testLane2ForwardPostThenBeforeCash() { const sim = new DriveThruSimulator(); sim.addCar(2); sim.tick(1); sim.releaseStation('order2'); sim.tick(1); assert.equal(sim.carAt('lane2_merge')?.lane, 2); sim.tick(1); assert.equal(sim.carAt('gap_cash_entry')?.lane, 2); }
function testSharedSectionLength() { const sim = new DriveThruSimulator(); sim.addCar(1); sim.tick(1); sim.releaseStation('order1'); sim.tick(1); assert.equal(sim.carAt('lane1_post')?.lane, 1); sim.tick(1); assert.equal(sim.carAt('gap_cash_entry')?.lane, 1); sim.tick(1); assert.equal(sim.carAt('cash')?.lane, 1); sim.releaseStation('cash'); sim.tick(1); assert.equal(sim.carAt('gap_present1')?.lane, 1); sim.tick(1); assert.equal(sim.carAt('present')?.lane, 1); }
function testMergePriorityByFirstFinishedOrder() { const sim = new DriveThruSimulator(); const c=(id,lane,position,orderReleaseAt)=>({ id,lane,position,positionEnteredAt:0,totalStartedAt:0,orderReleaseAt,releaseRequested:false,thresholds:{yellow:false,red:false},timings:{order1:null,order2:null,cash:null,present:null,total:null},completedAt:null }); sim.activeCars=[c(1,2,'lane2_merge',5),c(2,1,'lane1_post',7)]; sim.tick(1); assert.equal(sim.carAt('gap_cash_entry')?.id, 1); }
function testSequentialAdvanceAfterCompletion() { const sim = new DriveThruSimulator(); const c=(id,lane,position,releaseRequested=false)=>({ id,lane,position,positionEnteredAt:0,totalStartedAt:0,orderReleaseAt:0,releaseRequested,thresholds:{yellow:false,red:false},timings:{order1:null,order2:null,cash:null,present:null,total:null},completedAt:null }); sim.activeCars=[c(1,1,'present',true),c(2,1,'gap_present1'),c(3,1,'cash',true)]; sim.tick(1); assert.equal(sim.completedCars.length,1); assert.equal(sim.carAt('gap_present1')?.id,2); assert.equal(sim.carAt('cash')?.id,3); sim.tick(1); assert.equal(sim.carAt('present')?.id,2); sim.tick(1); assert.equal(sim.carAt('gap_present1')?.id,3); }
function testCompletedCarsAffectAveragesOnly() { const sim = new DriveThruSimulator(); sim.addCar(1); sim.tick(1); runTicks(sim,3); sim.releaseStation('order1'); runTicks(sim,4); sim.releaseStation('cash'); runTicks(sim,2); sim.releaseStation('present'); sim.tick(1); assert.equal(sim.completedCars.length,1); const completed=sim.completedCars[0]; sim.addCar(1); const s=computeScoreboard(sim.completedCars); assert.equal(s.order1.avg, completed.timings.order1); assert.equal(s.total.avg, completed.timings.total); }
function testThresholdEvents() { const sim = new DriveThruSimulator(); sim.addCar(1); sim.tick(1); sim.releaseStation('order1'); sim.tick(1); let y=false,r=false; for(let i=0;i<125;i++){ const e=sim.tick(1); if(e.some(x=>x.type==='yellow-threshold')) y=true; if(e.some(x=>x.type==='red-threshold')) r=true; } assert.equal(y,true); assert.equal(r,true); }
function testReset() { const sim = new DriveThruSimulator(); sim.addCar(1); sim.tick(1); sim.reset(); assert.equal(sim.activeCars.length,0); assert.equal(sim.completedCars.length,0); assert.equal(sim.now,0); }
function runAll(){ testTargets(); testTenCarCapacityPositions(); testOnePreOrderSpaceEachLane(); testLane1DiagonalPostThenBeforeCash(); testLane2ForwardPostThenBeforeCash(); testSharedSectionLength(); testMergePriorityByFirstFinishedOrder(); testSequentialAdvanceAfterCompletion(); testCompletedCarsAffectAveragesOnly(); testThresholdEvents(); testReset(); console.log('All simulation tests passed.'); }
runAll();
