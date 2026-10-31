// Textbook bend values: BA = π·(R + K·T)·A/180, OSSB = (R + T)·tan(A/2), BD = 2·OSSB − BA.
import { describe, expect, it } from 'vitest';
import { resolveActiveParams, solveFlatPattern, solveSimulator } from './bend.math';
import type { ActiveParams } from './types';

const sim = (simAngle: number, r: string, t: string, k: string, l1 = '4', l2 = '4') =>
  solveSimulator({ simAngle, simRadius: r, simThickness: t, simKFactor: k, simFlange1: l1, simFlange2: l2 });

describe('solveSimulator', () => {
  it.each([
    // angle, R, T, K, BA, OSSB, BD
    [90, '0.125', '0.1', '0.42', 0.262323, 0.225, 0.187677],
    [90, '0.0625', '0.0625', '0.5', 0.147262, 0.125, 0.102738],
    [45, '0.125', '0.1', '0.42', 0.131161, 0.093198, 0.055235],
  ])('%d° R=%s T=%s K=%s', (angle, r, t, k, ba, ossb, bd) => {
    const out = sim(angle, r, t, k);
    expect(out.BA).toBeCloseTo(ba, 5);
    expect(out.DL).toBe(out.BA);
    expect(out.OSSB).toBeCloseTo(ossb, 5);
    expect(out.BD).toBeCloseTo(bd, 5);
    expect(out.FL).toBeCloseTo(8 - bd, 5);
  });

  it('Y-factor is K·π/2 and the neutral radius is R + K·T', () => {
    const out = sim(90, '0.125', '0.1', '0.42');
    expect(out.Y).toBeCloseTo(0.42 * Math.PI / 2, 10);
    expect(out.r_neutral).toBeCloseTo(0.167, 10);
  });

  it('clamps the angle to 1..179°', () => {
    expect(sim(0, '0.125', '0.1', '0.42').angle).toBe(1);
    expect(sim(200, '0.125', '0.1', '0.42').angle).toBe(179);
  });
});

describe('solveFlatPattern', () => {
  const params: ActiveParams = { thickness_in: 0.1, radius_in: 0.125, kFactor: 0.42, minFlange_in: 0.5, dieWidth_in: 0.8, specName: 't' };

  it('a U-channel: flat = outside sum − 2·BD', () => {
    const out = solveFlatPattern({ activeParams: params, bendAngle: 90, baseLength: '4', leftFlange: '1', rightFlange: '1', unit: 'in' });
    expect(out.numBends).toBe(2);
    expect(out.BD).toBeCloseTo(0.187677, 5);
    expect(out.flatLength).toBeCloseTo(6 - 2 * 0.187677, 5);
    expect(out.leftBendLine).toBeCloseTo(1 - 0.187677 / 2, 5);
    expect(out.insideBase).toBeCloseTo(3.8, 10);
  });

  it('metric inputs come back in mm, the same part', () => {
    const inch = solveFlatPattern({ activeParams: params, bendAngle: 90, baseLength: '4', leftFlange: '1', rightFlange: '0', unit: 'in' });
    const mm = solveFlatPattern({ activeParams: params, bendAngle: 90, baseLength: '101.6', leftFlange: '25.4', rightFlange: '0', unit: 'mm' });
    expect(mm.flatLength).toBeCloseTo(inch.flatLength * 25.4, 6);
    expect(mm.numBends).toBe(1);
  });

  it('flags a flange shorter than the minimum', () => {
    const out = solveFlatPattern({ activeParams: params, bendAngle: 90, baseLength: '4', leftFlange: '0.3', rightFlange: '1', unit: 'in' });
    expect(out.isLeftFlangeTooShort).toBe(true);
    expect(out.isRightFlangeTooShort).toBe(false);
  });
});

describe('resolveActiveParams', () => {
  it('a custom metric spec is converted to inches', () => {
    const p = resolveActiveParams({ isCustomSpec: true, availableSpecs: [], selectedSpecIdx: 0, unit: 'mm',
      customThickness: '2.54', customRadius: '1.27', customKFactor: '0.4' });
    expect(p.thickness_in).toBeCloseTo(0.1, 10);
    expect(p.radius_in).toBeCloseTo(0.05, 10);
    expect(p.dieWidth_in).toBeCloseTo(0.8, 10);
  });
});
