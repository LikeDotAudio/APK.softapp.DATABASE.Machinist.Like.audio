// The Gorton P1-2 tool's math, pure, no React. Bodies are the ones the component ran in its
// render function; mm values go through src/lib/units (the same `* 25.4`).
import { toMm } from '../../lib/units';
import type { BarSettings, CalcTarget, CutMode, GortonMaterial, RangeMode, ToolMat } from './types';

/** Parse the ratio input: at least 1.1, blank or junk reads as 2.0. */
export const parseRatio = (ratioVal: string): number => Math.max(1.1, parseFloat(ratioVal) || 2.0);

// Gorton Factory Constants (Page 29 & 30)
export const BAR_CONSTANTS = {
  // Standard Range (2:1 to 40:1)
  A_std: 20.0390,
  B_std: 12.7450,
  C_std: 10.0195,
  D_std: 4.2483,
  // Low Ratio Range (1:1 to 2:1)
  A_low: 10.0195,
  B_low: 12.7450,
  C_low: 6.3725,
} as const;

/** The lower/upper slider-bar setting distances for a reduction ratio. */
export function solveBarSettings(ratio: number, rangeMode: RangeMode): BarSettings {
  const { A_std, B_std, C_std, D_std, A_low, B_low, C_low } = BAR_CONSTANTS;

  let lowerBarSettingInches = 0;
  let upperBarSettingInches = 0;
  let lowerBarSettingMm = 0;
  let upperBarSettingMm = 0;
  let lowerGraduationLabel = 'Graduation "2" on Lower Slider Bar';
  let upperGraduationLabel = 'Graduation "2" on Upper Slider Bar';

  if (rangeMode === 'standard') {
    // Step 1: A ÷ Required Reduction = E
    const E = A_std / ratio;
    // Step 2: C - E = Setting Distance from Graduation "2" on Lower Bar
    lowerBarSettingInches = Math.max(0, C_std - E);
    lowerBarSettingMm = toMm(lowerBarSettingInches);

    // Step 3: B ÷ (Required Reduction + 1) = F
    const F = B_std / (ratio + 1);
    // Step 4: D - F = Setting Distance from Graduation "2" on Upper Bar
    upperBarSettingInches = Math.max(0, D_std - F);
    upperBarSettingMm = toMm(upperBarSettingInches);

    lowerGraduationLabel = 'Graduation "2" on Lower Slider Bar';
    upperGraduationLabel = 'Graduation "2" on Upper Slider Bar';
  } else {
    // Low Ratio Mode (1:1 to 2:1)
    // Step 1: A ÷ Required Reduction = D
    const D = A_low / ratio;
    // Step 2: A - D = Setting Distance from Graduation "1" and "2" on Lower Block
    lowerBarSettingInches = Math.max(0, A_low - D);
    lowerBarSettingMm = toMm(lowerBarSettingInches);

    // Step 3: B ÷ (Required Reduction + 1) = E
    const E = B_low / (ratio + 1);
    // Step 4: C - E = Setting Distance from Graduation "1" on Upper Bar
    upperBarSettingInches = Math.max(0, C_low - E);
    upperBarSettingMm = toMm(upperBarSettingInches);

    lowerGraduationLabel = 'Graduation "1" and "2" on Lower Slider Block';
    upperGraduationLabel = 'Graduation "1" on Upper Slider Bar';
  }

  return { lowerBarSettingInches, upperBarSettingInches, lowerBarSettingMm, upperBarSettingMm, lowerGraduationLabel, upperGraduationLabel };
}

export interface DimensionStrings {
  ratioVal: string;
  copyLength: string;
  workLength: string;
}

/**
 * Handle dimension recalculations: the edited field takes `value`, and the field being
 * calculated is re-derived from the other two. Returns only the fields that change.
 */
