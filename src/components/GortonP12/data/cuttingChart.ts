import type { GortonMaterial } from '../types';

// Gorton P1-2 Cutting Chart Data (Page 35)
export const GORTON_MATERIALS: GortonMaterial[] = [
  // Cast Iron
  { category: 'Cast Iron', name: 'Average Brinell 150-170', tensile: '18,000 - 26,000', carbideDry: '250', carbideWet: '275', carbideCoolant: 'Dry or Soluble Oil', hssDry: '90', hssWet: '110', hssCoolant: 'Dry or Soluble Oil' },
  { category: 'Cast Iron', name: 'C.I. up to 1.5% Nickel (Brinell 170-195)', tensile: '20,000 - 28,000', carbideDry: '-', carbideWet: '275 - 300', carbideCoolant: 'Soluble Oil / Dry', hssDry: '70', hssWet: '80', hssCoolant: 'Soluble Oil' },
  { category: 'Cast Iron', name: 'C.I. up to 1% Cr. 3.5% Ni. (Brinell 200-210)', tensile: '30,000 - 36,000', carbideDry: '-', carbideWet: '210 - 230', carbideCoolant: 'Soluble Oil', hssDry: '65', hssWet: '70', hssCoolant: 'Soluble Oil' },
  { category: 'Cast Iron', name: 'Semi Steel 20-30% Scrap w/ 2% Si', tensile: '30,000 - 36,000', carbideDry: '-', carbideWet: '175 - 200', carbideCoolant: 'Soluble Oil', hssDry: '62', hssWet: '72', hssCoolant: 'Soluble Oil' },

  // Steels
  { category: 'Steels', name: 'Bessemer Screw Stock S.A.E. #1112', tensile: '70,000 - 90,000', carbideDry: '-', carbideWet: '220 - 230', carbideCoolant: 'Cutting Oil', hssDry: '160', hssWet: '170', hssCoolant: 'Cutting Oil' },
  { category: 'Steels', name: 'Free Cutting Bessemer (High Sulphur)', tensile: '70,000 - 90,000', carbideDry: '-', carbideWet: '240 - 260', carbideCoolant: 'Cutting Oil', hssDry: '175', hssWet: '185', hssCoolant: 'Cutting Oil' },
  { category: 'Steels', name: '#2 Bessemer High Sulphur', tensile: '70,000 - 90,000', carbideDry: '-', carbideWet: '270 - 300', carbideCoolant: 'Cutting Oil', hssDry: '165', hssWet: '175', hssCoolant: 'Cutting Oil' },
  { category: 'Steels', name: 'Ultra Cut High Manganese (same as #2)', tensile: '90,000 - 110,000', carbideDry: '-', carbideWet: '270 - 300', carbideCoolant: 'Cutting Oil', hssDry: '180', hssWet: '200', hssCoolant: 'Cutting Oil' },
  { category: 'Steels', name: 'Open Hearth Screw Stock S.A.E. #1120', tensile: '70,000 - 85,000', carbideDry: '-', carbideWet: '250 - 260', carbideCoolant: 'Cutting Oil', hssDry: '135', hssWet: '145', hssCoolant: 'Soda Compound' },
  { category: 'Steels', name: 'Soft Forging Steel S.A.E. #1020 (Low S)', tensile: '63,000 - 80,000', carbideDry: '-', carbideWet: '240 - 250', carbideCoolant: 'Soda Compound', hssDry: '110', hssWet: '120', hssCoolant: 'Soda Compound' },
  { category: 'Steels', name: 'S.A.E. #1045 Carbon Steel', tensile: '95,000 - 125,000', carbideDry: '-', carbideWet: '200 - 240', carbideCoolant: 'Soda Compound', hssDry: '80', hssWet: '90', hssCoolant: 'Soda Compound' },
  { category: 'Steels', name: 'Alloy Steels 3.5% Ni. S.A.E. #2315', tensile: '80,000 - 115,000', carbideDry: '-', carbideWet: '165 - 175', carbideCoolant: 'Soda Compound', hssDry: '110', hssWet: '120', hssCoolant: 'Soda Compound' },
  { category: 'Steels', name: 'Chrome Ni. S.A.E. #3120 (Heat Treated Blanks)', tensile: '80,000 - 110,000', carbideDry: '-', carbideWet: '140 - 160', carbideCoolant: 'Soda Compound', hssDry: '90', hssWet: '100', hssCoolant: 'Soda Compound' },

  // Aluminum
  { category: 'Aluminum', name: 'Pure Cast Aluminum #43', tensile: '19,000', carbideDry: '-', carbideWet: '400 Up', carbideCoolant: 'Kerosene & Lard Oil', hssDry: '220', hssWet: '230', hssCoolant: 'Kerosene & Lard Oil' },
  { category: 'Aluminum', name: 'Commercially Hard Temper Alum #2 SH.', tensile: '24,000', carbideDry: '-', carbideWet: '200 - 250', carbideCoolant: 'Kerosene & Lard Oil', hssDry: '130', hssWet: '140', hssCoolant: 'Kerosene & Lard Oil' },
  { category: 'Aluminum', name: 'Dural High Tensile #17 ST.', tensile: '58,000', carbideDry: '-', carbideWet: '275 - 300', carbideCoolant: 'Soluble Oil', hssDry: '190', hssWet: '200', hssCoolant: 'Soluble Oil' },

  // Copper, Brass & Bronze
  { category: 'Copper & Brass & Bronze', name: 'Copper One-Half Hard Commercial', tensile: '31,000', carbideDry: '-', carbideWet: '180 - 200', carbideCoolant: 'Soluble Oil', hssDry: '100', hssWet: '120', hssCoolant: 'Soluble Oil' },
  { category: 'Copper & Brass & Bronze', name: 'Brass, Cast Yellow', tensile: '20,000', carbideDry: '-', carbideWet: '400 - 600', carbideCoolant: 'Soluble Oil', hssDry: '200', hssWet: '220', hssCoolant: 'Soluble Oil' },
  { category: 'Copper & Brass & Bronze', name: 'Brass One-Half Hard Commercial', tensile: '25,000 - 30,000', carbideDry: '-', carbideWet: '250 - 300', carbideCoolant: 'Soluble Oil', hssDry: '135', hssWet: '165', hssCoolant: 'Soluble Oil' },
  { category: 'Copper & Brass & Bronze', name: 'Bronze, Gun Metal', tensile: '35,000', carbideDry: '-', carbideWet: '200 - 220', carbideCoolant: 'Soluble Oil', hssDry: '130', hssWet: '150', hssCoolant: 'Soluble Oil' },
  { category: 'Copper & Brass & Bronze', name: 'Bronze, Phosphor', tensile: '50,000', carbideDry: '-', carbideWet: '160 - 180', carbideCoolant: 'Soluble Oil', hssDry: '95', hssWet: '115', hssCoolant: 'Soluble Oil' },
];

/** The four <optgroup>s of the material picker; `withTensile` appends "(<tensile> TS)" to each option. */
export const MATERIAL_GROUPS: { label: string; category: GortonMaterial['category']; withTensile: boolean }[] = [
  { label: '── CAST IRON ──', category: 'Cast Iron', withTensile: true },
  { label: '── STEELS & SCREW STOCK ──', category: 'Steels', withTensile: false },
  { label: '── ALUMINUM ──', category: 'Aluminum', withTensile: true },
  { label: '── COPPER, BRASS & BRONZE ──', category: 'Copper & Brass & Bronze', withTensile: false },
];
