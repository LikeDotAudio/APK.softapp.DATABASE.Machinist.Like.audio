import type { MaterialPreset } from '../types';

export const MATERIALS: MaterialPreset[] = [
  { name: 'Aluminum 6061 / 7075', sfm: 1000, vc: 300, ipt: 0.005, fz: 0.12, hardness: '95 HB', category: 'aluminum', kFactor: 0.25 },
  { name: 'Mild Steel (1018 / A36 / 1045)', sfm: 350, vc: 105, ipt: 0.003, fz: 0.08, hardness: '130 HB', category: 'steel', kFactor: 0.70 },
  { name: 'Alloy Steel (4140 / 4340 PH)', sfm: 250, vc: 75, ipt: 0.0025, fz: 0.06, hardness: '28-32 HRC', category: 'steel', kFactor: 0.90 },
  { name: 'Tool Steel (D2 / H13 / A2)', sfm: 150, vc: 45, ipt: 0.0018, fz: 0.045, hardness: '20-25 HRC', category: 'steel', kFactor: 1.20 },
  { name: 'Stainless Steel (304 / 316L)', sfm: 220, vc: 65, ipt: 0.002, fz: 0.05, hardness: '180 HB', category: 'stainless', kFactor: 0.85 },
  { name: '17-4 PH Stainless', sfm: 180, vc: 55, ipt: 0.0018, fz: 0.045, hardness: '33 HRC', category: 'stainless', kFactor: 0.95 },
  { name: 'Brass / Bronze (Free Cutting)', sfm: 500, vc: 150, ipt: 0.004, fz: 0.10, hardness: '110 HB', category: 'aluminum', kFactor: 0.30 },
  { name: 'Cast Iron (Grey G2500 / G3000)', sfm: 300, vc: 90, ipt: 0.003, fz: 0.08, hardness: '200 HB', category: 'steel', kFactor: 0.60 },
  { name: 'Titanium (Ti-6Al-4V Grade 5)', sfm: 140, vc: 42, ipt: 0.0015, fz: 0.035, hardness: '36 HRC', category: 'exotic', kFactor: 1.10 },
  { name: 'Inconel 718 / Superalloys', sfm: 80, vc: 24, ipt: 0.001, fz: 0.025, hardness: '38-42 HRC', category: 'exotic', kFactor: 1.40 },
  { name: 'Engineering Plastics (Delrin / Nylon / PEEK)', sfm: 800, vc: 240, ipt: 0.008, fz: 0.20, hardness: '80 Shore D', category: 'plastic', kFactor: 0.15 },
];