export function rebalance(field: CalcTarget, value: string, calcTarget: CalcTarget, current: DimensionStrings): Partial<DimensionStrings> {
  const { ratioVal, copyLength, workLength } = current;
  const next: Partial<DimensionStrings> = {};
  if (field === 'ratio') {
    next.ratioVal = value;
    const r = parseFloat(value) || 2.0;
    if (calcTarget === 'work') {
      const c = parseFloat(copyLength) || 10.0;
      next.workLength = (c / r).toFixed(3);
    } else if (calcTarget === 'copy') {
      const w = parseFloat(workLength) || 2.0;
      next.copyLength = (w * r).toFixed(3);
    }
  } else if (field === 'copy') {
    next.copyLength = value;
    const c = parseFloat(value) || 10.0;
    if (calcTarget === 'ratio') {
      const w = parseFloat(workLength) || 2.0;
      const newR = w > 0 ? c / w : 2.0;
      next.ratioVal = newR.toFixed(2);
    } else if (calcTarget === 'work') {
      const r = parseFloat(ratioVal) || 2.0;
      next.workLength = (c / r).toFixed(3);
    }
  } else if (field === 'work') {
    next.workLength = value;
    const w = parseFloat(value) || 2.0;
    if (calcTarget === 'ratio') {
      const c = parseFloat(copyLength) || 10.0;
      const newR = w > 0 ? c / w : 2.0;
      next.ratioVal = newR.toFixed(2);
    } else if (calcTarget === 'copy') {
      const r = parseFloat(ratioVal) || 2.0;
      next.copyLength = (w * r).toFixed(3);
    }
  }
  return next;
}

/** Roll Attachment Circumference calculation (Page 27): flat master length for a cylinder. */
export function rollMasterLength(rollDia: string, ratio: number): number {
  const rollDiameter = parseFloat(rollDia) || 2.0;
  const rollCircumference = rollDiameter * Math.PI;
  return rollCircumference * ratio;
}

/** Stylus/Cutter Roller Synchronizer calculation (Page 20). */
export function syncRollerCutter(cutterDia: string, rollerDia: string, ratio: number): { calculatedRoller: number; calculatedCutter: number } {
  const cDia = parseFloat(cutterDia) || 0.125;
  const rDia = parseFloat(rollerDia) || 0.625;
  const calculatedRoller = cDia * ratio;
  const calculatedCutter = rDia / ratio;
  return { calculatedRoller, calculatedCutter };
}

/** Speeds & Materials (Page 34 & 35): the chart's SFM text and coolant for a tool and mode. */
export function pickCuttingData(currentMat: GortonMaterial, toolMat: ToolMat, cutMode: CutMode): { sfmRaw: string; coolantRec: string } {
  const sfmRaw = toolMat === 'carbide'
    ? (cutMode === 'wet' ? currentMat.carbideWet : currentMat.carbideDry)
    : (cutMode === 'wet' ? currentMat.hssWet : currentMat.hssDry);
  const coolantRec = toolMat === 'carbide' ? currentMat.carbideCoolant : currentMat.hssCoolant;
  return { sfmRaw, coolantRec };
}

/** Parse numeric SFM for RPM math (taking average if range e.g. "220 - 230" -> 225, or "400 Up" -> 400). */
export function parseSfm(sfmRaw: string): number {
  let sfmNum = 0;
  if (sfmRaw && sfmRaw !== '-') {
    const cleanStr = sfmRaw.replace(/Up/i, '').trim();
    const parts = cleanStr.split('-').map(p => parseFloat(p.trim())).filter(n => !isNaN(n));
    if (parts.length === 2) sfmNum = (parts[0] + parts[1]) / 2;
    else if (parts.length === 1) sfmNum = parts[0];
  }
  return sfmNum;
}

/** RPM = (SFM × 12) ÷ (π × Dia), rounded; 0 when either input is missing. */
export function rpmFromSfm(sfmNum: number, speedCutterDia: string): number {
  const spdDiaNum = parseFloat(speedCutterDia) || 0.125;
  return (sfmNum > 0 && spdDiaNum > 0) ? Math.round((sfmNum * 12) / (Math.PI * spdDiaNum)) : 0;
}

/** SVG Visualizer Geometry (Kinematic Pantograph Linkage). */
export function pantographGeometry(ratio: number) {
  const svgW = 480;
  const svgH = 340;
  const anchorX = 120; // Pivot on column base
  const anchorY = 70;

  const visualScale = Math.min(1.0, Math.max(0.15, 2.0 / ratio));
  const armLen = 260;
  const lowerBlockX = anchorX + (armLen * visualScale);
  const lowerBlockY = anchorY + 120;
  const upperBlockX = anchorX + (armLen * visualScale * 0.7);
  const upperBlockY = anchorY + 60;

  const stylusX = anchorX + armLen + 20;
  const stylusY = anchorY + 220;
  const spindleX = anchorX + (stylusX - anchorX) * (1 / ratio);
  const spindleY = anchorY + (stylusY - anchorY) * (1 / ratio);

  return { svgW, svgH, anchorX, anchorY, lowerBlockX, lowerBlockY, upperBlockX, upperBlockY, stylusX, stylusY, spindleX, spindleY };
}

export type PantographGeometry = ReturnType<typeof pantographGeometry>;
