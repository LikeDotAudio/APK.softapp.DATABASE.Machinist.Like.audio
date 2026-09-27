import type { FastenerItem, HexKeySize, RobertsonSize, WrenchSize } from '../types';

// Robertson (square drive) standard recess dimensions with driver color codes
export const ROBERTSON_SIZES: RobertsonSize[] = [
  { swatch: '#f59e0b', color: 'Orange', no: '#00', screws: '#1, #2', fraction: '—', rangeIn: '0.05', rangeMm: '1.3' },
  { swatch: '#facc15', color: 'Yellow', no: '#0', screws: '#3, #4', fraction: '1/16 in +', rangeIn: '0.0696–0.071', rangeMm: '1.77–1.80' },
  { swatch: '#16a34a', color: 'Green', no: '#1', screws: '#5, #6, #7', fraction: '3/32 in −', rangeIn: '0.090–0.091', rangeMm: '2.3' },
  { swatch: '#ef4444', color: 'Red', no: '#2', screws: '#8, #9, #10', fraction: '7/64 in +', rangeIn: '0.111–0.1126', rangeMm: '2.82–2.86' },
  { swatch: '#1a1a1a', color: 'Black', no: '#3', screws: '#12, 1/4', fraction: '1/8 in +', rangeIn: '0.1315–0.133', rangeMm: '3.34–3.38' },
  { swatch: '#7f3b30', color: 'Brown', no: '#4', screws: '5/16, 3/8', fraction: '3/16 in +', rangeIn: '0.1895–0.191', rangeMm: '4.81–4.85' },
];

// Hex bolt / nut wrench sizes across flats (metric)
export const HEX_WRENCH_SIZES: WrenchSize[] = [
  { size: 'M4', wrenchMm: 7 }, { size: 'M5', wrenchMm: 8 }, { size: 'M6', wrenchMm: 10 },
  { size: 'M8', wrenchMm: 14 }, { size: 'M10', wrenchMm: 17 }, { size: 'M12', wrenchMm: 19 },
  { size: 'M14', wrenchMm: 22 }, { size: 'M16', wrenchMm: 24 }, { size: 'M18', wrenchMm: 27 },
  { size: 'M20', wrenchMm: 30 }, { size: 'M22', wrenchMm: 32 }, { size: 'M24', wrenchMm: 36 },
  { size: 'M27', wrenchMm: 41 }, { size: 'M30', wrenchMm: 46 },
];

// Socket head cap screw hex key sizes (metric)
export const SOCKET_HEX_KEYS: HexKeySize[] = [
  { size: 'M3', keyMm: 2.5 }, { size: 'M4', keyMm: 3 }, { size: 'M5', keyMm: 4 },
  { size: 'M6', keyMm: 5 }, { size: 'M8', keyMm: 6 }, { size: 'M10', keyMm: 8 },
  { size: 'M12', keyMm: 10 }, { size: 'M14', keyMm: 12 }, { size: 'M16', keyMm: 14 },
];

// When each chart shows in the detail panel.

/** Socket cap hex key chart: socket-drive items. */
export const showsHexKeys = (id: string): boolean =>
  id === 'screw-sockethead' || id === 'head-socket' || id === 'drive-hex' || id === 'head-button' || id === 'screw-set';

/** Hex wrench (across flats) chart: every nut, plus hex heads and hex-driven screws. */
export const showsWrenchSizes = (item: FastenerItem): boolean =>
  item.group === 'nut' || ['head-hex', 'head-hexwasher', 'screw-hexbolt', 'screw-lag', 'screw-selfdrill'].includes(item.id);

/** Robertson square-recess colour-code table: the square-drive recesses. */
export const showsRobertson = (id: string): boolean =>
  id === 'drive-square' || id === 'drive-8point' || id === 'drive-phillips-square' || id === 'drive-square-slot';
