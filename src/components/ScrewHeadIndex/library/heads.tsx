import { HeadGlyph, Side } from '../glyphs/frames';
import { OUTLINE, RECESS, STEEL, STEEL_DK } from '../glyphs/palette';
import { Shank } from '../glyphs/parts';
import type { FastenerItem } from '../types';

// ============ HEAD SHAPES (side profile) ============
// The 18 side-profile head shapes.
export const HEAD_GLYPHS: FastenerItem[] = [
  {
    id: 'head-flat82', name: '82° Countersunk (Flat)', group: 'head',
    description: 'Standard flat head — sits flush in an 82° countersink. Overall length includes the head.',
    render: () => <HeadGlyph slotY={20} head={<path d="M 18 20 L 102 20 L 70 52 L 50 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-flat100', name: '100° Flat', group: 'head',
    description: 'Wider, shallower countersunk head for thin sheet material (100° included angle).',
    render: () => <HeadGlyph slotY={26} head={<path d="M 12 26 L 108 26 L 70 50 L 50 50 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-oval', name: 'Oval (Raised CSK)', group: 'head',
    description: 'Countersunk with a decorative rounded top. Length measured to the largest diameter point.',
    render: () => <HeadGlyph slotY={16} head={<path d="M 18 28 Q 60 6 102 28 L 70 54 L 50 54 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-pan', name: 'Pan', group: 'head',
    description: 'General-purpose head: flat bearing surface, rounded sides, slightly domed top.',
    render: () => <HeadGlyph slotY={20} head={<path d="M 28 52 L 28 30 Q 28 18 44 18 L 76 18 Q 92 18 92 30 L 92 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-round', name: 'Round (Dome)', group: 'head',
    description: 'Traditional half-dome head, largely superseded by pan head.',
    render: () => <HeadGlyph slotY={18} head={<path d="M 26 52 A 34 30 0 0 1 94 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-truss', name: 'Truss', group: 'head',
    description: 'Extra-wide, low dome spreads clamping load — good for thin sheet and slotted holes.',
    render: () => <HeadGlyph slotY={30} head={<path d="M 12 52 A 48 26 0 0 1 108 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-fillister', name: 'Fillister', group: 'head',
    description: 'Tall, narrow cylindrical head with domed top — fits counterbored holes.',
    render: () => <HeadGlyph slotY={16} head={<path d="M 36 52 L 36 22 Q 36 12 46 12 L 74 12 Q 84 12 84 22 L 84 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-cheese', name: 'Cheese', group: 'head',
    description: 'Straight-sided cylindrical head with flat top (DIN 84 style).',
    render: () => <HeadGlyph slotY={22} head={<rect x="36" y="20" width="48" height="32" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />} />,
  },
  {
    id: 'head-binding', name: 'Binding (Undercut)', group: 'head',
    description: 'Slightly domed head with an undercut below — grips wire and terminal lugs.',
    render: () => <HeadGlyph slotY={22} head={<path d="M 30 52 L 34 46 L 34 28 Q 34 20 44 20 L 76 20 Q 86 20 86 28 L 86 46 L 90 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-bugle', name: 'Bugle', group: 'head',
    description: 'Concave-flared countersunk head (drywall screws) — seats without tearing paper.',
    render: () => <HeadGlyph slotY={20} head={<path d="M 20 20 L 100 20 C 84 24 74 34 70 52 L 50 52 C 46 34 36 24 20 20 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-hex', name: 'Hex', group: 'head',
    description: 'External hexagon driven by wrench or socket — the standard bolt head.',
    render: () => (
      <HeadGlyph head={
        <g>
          <rect x="26" y="22" width="68" height="30" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
          <line x1="46" y1="22" x2="46" y2="52" stroke={STEEL_DK} strokeWidth="2" />
          <line x1="74" y1="22" x2="74" y2="52" stroke={STEEL_DK} strokeWidth="2" />
        </g>
      } />
    ),
  },
  {
    id: 'head-hexwasher', name: 'Hex Washer', group: 'head',
    description: 'Hex head with integral washer flange — spreads load, common on TEK screws.',
    render: () => (
      <HeadGlyph head={
        <g>
          <rect x="34" y="18" width="52" height="26" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
          <line x1="50" y1="18" x2="50" y2="44" stroke={STEEL_DK} strokeWidth="2" />
          <line x1="70" y1="18" x2="70" y2="44" stroke={STEEL_DK} strokeWidth="2" />
          <rect x="20" y="44" width="80" height="9" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        </g>
      } />
    ),
  },
  {
    id: 'head-socket', name: 'Socket Cap', group: 'head',
    description: 'Tall cylindrical head with internal hex, often knurled — fits counterbores. See key chart below.',
    render: () => (
      <HeadGlyph head={
        <g>
          <rect x="34" y="12" width="52" height="40" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="3" />
          {[42, 50, 58, 66, 74].map(x => <line key={x} x1={x} y1="14" x2={x} y2="24" stroke={STEEL_DK} strokeWidth="1.5" />)}
          <rect x="50" y="12" width="20" height="8" fill={RECESS} rx="1" />
        </g>
      } />
    ),
  },
  {
    id: 'head-button', name: 'Button', group: 'head',
    description: 'Low-profile dome with internal hex — decorative socket screw head.',
    render: () => (
      <HeadGlyph head={
        <g>
          <path d="M 26 52 A 36 22 0 0 1 94 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
          <rect x="52" y="30" width="16" height="6" fill={RECESS} rx="1" />
        </g>
      } />
    ),
  },
  {
    id: 'head-trim', name: 'Trim', group: 'head',
    description: 'Narrow countersunk head with steep sides — smaller footprint than a standard flat.',
    render: () => <HeadGlyph slotY={18} head={<path d="M 34 18 L 86 18 L 68 52 L 52 52 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-wafer', name: 'Wafer', group: 'head',
    description: 'Very wide, thin, low-profile head — clamps thin sheet without a large dome.',
    render: () => <HeadGlyph slotY={32} head={<path d="M 12 32 L 108 32 L 82 50 L 38 50 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />} />,
  },
  {
    id: 'head-carriage', name: 'Carriage (Dome + Square)', group: 'head',
    description: 'Smooth dome with a square neck that locks into wood or square holes — no drive recess.',
    render: () => (
      <HeadGlyph head={
        <g>
          <path d="M 22 40 A 38 26 0 0 1 98 40 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
          <rect x="46" y="40" width="28" height="14" fill={STEEL_DK} stroke={OUTLINE} strokeWidth="1.5" />
        </g>
      } />
    ),
  },
  {
    id: 'head-set', name: 'Set (Headless)', group: 'head',
    description: 'No head at all — fully threaded grub screw with hex or slot drive in the end.',
    render: () => (
      <Side>
        <Shank topY={18} botY={112} w={30} pitch={12} />
        <rect x="50" y="18" width="20" height="8" fill={RECESS} rx="1" />
      </Side>
    ),
  },
];
