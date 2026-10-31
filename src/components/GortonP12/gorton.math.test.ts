// Gorton P1-2 manual (pages 20, 27, 29-30, 34-35): bar settings, rebalance, roll and roller sync, SFM→RPM.
import { describe, expect, it } from 'vitest';
import {
  BAR_CONSTANTS, parseRatio, parseSfm, pantographGeometry, rebalance, rollMasterLength, rpmFromSfm, solveBarSettings, syncRollerCutter,
} from './gorton.math';

describe('solveBarSettings', () => {
  it('2:1 standard is graduation "2" itself: both settings 0', () => {
    const s = solveBarSettings(2, 'standard');
    expect(s.lowerBarSettingInches).toBeCloseTo(0, 6);
    expect(s.upperBarSettingInches).toBeCloseTo(0, 3);
  });

  it.each([
    // ratio, lower = C − A/r, upper = D − B/(r+1)
    [4, 10.0195 - 20.039 / 4, 4.2483 - 12.745 / 5],
    [10, 10.0195 - 2.0039, 4.2483 - 12.745 / 11],
    [40, 10.0195 - 20.039 / 40, 4.2483 - 12.745 / 41],
  ])('%d:1 standard', (ratio, lower, upper) => {
    const s = solveBarSettings(ratio, 'standard');
    expect(s.lowerBarSettingInches).toBeCloseTo(lower, 6);
    expect(s.upperBarSettingInches).toBeCloseTo(upper, 6);
    expect(s.lowerBarSettingMm).toBeCloseTo(lower * 25.4, 6);
  });

  it('low ratio 1.5:1 uses the low-range constants', () => {
    const { A_low, B_low, C_low } = BAR_CONSTANTS;
    const s = solveBarSettings(1.5, 'low_ratio');
    expect(s.lowerBarSettingInches).toBeCloseTo(A_low - A_low / 1.5, 6);
    expect(s.upperBarSettingInches).toBeCloseTo(C_low - B_low / 2.5, 6);
    expect(s.lowerGraduationLabel).toContain('"1" and "2"');
  });
});

describe('rebalance — copy = work × ratio', () => {
  const cur = { ratioVal: '4', copyLength: '10', workLength: '2.5' };
  it('ratio edit recomputes work', () => expect(rebalance('ratio', '5', 'work', cur)).toEqual({ ratioVal: '5', workLength: '2.000' }));
  it('copy edit recomputes ratio', () => expect(rebalance('copy', '12', 'ratio', cur)).toEqual({ copyLength: '12', ratioVal: '4.80' }));
  it('work edit recomputes copy', () => expect(rebalance('work', '3', 'copy', cur)).toEqual({ workLength: '3', copyLength: '12.000' }));
});

describe('helpers', () => {
  it('parseRatio floors at 1.1 and defaults to 2', () => {
    expect(parseRatio('0.5')).toBe(1.1);
    expect(parseRatio('junk')).toBe(2);
  });
  it('roll master length = π·D·ratio', () => expect(rollMasterLength('2', 3)).toBeCloseTo(6 * Math.PI, 10));
  it('stylus roller = cutter × ratio, cutter = roller ÷ ratio', () =>
    expect(syncRollerCutter('0.125', '0.625', 5)).toEqual({ calculatedRoller: 0.625, calculatedCutter: 0.125 }));
  it.each([['220 - 230', 225], ['400 Up', 400], ['-', 0], ['', 0], ['150', 150]])('parseSfm(%j) = %d', (raw, n) =>
    expect(parseSfm(raw)).toBe(n));
  it('RPM = 12·SFM/(π·D), rounded', () => {
    expect(rpmFromSfm(100, '0.125')).toBe(3056);
    expect(rpmFromSfm(0, '0.125')).toBe(0);
  });
  it('the spindle sits at 1/ratio of the stylus throw', () => {
    const g = pantographGeometry(4);
    expect(g.spindleX - g.anchorX).toBeCloseTo((g.stylusX - g.anchorX) / 4, 10);
  });
});
