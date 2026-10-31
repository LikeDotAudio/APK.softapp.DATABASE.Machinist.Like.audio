import { describe, expect, it } from 'vitest';
import { MM_PER_IN, convertField, fmtInOrMm, toIn, toMm } from './units';

describe('units', () => {
  it('1 in = 25.4 mm exactly', () => {
    expect(MM_PER_IN).toBe(25.4);
    expect(toMm(1)).toBe(25.4);
    expect(toIn(25.4)).toBe(1);
  });
  it('round trip', () => expect(toIn(toMm(0.375))).toBeCloseTo(0.375, 12));
  it('convertField prints the other unit, junk reads 0', () => {
    expect(convertField('0.5', true, 3)).toBe('12.700');
    expect(convertField('12.7', false, 4)).toBe('0.5000');
    expect(convertField('abc', true, 2)).toBe('0.00');
  });
  it('fmtInOrMm', () => {
    expect(fmtInOrMm(0.25, false, 3, 2)).toBe('0.250"');
    expect(fmtInOrMm(0.25, true, 3, 2, '"', ' mm')).toBe('6.35 mm');
  });
});
