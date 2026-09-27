// Named types for the Gorton P1-2 pantograph tool.

export type GortonTab = 'calculator' | 'roll_sync' | 'speeds_materials' | 'table' | 'guide';
export type RangeMode = 'standard' | 'low_ratio';
export type CalcTarget = 'ratio' | 'work' | 'copy';
export type SyncTarget = 'roller' | 'cutter';
export type ToolMat = 'carbide' | 'hss';
export type CutMode = 'wet' | 'dry';

// Standard Factory Reduction Table data from Gorton P1-2 Manual (Pages 31-33)
export interface TableRow {
  ratio: string;
  lowerInches: number;
  upperInches: number;
  lowerMm: number;
  upperMm: number;
}

// Gorton P1-2 Cutting Chart Data (Page 35)
export interface GortonMaterial {
  category: 'Cast Iron' | 'Steels' | 'Aluminum' | 'Copper & Brass & Bronze';
  name: string;
  tensile: string;
  carbideDry: string;
  carbideWet: string;
  carbideCoolant: string;
  hssDry: string;
  hssWet: string;
  hssCoolant: string;
}

// One row of the page-34 speed chart: RPM per cutter diameter at a surface speed.
export interface SpeedRow {
  sfm: number;
  d16: number;
  d8: number;
  d316: number;
  d4: number;
  d516: number;
  d38: number;
}

/** The two bar settings the calculator shows, in inches and mm, with their graduation labels. */
export interface BarSettings {
  lowerBarSettingInches: number;
  upperBarSettingInches: number;
  lowerBarSettingMm: number;
  upperBarSettingMm: number;
  lowerGraduationLabel: string;
  upperGraduationLabel: string;
}
