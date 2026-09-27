// The sheet-metal bend math as pure functions, no React. Each body is the one the component
// ran inside its useMemo; the two solvers deliberately do not share a bend-allowance helper
// because their floating-point operation order differs ((π/180)·r·A vs π·r·A/180).
import { MM_PER_IN, toIn } from '../../lib/units';
import { SENDCUTSEND_BENDING_SPECS } from './data/bendingSpecs';
import type { ActiveParams, BendResults, BendingSpec, LengthUnit, SimInputs, SimResults } from './types';

/** Simulator Math Engine (60 FPS Reactive Solvers). */
export function solveSimulator({ simAngle, simRadius, simThickness, simKFactor, simFlange1, simFlange2 }: SimInputs): SimResults {
  const angle = Math.min(179, Math.max(1, simAngle)); // degrees
  const R = parseFloat(simRadius) || 0.125;
  const T = parseFloat(simThickness) || 0.100;
  const K = parseFloat(simKFactor) || 0.42;
  const L1 = parseFloat(simFlange1) || 4.0;
  const L2 = parseFloat(simFlange2) || 4.0;

  // Y-Factor = K * (pi / 2)
  const Y = K * (Math.PI / 2);
  // Neutral Axis Radius = R + K * T
  const r_neutral = R + K * T;

  // Bend Allowance BA = DL = (pi / 180) * (R + K * T) * angle
  const BA = (Math.PI / 180) * r_neutral * angle;
  const DL = BA;

  // Outside Setback OSSB = (R + T) * tan(angle / 2 in rad)
  const halfRad = ((angle / 2) * Math.PI) / 180;
  const OSSB = (R + T) * Math.tan(halfRad);

  // Bend Deduction BD = 2 * OSSB - BA
  const BD = (2 * OSSB) - BA;

  // Flat Pattern Length FL = L1 + L2 - BD
  const FL = L1 + L2 - BD;

  return { angle, R, T, K, L1, L2, Y, r_neutral, BA, DL, OSSB, BD, FL };
}

export interface ActiveParamsInput {
  isCustomSpec: boolean;
  availableSpecs: BendingSpec[];
  selectedSpecIdx: number;
  unit: LengthUnit;
  customThickness: string;
  customRadius: string;
  customKFactor: string;
}

/** Active Bending Parameters: the picked spec row, or the custom override converted to inches. */
export function resolveActiveParams({
  isCustomSpec, availableSpecs, selectedSpecIdx, unit, customThickness, customRadius, customKFactor,
}: ActiveParamsInput): ActiveParams {
  if (isCustomSpec) {
    const T_in = unit === 'in' ? (parseFloat(customThickness) || 0.1) : toIn(parseFloat(customThickness) || 2.54);
    const R_in = unit === 'in' ? (parseFloat(customRadius) || 0.063) : toIn(parseFloat(customRadius) || 1.6);
    const K = parseFloat(customKFactor) || 0.38;
    return {
      thickness_in: T_in,
      radius_in: R_in,
      kFactor: K,
      minFlange_in: R_in * 3 + T_in * 2, // approximation for custom
      dieWidth_in: T_in * 8,
      specName: 'Custom Specification',
    };
  } else {
    const spec = availableSpecs[selectedSpecIdx] || availableSpecs[0] || SENDCUTSEND_BENDING_SPECS[0];
    return {
      thickness_in: spec.thicknessInches,
      radius_in: spec.effectiveRadius90Inches,
      kFactor: spec.kFactor,
      minFlange_in: spec.minFlangeLength90Inches,
      dieWidth_in: spec.dieWidthInches,
      specName: `${spec.thicknessInches}" (${spec.thicknessMm}mm) ${spec.material}`,
    };
  }
}

export interface FlatPatternInput {
  activeParams: ActiveParams;
  bendAngle: number;
  baseLength: string;
  leftFlange: string;
  rightFlange: string;
  unit: LengthUnit;
}

/** Mathematical Bending Solver: flat length, bend lines and inside dimensions in display units. */
export function solveFlatPattern({ activeParams, bendAngle, baseLength, leftFlange, rightFlange, unit }: FlatPatternInput): BendResults {
  const T = activeParams.thickness_in;
  const R = activeParams.radius_in;
  const K = activeParams.kFactor;
  const A = bendAngle; // degrees
  const A_rad = (A * Math.PI) / 180;

  // Bend Allowance Formula: BA = Pi * (R + K * T) * A / 180
  const BA = (Math.PI * (R + K * T) * A) / 180;

  // Outside Setback Formula: OSSB = tan(A / 2) * (R + T)
  const OSSB = Math.tan(A_rad / 2) * (R + T);

  // Bend Deduction Formula: BD = 2 * OSSB - BA
  const BD = 2 * OSSB - BA;

  // Convert lengths from UI units to inches for uniform math
  const L_base = unit === 'in' ? (parseFloat(baseLength) || 0) : toIn(parseFloat(baseLength) || 0);
  const L_left = unit === 'in' ? (parseFloat(leftFlange) || 0) : toIn(parseFloat(leftFlange) || 0);
  const L_right = unit === 'in' ? (parseFloat(rightFlange) || 0) : toIn(parseFloat(rightFlange) || 0);

  const numBends = (L_left > 0 ? 1 : 0) + (L_right > 0 ? 1 : 0);

  // Total Flat Pattern Length = Sum of outside dimensions - (numBends * BD)
  const totalOutside = L_base + L_left + L_right;
  const flatLength = totalOutside - numBends * BD;

  // Bend line positions from outer edges of flat pattern
  // From Left Edge to Bend Line 1:
  const leftBendLine = L_left > 0 ? L_left - BD / 2 : 0;
  // From Right Edge to Bend Line 2:
  const rightBendLine = L_right > 0 ? L_right - BD / 2 : 0;

  // Inside dimensions after bending
  const insideBase = L_base - (numBends * T);
  const insideLeft = L_left > 0 ? L_left - T : 0;
  const insideRight = L_right > 0 ? L_right - T : 0;

  // Scale results back to display units
  const scale = unit === 'in' ? 1 : MM_PER_IN;

  return {
    BA: BA * scale,
    OSSB: OSSB * scale,
    BD: BD * scale,
    flatLength: flatLength * scale,
    leftBendLine: leftBendLine * scale,
    rightBendLine: rightBendLine * scale,
    insideBase: insideBase * scale,
    insideLeft: insideLeft * scale,
    insideRight: insideRight * scale,
    minFlangeRequired: activeParams.minFlange_in * scale,
    dieWidth: activeParams.dieWidth_in * scale,
    numBends,
    isLeftFlangeTooShort: L_left > 0 && L_left < activeParams.minFlange_in,
    isRightFlangeTooShort: L_right > 0 && L_right < activeParams.minFlange_in,
  };
}
