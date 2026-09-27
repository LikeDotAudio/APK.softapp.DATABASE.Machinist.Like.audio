import type { SpecInfo } from '../types';

// Governing standards, measurement method and standard size ranges per drive/head
// (ISO / DIN / ANSI-ASME reference data)
export const SPEC_INFO: Record<string, SpecInfo> = {
  'drive-slotted': {
    standard: 'ISO 2380',
    measurement: 'Sized by the width and thickness of the blade. The slot must match the driver thickness to prevent cam-out and rounding of the slot edges.',
    sizes: ['2.0 mm', '2.5 mm', '3.0 mm', '4.0 mm', '5.5 mm', '6.5 mm', '8.0 mm', '10.0 mm', '1/8"', '3/16"', '1/4"', '5/16"', '3/8"'],
  },
  'drive-phillips': {
    standard: 'ISO 8764-1',
    measurement: 'Dimensioned by gauge size, defined geometrically by the tip width. Flank angles (≈104° main / 52° point) are deliberately tapered so the driver cams out before over-tightening.',
    sizes: ['#0000', '#000', '#00', '#0', '#1', '#2 (most common)', '#3', '#4'],
  },
  'drive-phillips-slot': {
    standard: '"PlusMinus" / ECX / Modulo (trade names)',
    measurement: 'Stepped two-tier recess: the tapered Phillips/Pozidriv cross forms the TOP tier (a self-centering funnel), while the slot is milled clean through the center as the BOTTOM tier, slightly deeper than the Phillips tip reaches — the straight-walled anchor. The electrical-trade standard (breaker lugs, terminal blocks); dedicated ECX/PlusMinus bits fill the whole stepped geometry for maximum torque without cam-out.',
    sizes: ['#1 — PH/PZ1 + 3/16" (5 mm) slot', '#2 — PH/PZ2 + 1/4" (6 mm) slot'],
  },
  'drive-pozidriv': {
    standard: 'ISO 8764-1',
    measurement: 'Dimensioned by gauge size. Extra 45° ribs and much steeper, nearly parallel flanks are dictated by the standard to reduce cam-out versus Phillips.',
    sizes: ['PZ0', 'PZ1', 'PZ2', 'PZ3', 'PZ4', 'PZ5'],
  },
  'drive-square': {
    standard: 'ANSI/ASME B18.6.3',
    measurement: 'Measured across the flats of the square recess, with a slight standardized taper toward the bottom for a friction (stick) fit. Drivers are color-coded by size — full recess dimension table below.',
  },
  'drive-square-slot': {
    standard: '"Recex" (trade name)',
    measurement: 'Stepped two-tier recess: the straight-walled #2 Square sits at the bottom as the high-torque anchor, with the slotted channel across the top. Found in specialized marine and woodworking fasteners.',
    sizes: ['#2 SQ + 1/4" slot (common)'],
  },
  'drive-torx': {
    standard: 'ISO 10664',
    measurement: 'Dimensioned by the major (point-to-point) diameter of the 6-lobe star. Each T-number defines an exact point-to-point outer diameter.',
    sizes: ['T1–T10', 'T15', 'T20', 'T25', 'T27', 'T30', 'T40', 'T45', 'T50', 'T55', 'T60+'],
  },
  'drive-torx-tamper': {
    standard: 'ISO 10664',
    measurement: 'Measured identically to standard Torx; the standard additionally dictates the center pin diameter, requiring a driver with a hollow center. Tools are marked TR/TH.',
    sizes: ['TR10', 'TR15', 'TR20', 'TR25', 'TR27', 'TR30', 'TR40+'],
  },
  'drive-torx-slot': {
    measurement: 'Combination recess — accepts the standard Torx size and a matched slotted blade; no unique sizing scale of its own.',
  },
  'drive-hex': {
    standard: 'ISO 2936 (metric) / ASME B18.3 (imperial)',
    measurement: 'Measured strictly across the flats (A/F) — a 5 mm hex key measures exactly 5 mm flat-to-flat.',
    sizes: ['1.5 mm', '2 mm', '2.5 mm', '3 mm', '4 mm', '5 mm', '6 mm', '8 mm', '10 mm → 36 mm', '1/16"', '5/64"', '3/32"', '1/8"', '5/32"', '3/16"', '1/4"', '5/16"', '3/8"'],
  },
  'drive-triangle': {
    measurement: 'Measured by the side length of the triangle (or the circumscribed circle diameter touching all points).',
    sizes: ['TA14 (1.4 mm)', 'TA18 (1.8 mm)', 'TA20 (2.0 mm)', 'TA23 (2.3 mm)', 'TA27 (2.7 mm)', 'TA30 (3.0 mm)'],
  },
  'drive-pentagon': {
    measurement: 'Measured by side length or circumscribed circle diameter. In electronics known as Pentalobe (Apple standard).',
    sizes: ['P1 (TS1)', 'P2 (TS4)', 'P5 (TS5)', 'P6 (TS6)'],
  },
  'drive-y': {
    measurement: 'Measured by gauge size; the three wings converge precisely at the center (unlike Tri-Wing). Common in Nintendo and Apple electronics.',
    sizes: ['Y000', 'Y00', 'Y0', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'],
  },
  'drive-triwing': {
    measurement: 'Gauge-sized proprietary scale (aerospace and electronics). Dimensioned by the outer diameter of the three wings, which are slightly offset from center.',
    sizes: ['#00', '#0', '#1', '#2', '#3', '#4', '#5', '#6'],
  },
  'drive-8point': {
    measurement: 'Two overlaid squares — tools are sized by the standard Square (Robertson) sizes they encompass; a standard square bit drives them in eight positions.',
  },
  'drive-spline': {
    standard: 'DIN 2324 (XZN / Triple Square)',
    measurement: 'Sized by the nominal thread diameter of the matching screw; geometrically defined by a precise 90° angle at each of the 12 points.',
    sizes: ['M4', 'M5', 'M6', 'M8', 'M10', 'M12', 'M14', 'M16', 'M18'],
  },
  'drive-spanner': {
    measurement: 'Measured by two critical dimensions: the center-to-center distance between the two drive holes and the required pin diameter. Sized by screw gauge.',
    sizes: ['#4', '#6', '#8', '#10', '#12', '#14'],
  },
  'drive-clutch': {
    measurement: 'Measured by the maximum outer diameter of the "butterfly" / bow-tie shape across its widest point.',
    sizes: ['1/8"', '5/32"', '3/16"', '1/4"', '5/16"'],
  },
  'drive-phillips-square': {
    standard: '"Quadrex" (trade name)',
    measurement: 'Stepped two-tier recess: the tapered #2 Phillips cross forms the top guiding tier, and the #2 Robertson square is punched into its deepest center point — nearly vertical walls, no taper — as the high-torque anchor. Standard in cabinet-making and HVAC: driven with a square bit in production, removable with a common Phillips later.',
    sizes: ['#2 — PH2 + SQ2 (overwhelming standard)', '#3 — PH3 + SQ3 (structural timber)'],
  },
  // Head shapes (envelope dimensions per ASME B18 family)
  'head-flat82': {
    standard: 'ASME B18.6.3',
    measurement: 'Measured by head angle and maximum head diameter. Standard ANSI imperial flat heads are 82°; metric ISO flat heads are 90°.',
  },
  'head-flat100': {
    standard: 'NAS / MS aerospace',
    measurement: 'Measured by head angle and maximum head diameter. The 100° angle spreads bearing load over thin aerospace sheet material.',
  },
  'head-oval': {
    standard: 'ASME B18.6.3',
    measurement: 'Countersunk envelope (angle + max head diameter) plus the crown height of the decorative dome above the surface.',
  },
  'head-pan': {
    standard: 'ASME B18.6.3',
    measurement: 'Measured by head diameter (width) and head height from the flat bearing surface to the apex.',
  },
  'head-round': {
    standard: 'ASME B18.6.3',
    measurement: 'Measured by head diameter and head height from bearing surface to dome apex.',
  },
  'head-truss': {
    standard: 'ASME B18.6.3',
    measurement: 'Head diameter and head height — truss heads have a larger diameter but much shorter height than pan heads.',
  },
  'head-fillister': {
    standard: 'ASME B18.6.2',
    measurement: 'Cylindrical head measured by head diameter and side-wall height; features a slightly convex dome on top (unlike cheese heads).',
  },
  'head-cheese': {
    standard: 'DIN 84',
    measurement: 'Cylindrical head with perfectly vertical side walls — measured by head diameter and head height.',
  },
  'head-binding': {
    measurement: 'Cylindrical envelope (diameter + height) plus the undercut dimension below the head that grips wire and lugs.',
  },
  'head-hex': {
    standard: 'ASME B18.2.1',
    measurement: 'Measured across the flats, across the corners, and by overall head height — toleranced to guarantee wrench and socket clearance.',
  },
  'head-hexwasher': {
    standard: 'ASME B18.6.3',
    measurement: 'Hex dimensions (across flats/corners, height) plus the integral washer flange diameter and thickness.',
  },
  'head-socket': {
    standard: 'ASME B18.3 / ISO 4762',
    measurement: 'Measured by head diameter, head height (≈ nominal thread diameter) and the internal hex socket across flats.',
  },
  'head-button': {
    standard: 'ASME B18.3 / ISO 7380',
    measurement: 'Measured by head diameter and low dome height, plus the internal hex socket across flats.',
  },
  'nut-hex': {
    standard: 'ASME B18.2.2 / ISO 4032',
    measurement: 'Measured across the flats (wrench size), across the corners, and by nut thickness. See the wrench chart below.',
  },
  'nut-heavy': {
    standard: 'ASME B18.2.2',
    measurement: 'Same measurements as a finish nut but with larger across-flats and thickness for the same thread size.',
  },
};
