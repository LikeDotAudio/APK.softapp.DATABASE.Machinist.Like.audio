import type { BendingSpec } from '../types';

export const SENDCUTSEND_BENDING_SPECS: BendingSpec[] = [
  // 4130 Chromoly
  { material: '4130 Chromoly', thicknessInches: 0.050, thicknessMm: 1.27, kFactor: 0.38, bendDeduction90Inches: 0.0945, effectiveRadius90Inches: 0.050, dieWidthInches: 0.472, minFlangeLength90Inches: 0.302, minCornerReliefInches: 0.018, bendReliefDepthInches: 0.120 },
  { material: '4130 Chromoly', thicknessInches: 0.063, thicknessMm: 1.60, kFactor: 0.41, bendDeduction90Inches: 0.1065, effectiveRadius90Inches: 0.050, dieWidthInches: 0.472, minFlangeLength90Inches: 0.308, minCornerReliefInches: 0.025, bendReliefDepthInches: 0.133 },
  { material: '4130 Chromoly', thicknessInches: 0.125, thicknessMm: 3.18, kFactor: 0.43, bendDeduction90Inches: 0.2050, effectiveRadius90Inches: 0.090, dieWidthInches: 0.984, minFlangeLength90Inches: 0.723, minCornerReliefInches: 0.038, bendReliefDepthInches: 0.235 },
  { material: '4130 Chromoly', thicknessInches: 0.190, thicknessMm: 4.83, kFactor: 0.37, bendDeduction90Inches: 0.3240, effectiveRadius90Inches: 0.125, dieWidthInches: 0.984, minFlangeLength90Inches: 0.782, minCornerReliefInches: 0.043, bendReliefDepthInches: 0.335 },
  { material: '4130 Chromoly', thicknessInches: 0.250, thicknessMm: 6.35, kFactor: 0.36, bendDeduction90Inches: 0.4335, effectiveRadius90Inches: 0.170, dieWidthInches: 1.575, minFlangeLength90Inches: 1.367, minCornerReliefInches: 0.048, bendReliefDepthInches: 0.440 },

  // 5052 Aluminum
  { material: '5052 Aluminum', thicknessInches: 0.040, thicknessMm: 1.02, kFactor: 0.45, bendDeduction90Inches: 0.0620, effectiveRadius90Inches: 0.024, dieWidthInches: 0.472, minFlangeLength90Inches: 0.286, minCornerReliefInches: 0.024, bendReliefDepthInches: 0.084 },
  { material: '5052 Aluminum', thicknessInches: 0.063, thicknessMm: 1.60, kFactor: 0.42, bendDeduction90Inches: 0.0960, effectiveRadius90Inches: 0.035, dieWidthInches: 0.472, minFlangeLength90Inches: 0.303, minCornerReliefInches: 0.030, bendReliefDepthInches: 0.118 },
  { material: '5052 Aluminum', thicknessInches: 0.080, thicknessMm: 2.03, kFactor: 0.48, bendDeduction90Inches: 0.1160, effectiveRadius90Inches: 0.038, dieWidthInches: 0.472, minFlangeLength90Inches: 0.313, minCornerReliefInches: 0.037, bendReliefDepthInches: 0.138 },
  { material: '5052 Aluminum', thicknessInches: 0.090, thicknessMm: 2.29, kFactor: 0.37, bendDeduction90Inches: 0.1420, effectiveRadius90Inches: 0.032, dieWidthInches: 0.472, minFlangeLength90Inches: 0.326, minCornerReliefInches: 0.034, bendReliefDepthInches: 0.142 },
  { material: '5052 Aluminum', thicknessInches: 0.100, thicknessMm: 2.54, kFactor: 0.40, bendDeduction90Inches: 0.1910, effectiveRadius90Inches: 0.125, dieWidthInches: 0.630, minFlangeLength90Inches: 0.463, minCornerReliefInches: 0.020, bendReliefDepthInches: 0.245 },
  { material: '5052 Aluminum', thicknessInches: 0.125, thicknessMm: 3.18, kFactor: 0.44, bendDeduction90Inches: 0.2160, effectiveRadius90Inches: 0.125, dieWidthInches: 0.630, minFlangeLength90Inches: 0.476, minCornerReliefInches: 0.032, bendReliefDepthInches: 0.270 },
  { material: '5052 Aluminum', thicknessInches: 0.187, thicknessMm: 4.75, kFactor: 0.43, bendDeduction90Inches: 0.3560, effectiveRadius90Inches: 0.250, dieWidthInches: 0.984, minFlangeLength90Inches: 0.798, minCornerReliefInches: 0.024, bendReliefDepthInches: 0.457 },
  { material: '5052 Aluminum', thicknessInches: 0.250, thicknessMm: 6.35, kFactor: 0.42, bendDeduction90Inches: 0.4420, effectiveRadius90Inches: 0.250, dieWidthInches: 1.575, minFlangeLength90Inches: 1.371, minCornerReliefInches: 0.044, bendReliefDepthInches: 0.520 },

  // Brass
  { material: 'Brass', thicknessInches: 0.040, thicknessMm: 1.02, kFactor: 0.38, bendDeduction90Inches: 0.0740, effectiveRadius90Inches: 0.040, dieWidthInches: 0.472, minFlangeLength90Inches: 0.292, minCornerReliefInches: 0.018, bendReliefDepthInches: 0.100 },
  { material: 'Brass', thicknessInches: 0.063, thicknessMm: 1.60, kFactor: 0.38, bendDeduction90Inches: 0.1050, effectiveRadius90Inches: 0.040, dieWidthInches: 0.472, minFlangeLength90Inches: 0.308, minCornerReliefInches: 0.026, bendReliefDepthInches: 0.123 },
  { material: 'Brass', thicknessInches: 0.125, thicknessMm: 3.18, kFactor: 0.36, bendDeduction90Inches: 0.2050, effectiveRadius90Inches: 0.060, dieWidthInches: 0.630, minFlangeLength90Inches: 0.471, minCornerReliefInches: 0.038, bendReliefDepthInches: 0.205 },
  { material: 'Brass', thicknessInches: 0.187, thicknessMm: 4.75, kFactor: 0.38, bendDeduction90Inches: 0.3240, effectiveRadius90Inches: 0.095, dieWidthInches: 0.984, minFlangeLength90Inches: 0.782, minCornerReliefInches: 0.040, bendReliefDepthInches: 0.302 },
  { material: 'Brass', thicknessInches: 0.250, thicknessMm: 6.35, kFactor: 0.38, bendDeduction90Inches: 0.4240, effectiveRadius90Inches: 0.130, dieWidthInches: 1.575, minFlangeLength90Inches: 1.362, minCornerReliefInches: 0.053, bendReliefDepthInches: 0.400 },

  // Copper
  { material: 'Copper', thicknessInches: 0.040, thicknessMm: 1.02, kFactor: 0.34, bendDeduction90Inches: 0.0810, effectiveRadius90Inches: 0.052, dieWidthInches: 0.472, minFlangeLength90Inches: 0.296, minCornerReliefInches: 0.015, bendReliefDepthInches: 0.112 },
  { material: 'Copper', thicknessInches: 0.063, thicknessMm: 1.60, kFactor: 0.36, bendDeduction90Inches: 0.0990, effectiveRadius90Inches: 0.024, dieWidthInches: 0.472, minFlangeLength90Inches: 0.305, minCornerReliefInches: 0.029, bendReliefDepthInches: 0.107 },
  { material: 'Copper', thicknessInches: 0.125, thicknessMm: 3.18, kFactor: 0.34, bendDeduction90Inches: 0.2050, effectiveRadius90Inches: 0.050, dieWidthInches: 0.630, minFlangeLength90Inches: 0.471, minCornerReliefInches: 0.038, bendReliefDepthInches: 0.195 },
  { material: 'Copper', thicknessInches: 0.187, thicknessMm: 4.75, kFactor: 0.36, bendDeduction90Inches: 0.3200, effectiveRadius90Inches: 0.118, dieWidthInches: 0.984, minFlangeLength90Inches: 0.780, minCornerReliefInches: 0.042, bendReliefDepthInches: 0.325 },
  { material: 'Copper', thicknessInches: 0.250, thicknessMm: 6.35, kFactor: 0.33, bendDeduction90Inches: 0.4300, effectiveRadius90Inches: 0.140, dieWidthInches: 1.575, minFlangeLength90Inches: 1.365, minCornerReliefInches: 0.050, bendReliefDepthInches: 0.410 },

  // G90 Steel
  { material: 'G90 Steel', thicknessInches: 0.030, thicknessMm: 0.76, kFactor: 0.38, bendDeduction90Inches: 0.0610, effectiveRadius90Inches: 0.045, dieWidthInches: 0.472, minFlangeLength90Inches: 0.286, minCornerReliefInches: 0.015, bendReliefDepthInches: 0.095 },
  { material: 'G90 Steel', thicknessInches: 0.048, thicknessMm: 1.22, kFactor: 0.38, bendDeduction90Inches: 0.0860, effectiveRadius90Inches: 0.045, dieWidthInches: 0.472, minFlangeLength90Inches: 0.298, minCornerReliefInches: 0.020, bendReliefDepthInches: 0.113 },
  { material: 'G90 Steel', thicknessInches: 0.059, thicknessMm: 1.50, kFactor: 0.36, bendDeduction90Inches: 0.1120, effectiveRadius90Inches: 0.063, dieWidthInches: 0.472, minFlangeLength90Inches: 0.311, minCornerReliefInches: 0.018, bendReliefDepthInches: 0.142 },
  { material: 'G90 Steel', thicknessInches: 0.074, thicknessMm: 1.88, kFactor: 0.40, bendDeduction90Inches: 0.1290, effectiveRadius90Inches: 0.063, dieWidthInches: 0.472, minFlangeLength90Inches: 0.320, minCornerReliefInches: 0.025, bendReliefDepthInches: 0.157 },

  // Mild Steel
  { material: 'Mild Steel', thicknessInches: 0.030, thicknessMm: 0.76, kFactor: 0.38, bendDeduction90Inches: 0.0610, effectiveRadius90Inches: 0.045, dieWidthInches: 0.472, minFlangeLength90Inches: 0.286, minCornerReliefInches: 0.015, bendReliefDepthInches: 0.095 },
  { material: 'Mild Steel', thicknessInches: 0.048, thicknessMm: 1.22, kFactor: 0.38, bendDeduction90Inches: 0.0860, effectiveRadius90Inches: 0.045, dieWidthInches: 0.472, minFlangeLength90Inches: 0.298, minCornerReliefInches: 0.020, bendReliefDepthInches: 0.113 },
  { material: 'Mild Steel', thicknessInches: 0.059, thicknessMm: 1.50, kFactor: 0.40, bendDeduction90Inches: 0.1080, effectiveRadius90Inches: 0.063, dieWidthInches: 0.472, minFlangeLength90Inches: 0.309, minCornerReliefInches: 0.020, bendReliefDepthInches: 0.142 },
  { material: 'Mild Steel', thicknessInches: 0.074, thicknessMm: 1.88, kFactor: 0.40, bendDeduction90Inches: 0.1290, effectiveRadius90Inches: 0.063, dieWidthInches: 0.472, minFlangeLength90Inches: 0.320, minCornerReliefInches: 0.025, bendReliefDepthInches: 0.157 },
  { material: 'Mild Steel', thicknessInches: 0.104, thicknessMm: 2.64, kFactor: 0.34, bendDeduction90Inches: 0.1815, effectiveRadius90Inches: 0.063, dieWidthInches: 0.630, minFlangeLength90Inches: 0.459, minCornerReliefInches: 0.028, bendReliefDepthInches: 0.187 },
  { material: 'Mild Steel', thicknessInches: 0.119, thicknessMm: 3.02, kFactor: 0.38, bendDeduction90Inches: 0.1955, effectiveRadius90Inches: 0.063, dieWidthInches: 0.630, minFlangeLength90Inches: 0.466, minCornerReliefInches: 0.036, bendReliefDepthInches: 0.202 },
  { material: 'Mild Steel', thicknessInches: 0.135, thicknessMm: 3.43, kFactor: 0.32, bendDeduction90Inches: 0.2440, effectiveRadius90Inches: 0.100, dieWidthInches: 0.984, minFlangeLength90Inches: 0.742, minCornerReliefInches: 0.028, bendReliefDepthInches: 0.255 },
  { material: 'Mild Steel', thicknessInches: 0.187, thicknessMm: 4.75, kFactor: 0.36, bendDeduction90Inches: 0.3225, effectiveRadius90Inches: 0.125, dieWidthInches: 0.984, minFlangeLength90Inches: 0.781, minCornerReliefInches: 0.041, bendReliefDepthInches: 0.332 },
  { material: 'Mild Steel', thicknessInches: 0.250, thicknessMm: 6.35, kFactor: 0.36, bendDeduction90Inches: 0.4215, effectiveRadius90Inches: 0.150, dieWidthInches: 1.575, minFlangeLength90Inches: 1.361, minCornerReliefInches: 0.054, bendReliefDepthInches: 0.420 },

  // Polycarbonate
  { material: 'Polycarbonate', thicknessInches: 0.118, thicknessMm: 3.00, kFactor: 0.33, bendDeduction90Inches: 0.1950, effectiveRadius90Inches: 0.040, dieWidthInches: 0.472, minFlangeLength90Inches: 0.386, minCornerReliefInches: 0.083, bendReliefDepthInches: 0.178 },
  { material: 'Polycarbonate', thicknessInches: 0.177, thicknessMm: 4.50, kFactor: 0.33, bendDeduction90Inches: 0.2960, effectiveRadius90Inches: 0.085, dieWidthInches: 0.984, minFlangeLength90Inches: 0.848, minCornerReliefInches: 0.214, bendReliefDepthInches: 0.282 },
  { material: 'Polycarbonate', thicknessInches: 0.220, thicknessMm: 5.59, kFactor: 0.33, bendDeduction90Inches: 0.3670, effectiveRadius90Inches: 0.100, dieWidthInches: 0.984, minFlangeLength90Inches: 0.884, minCornerReliefInches: 0.235, bendReliefDepthInches: 0.340 },

  // 304 Stainless Steel
  { material: '304 Stainless Steel', thicknessInches: 0.030, thicknessMm: 0.76, kFactor: 0.36, bendDeduction90Inches: 0.0785, effectiveRadius90Inches: 0.080, dieWidthInches: 0.472, minFlangeLength90Inches: 0.294, minCornerReliefInches: 0.006, bendReliefDepthInches: 0.130 },
  { material: '304 Stainless Steel', thicknessInches: 0.048, thicknessMm: 1.22, kFactor: 0.36, bendDeduction90Inches: 0.1045, effectiveRadius90Inches: 0.080, dieWidthInches: 0.472, minFlangeLength90Inches: 0.307, minCornerReliefInches: 0.011, bendReliefDepthInches: 0.148 },
  { material: '304 Stainless Steel', thicknessInches: 0.060, thicknessMm: 1.52, kFactor: 0.34, bendDeduction90Inches: 0.1185, effectiveRadius90Inches: 0.070, dieWidthInches: 0.472, minFlangeLength90Inches: 0.314, minCornerReliefInches: 0.016, bendReliefDepthInches: 0.150 },
  { material: '304 Stainless Steel', thicknessInches: 0.074, thicknessMm: 1.88, kFactor: 0.36, bendDeduction90Inches: 0.1370, effectiveRadius90Inches: 0.075, dieWidthInches: 0.472, minFlangeLength90Inches: 0.324, minCornerReliefInches: 0.021, bendReliefDepthInches: 0.169 },
  { material: '304 Stainless Steel', thicknessInches: 0.100, thicknessMm: 2.54, kFactor: 0.36, bendDeduction90Inches: 0.2230, effectiveRadius90Inches: 0.187, dieWidthInches: 0.984, minFlangeLength90Inches: 0.732, minCornerReliefInches: 0.004, bendReliefDepthInches: 0.307 },
  { material: '304 Stainless Steel', thicknessInches: 0.125, thicknessMm: 3.18, kFactor: 0.38, bendDeduction90Inches: 0.2400, effectiveRadius90Inches: 0.150, dieWidthInches: 0.984, minFlangeLength90Inches: 0.740, minCornerReliefInches: 0.020, bendReliefDepthInches: 0.295 },
  { material: '304 Stainless Steel', thicknessInches: 0.187, thicknessMm: 4.75, kFactor: 0.35, bendDeduction90Inches: 0.3285, effectiveRadius90Inches: 0.130, dieWidthInches: 0.984, minFlangeLength90Inches: 0.784, minCornerReliefInches: 0.038, bendReliefDepthInches: 0.337 },
  { material: '304 Stainless Steel', thicknessInches: 0.250, thicknessMm: 6.35, kFactor: 0.34, bendDeduction90Inches: 0.4620, effectiveRadius90Inches: 0.225, dieWidthInches: 1.575, minFlangeLength90Inches: 1.381, minCornerReliefInches: 0.034, bendReliefDepthInches: 0.495 },

  // 316 Stainless Steel
  { material: '316 Stainless Steel', thicknessInches: 0.060, thicknessMm: 1.52, kFactor: 0.34, bendDeduction90Inches: 0.1185, effectiveRadius90Inches: 0.070, dieWidthInches: 0.472, minFlangeLength90Inches: 0.314, minCornerReliefInches: 0.016, bendReliefDepthInches: 0.150 },
  { material: '316 Stainless Steel', thicknessInches: 0.125, thicknessMm: 3.18, kFactor: 0.38, bendDeduction90Inches: 0.2400, effectiveRadius90Inches: 0.150, dieWidthInches: 0.984, minFlangeLength90Inches: 0.740, minCornerReliefInches: 0.020, bendReliefDepthInches: 0.295 },
  { material: '316 Stainless Steel', thicknessInches: 0.187, thicknessMm: 4.75, kFactor: 0.35, bendDeduction90Inches: 0.3285, effectiveRadius90Inches: 0.130, dieWidthInches: 0.984, minFlangeLength90Inches: 0.784, minCornerReliefInches: 0.038, bendReliefDepthInches: 0.337 },
  { material: '316 Stainless Steel', thicknessInches: 0.250, thicknessMm: 6.35, kFactor: 0.34, bendDeduction90Inches: 0.4620, effectiveRadius90Inches: 0.225, dieWidthInches: 1.575, minFlangeLength90Inches: 1.381, minCornerReliefInches: 0.034, bendReliefDepthInches: 0.495 },

  // Titanium Grade 2
  { material: 'Titanium Grade 2', thicknessInches: 0.040, thicknessMm: 1.02, kFactor: 0.38, bendDeduction90Inches: 0.0790, effectiveRadius90Inches: 0.045, dieWidthInches: 0.472, minFlangeLength90Inches: 0.295, minCornerReliefInches: 0.016, bendReliefDepthInches: 0.105 },
];

export const UNIQUE_MATERIALS = Array.from(new Set(SENDCUTSEND_BENDING_SPECS.map(s => s.material)));
