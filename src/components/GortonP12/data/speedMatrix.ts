import type { SpeedRow } from '../types';

// Speed Chart Matrix Data (Page 34)
export const SPEED_MATRIX: SpeedRow[] = [
  { sfm: 30, d16: 1833, d8: 917, d316: 611, d4: 458, d516: 367, d38: 306 },
  { sfm: 40, d16: 2445, d8: 1222, d316: 815, d4: 611, d516: 489, d38: 408 },
  { sfm: 50, d16: 3056, d8: 1528, d316: 1019, d4: 764, d516: 611, d38: 509 },
  { sfm: 60, d16: 3667, d8: 1833, d316: 1222, d4: 917, d516: 733, d38: 611 },
  { sfm: 70, d16: 4278, d8: 2139, d316: 1426, d4: 1070, d516: 856, d38: 713 },
  { sfm: 80, d16: 4889, d8: 2445, d316: 1630, d4: 1222, d516: 978, d38: 815 },
  { sfm: 100, d16: 6112, d8: 3056, d316: 2037, d4: 1528, d516: 1222, d38: 1019 },
  { sfm: 125, d16: 7641, d8: 3820, d316: 2546, d4: 1910, d516: 1528, d38: 1274 },
  { sfm: 150, d16: 9169, d8: 4584, d316: 3056, d4: 2292, d516: 1833, d38: 1527 },
  { sfm: 175, d16: 10714, d8: 5348, d316: 3565, d4: 2674, d516: 2139, d38: 1784 },
  { sfm: 200, d16: 12224, d8: 6112, d316: 4074, d4: 3056, d516: 2444, d38: 2036 },
  { sfm: 250, d16: 15281, d8: 7640, d316: 5092, d4: 3820, d516: 3055, d38: 2548 },
  { sfm: 300, d16: 18337, d8: 9168, d316: 6111, d4: 4584, d516: 3666, d38: 3057 },
  { sfm: 400, d16: 24450, d8: 12224, d316: 8148, d4: 6112, d516: 4888, d38: 4076 },
  { sfm: 500, d16: 30562, d8: 15280, d316: 10185, d4: 7640, d516: 6110, d38: 5095 },
  { sfm: 700, d16: 42787, d8: 21392, d316: 14259, d4: 10696, d516: 8554, d38: 7133 },
  { sfm: 900, d16: 55012, d8: 27504, d316: 18333, d4: 13752, d516: 10998, d38: 9170 },
];

/** The six cutter-diameter presets of box 2 (Page 34). */
export const CUTTER_PRESETS: { label: string; val: string }[] = [
  { label: '1/16"', val: '0.0625' },
  { label: '1/8"', val: '0.125' },
  { label: '3/16"', val: '0.1875' },
  { label: '1/4"', val: '0.250' },
  { label: '5/16"', val: '0.3125' },
  { label: '3/8"', val: '0.375' },
];

/** The matrix's RPM columns, each tied to the preset diameter string that lights it. */
export const MATRIX_COLUMNS: { key: Exclude<keyof SpeedRow, 'sfm'>; dia: string; header: string }[] = [
  { key: 'd16', dia: '0.0625', header: '1/16" Dia' },
  { key: 'd8', dia: '0.125', header: '1/8" Dia' },
  { key: 'd316', dia: '0.1875', header: '3/16" Dia' },
  { key: 'd4', dia: '0.250', header: '1/4" Dia' },
  { key: 'd516', dia: '0.3125', header: '5/16" Dia' },
  { key: 'd38', dia: '0.375', header: '3/8" Dia' },
];
