// Inch <-> millimetre numbers and the string rewrites the tools do when the global unit flips.
// Nothing else lives here.

export const MM_PER_IN = 25.4;

/** Inches to millimetres (`inches * 25.4`). */
export const toMm = (inches: number): number => inches * MM_PER_IN;

/** Millimetres to inches (`mm / 25.4`). */
export const toIn = (mm: number): number => mm / MM_PER_IN;

/**
 * Rewrite one numeric input string into the other unit: parse (blank or junk reads as 0),
 * convert, and print with `digits` decimals.
 */
export function convertField(value: string, toMetric: boolean, digits: number): string {
  const v = parseFloat(value) || 0;
  return (toMetric ? toMm(v) : toIn(v)).toFixed(digits);
}

/**
 * Print an inch quantity in the active unit. The caller passes the exact suffix it shows
 * (`"`, `mm`, ` mm`) so the rendered text does not change.
 */
export function fmtInOrMm(
  inches: number,
  isMetric: boolean,
  inDigits: number,
  mmDigits: number,
  inMark = '"',
  mmMark = 'mm',
): string {
  return isMetric ? `${toMm(inches).toFixed(mmDigits)}${mmMark}` : `${inches.toFixed(inDigits)}${inMark}`;
}
