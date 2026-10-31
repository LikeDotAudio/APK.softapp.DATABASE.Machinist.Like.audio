// Textbook speeds & feeds: RPM = 3.82·SFM/D (inch), RPM = 1000·Vc/(π·D) (metric),
// feed = RPM·z·fz, Garr chip thinning, Ra = fz²/(32·R).
import { describe, expect, it } from 'vitest';
import { solveCut } from './cutting.math';
import type { CutInputs, MaterialPreset } from './types';

const aluminum: MaterialPreset = { name: '6061', sfm: 800, vc: 250, ipt: 0.004, fz: 0.1, hardness: '95 HB', category: 'aluminum', kFactor: 0.3 };
const inputs = (over: Partial<CutInputs>): CutInputs => ({
  toolDia: '0.5', flutes: 4, customSpeed: '300', customFeed: '0.002', widthOfCut: '0.5', depthOfCut: '0.1',
  cutLength: '10', cornerRad: '0.031', targetCpt: '0.002', ...over,
});

describe('solveCut — imperial', () => {
  it.each([
    // SFM, dia, rpm
    [300, '0.5', 2291.82],
    [100, '0.25', 1527.88],
    [800, '1', 3055.76],
  ])('SFM %d on Ø%s" → %d RPM', (sfm, dia, rpm) => {
    expect(solveCut(inputs({ customSpeed: String(sfm), toolDia: dia }), 'imperial', 'speeds_feeds', aluminum).rpm).toBeCloseTo(rpm, 1);
  });

  it('feed = RPM × flutes × IPT, MRR = WOC × DOC × feed, time from length', () => {
    const out = solveCut(inputs({}), 'imperial', 'speeds_feeds', aluminum);
    expect(out.ipmOrMmMin).toBeCloseTo(2291.82 * 4 * 0.002, 2);
    expect(out.mrr).toBeCloseTo(0.5 * 0.1 * out.ipmOrMmMin, 8);
    expect(out.cutMinutes).toBe(0);
    expect(out.cutSeconds).toBe(Math.round((10 / out.ipmOrMmMin) * 60));
  });

  it('chip thinning at 25% stepover multiplies the chip load by 2/√3', () => {
    const out = solveCut(inputs({ widthOfCut: '0.125' }), 'imperial', 'chip_thinning', aluminum);
    expect(out.isChipThinningActive).toBe(true);
    expect(out.chipThinningMultiplier).toBeCloseTo(2 / Math.sqrt(3), 6);
    expect(out.revisedCpt).toBeCloseTo(0.002 * 2 / Math.sqrt(3), 8);
  });

  it('no chip thinning at full slot', () => {
    const out = solveCut(inputs({}), 'imperial', 'chip_thinning', aluminum);
    expect(out.isChipThinningActive).toBe(false);
    expect(out.chipThinningMultiplier).toBe(1);
  });

  it('Ra = fz² / (32 R) in µin', () => {
    const out = solveCut(inputs({ customFeed: '0.004', cornerRad: '0.031' }), 'imperial', 'speeds_feeds', aluminum);
    expect(out.raMicroInches).toBeCloseTo((0.004 ** 2 / (32 * 0.031)) * 1e6, 6);
    expect(out.raMicrons).toBeCloseTo(out.raMicroInches * 0.0254, 8);
  });

  it('horsepower = MRR × unit power / 80 %', () => {
    const out = solveCut(inputs({}), 'imperial', 'speeds_feeds', aluminum);
    expect(out.horsepower).toBeCloseTo((out.mrr * 0.3) / 0.8, 8);
    expect(out.torqueInLb).toBeCloseTo((out.horsepower * 63025) / out.rpm, 8);
  });
});

describe('solveCut — metric', () => {
  it.each([
    // Vc m/min, dia mm, rpm
    [100, '10', 3183.10],
    [250, '12', 6631.46],
    [30, '6', 1591.55],
  ])('Vc %d on Ø%s mm → %d RPM', (vc, dia, rpm) => {
    const out = solveCut(inputs({ customSpeed: String(vc), toolDia: dia, customFeed: '0.05', widthOfCut: dia, depthOfCut: '1' }),
      'metric', 'speeds_feeds', aluminum);
    expect(out.rpm).toBeCloseTo(rpm, 1);
  });

  it('MRR in cm³/min = WOC·DOC·feed / 1000', () => {
    const out = solveCut(inputs({ customSpeed: '100', toolDia: '10', customFeed: '0.05', widthOfCut: '10', depthOfCut: '1' }),
      'metric', 'speeds_feeds', aluminum);
    expect(out.ipmOrMmMin).toBeCloseTo(3183.10 * 4 * 0.05, 1);
    expect(out.mrr).toBeCloseTo((10 * 1 * out.ipmOrMmMin) / 1000, 8);
  });
});
