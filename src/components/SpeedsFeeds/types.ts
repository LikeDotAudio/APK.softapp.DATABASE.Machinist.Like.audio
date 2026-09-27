// Named types for the speeds-and-feeds tool.

export interface MaterialPreset {
  name: string;
  sfm: number;      // Surface Feet per Minute (Carbide average)
  vc: number;       // Cutting speed m/min
  ipt: number;      // Inches per tooth / rev
  fz: number;       // mm per tooth / rev
  hardness: string;
  category: 'aluminum' | 'steel' | 'stainless' | 'exotic' | 'plastic';
  kFactor: number;  // Unit Power (HP/in³/min)
}

export type SpeedsTab = 'speeds_feeds' | 'chip_thinning' | 'formulas';

/** The nine raw input fields, as the inputs hold them (strings, except the flute count). */
export interface CutInputs {
  toolDia: string;
  flutes: number;
  customSpeed: string;   // SFM or m/min
  customFeed: string;    // IPT or fz
  widthOfCut: string;    // Radial Stepover (Ae)
  depthOfCut: string;    // Axial Depth (Ap)
  cutLength: string;     // Pass length for time estimate
  cornerRad: string;     // Tool Corner/Nose radius for Ra finish
  targetCpt: string;     // Chip thinning target chip load
}

/** Every number the page shows, in the active unit. */
export interface CutResults {
  dia: number;
  speedVal: number;
  feedVal: number;
  woc: number;
  doc: number;
  length: number;
  tCpt: number;
  rpm: number;
  ipmOrMmMin: number;
  mrr: number;
  cutMinutes: number;
  cutSeconds: number;
  radialStepoverPercent: number;
  isChipThinningActive: boolean;
  chipThinningMultiplier: number;
  revisedCpt: number;
  revisedFeedRate: number;
  horsepower: number;
  kilowatts: number;
  torqueInLb: number;
  torqueNm: number;
  raMicroInches: number;
  raMicrons: number;
  finishQuality: string;
}
