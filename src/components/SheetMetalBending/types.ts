// SendCutSend Material Bending Specifications Database
export interface BendingSpec {
  material: string;
  thicknessInches: number;
  thicknessMm: number;
  kFactor: number;
  bendDeduction90Inches: number;
  effectiveRadius90Inches: number;
  dieWidthInches: number;
  minFlangeLength90Inches: number;
  minCornerReliefInches: number;
  bendReliefDepthInches: number;
}

export type SheetTab = 'calculator' | 'diagram' | 'specs_table' | 'simulator';

export type LengthUnit = 'in' | 'mm';

/** The thickness, radius and K-factor the flat-pattern solver runs on, always in inches. */
export interface ActiveParams {
  thickness_in: number;
  radius_in: number;
  kFactor: number;
  minFlange_in: number;
  dieWidth_in: number;
  specName: string;
}

/** Flat-pattern results, already scaled to the display unit. */
export interface BendResults {
  BA: number;
  OSSB: number;
  BD: number;
  flatLength: number;
  leftBendLine: number;
  rightBendLine: number;
  insideBase: number;
  insideLeft: number;
  insideRight: number;
  minFlangeRequired: number;
  dieWidth: number;
  numBends: number;
  isLeftFlangeTooShort: boolean;
  isRightFlangeTooShort: boolean;
}

/** The six raw simulator inputs as the sliders hold them. */
export interface SimInputs {
  simAngle: number;
  simRadius: string;
  simThickness: string;
  simKFactor: string;
  simFlange1: string;
  simFlange2: string;
}

export interface SimResults {
  angle: number;
  R: number;
  T: number;
  K: number;
  L1: number;
  L2: number;
  Y: number;
  r_neutral: number;
  BA: number;
  DL: number;
  OSSB: number;
  BD: number;
  FL: number;
}
