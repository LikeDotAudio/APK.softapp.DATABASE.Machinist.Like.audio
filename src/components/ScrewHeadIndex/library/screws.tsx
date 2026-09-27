import { Side } from '../glyphs/frames';
import { starPoints } from '../glyphs/geometry';
import { OUTLINE, RECESS, STEEL, STEEL_DK } from '../glyphs/palette';
import { Shank, SlotTop } from '../glyphs/parts';
import type { FastenerItem } from '../types';

// ============ SCREW & BOLT TYPES (full body) ============
// The 14 full-body screw and bolt types.
export const SCREW_GLYPHS: FastenerItem[] = [
  {
    id: 'screw-wood', name: 'Wood Screw', group: 'screw',
    description: 'Tapered body, coarse deep threads, unthreaded shank near the head, gimlet point.',
    render: () => (
      <Side tall>
        <Shank topY={48} botY={192} w={26} taper point="gimlet" pitch={16} />
        <path d="M 18 16 L 102 16 L 74 48 L 46 48 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <polygon points="60,8 64,32 60,44 56,32" fill={RECESS} transform="translate(0 4)" />
      </Side>
    ),
  },
  {
    id: 'screw-sheetmetal', name: 'Sheet Metal (Tapping)', group: 'screw',
    description: 'Straight body, sharp widely-spaced threads to the head, sharp point — forms its own thread in sheet.',
    render: () => (
      <Side tall>
        <Shank topY={44} botY={192} w={24} point="gimlet" pitch={14} />
        <path d="M 30 44 L 30 26 Q 30 14 46 14 L 74 14 Q 90 14 90 26 L 90 44 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <polygon points="60,18 65,29 60,40 55,29" fill={RECESS} />
        <polygon points="44,29 60,25 76,29 60,33" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'screw-selfdrill', name: 'Self-Drilling (TEK)', group: 'screw',
    description: 'Sheet metal screw with a drill-bit point — drills and taps steel in one operation.',
    render: () => (
      <Side tall>
        <Shank topY={46} botY={192} w={24} point="drill" pitch={13} />
        <rect x="34" y="20" width="52" height="18" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        <line x1="50" y1="20" x2="50" y2="38" stroke={STEEL_DK} strokeWidth="2" />
        <line x1="70" y1="20" x2="70" y2="38" stroke={STEEL_DK} strokeWidth="2" />
        <rect x="24" y="38" width="72" height="8" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
      </Side>
    ),
  },
  {
    id: 'screw-drywall', name: 'Drywall Screw', group: 'screw',
    description: 'Bugle head, thin hardened body, sharp point, coarse (wood stud) or fine (steel stud) thread.',
    render: () => (
      <Side tall>
        <Shank topY={40} botY={192} w={18} point="gimlet" pitch={11} />
        <path d="M 26 14 L 94 14 C 82 18 72 26 68 40 L 52 40 C 48 26 38 18 26 14 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <polygon points="60,10 64,27 60,38 56,27" fill={RECESS} />
        <polygon points="46,24 60,21 74,24 60,29" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'screw-machine', name: 'Machine Screw', group: 'screw',
    description: 'Uniform diameter with fine, even threads and a blunt end — mates with tapped holes or nuts.',
    render: () => (
      <Side tall>
        <Shank topY={44} botY={186} w={24} point="blunt" pitch={9} />
        <path d="M 30 44 L 30 26 Q 30 14 46 14 L 74 14 Q 90 14 90 26 L 90 44 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <SlotTop y={22} x0={46} x1={74} />
      </Side>
    ),
  },
  {
    id: 'screw-hexbolt', name: 'Hex Cap Bolt', group: 'screw',
    description: 'Hex head, partially threaded shank with plain grip length, blunt chamfered end.',
    render: () => (
      <Side tall>
        <rect x="49" y="46" width="22" height="60" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <Shank topY={104} botY={186} w={22} point="blunt" pitch={9} />
        <rect x="28" y="16" width="64" height="30" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        <line x1="48" y1="16" x2="48" y2="46" stroke={STEEL_DK} strokeWidth="2" />
        <line x1="72" y1="16" x2="72" y2="46" stroke={STEEL_DK} strokeWidth="2" />
      </Side>
    ),
  },
  {
    id: 'screw-sockethead', name: 'Socket Head Cap', group: 'screw',
    description: 'Internal-hex cylindrical head, high-strength alloy — the machinist\'s workhorse. Key sizes below.',
    render: () => (
      <Side tall>
        <Shank topY={54} botY={186} w={22} point="blunt" pitch={9} />
        <rect x="36" y="12" width="48" height="42" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="3" />
        {[44, 52, 60, 68, 76].map(x => <line key={x} x1={x} y1="14" x2={x} y2="26" stroke={STEEL_DK} strokeWidth="1.5" />)}
        <rect x="51" y="12" width="18" height="9" fill={RECESS} rx="1" />
      </Side>
    ),
  },
  {
    id: 'screw-carriage', name: 'Carriage Bolt', group: 'screw',
    description: 'Smooth dome head and square neck lock the bolt against turning while the nut is tightened.',
    render: () => (
      <Side tall>
        <rect x="50" y="52" width="20" height="50" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <Shank topY={100} botY={186} w={20} point="blunt" pitch={9} />
        <path d="M 24 38 A 36 26 0 0 1 96 38 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <rect x="47" y="38" width="26" height="14" fill={STEEL_DK} stroke={OUTLINE} strokeWidth="1.5" />
      </Side>
    ),
  },
  {
    id: 'screw-set', name: 'Set Screw (Grub)', group: 'screw',
    description: 'Headless, fully threaded, hex-socket drive — locks pulleys and collars onto shafts.',
    render: () => (
      <Side tall>
        <Shank topY={30} botY={180} w={34} point="blunt" pitch={13} />
        <rect x="49" y="30" width="22" height="10" fill={RECESS} rx="1" />
      </Side>
    ),
  },
  {
    id: 'screw-eyebolt', name: 'Eye Bolt', group: 'screw',
    description: 'Circular loop head for attaching rope, cable or rigging hardware.',
    render: () => (
      <Side tall>
        <circle cx="60" cy="42" r="28" fill="none" stroke={STEEL} strokeWidth="13" />
        <circle cx="60" cy="42" r="28" fill="none" stroke={OUTLINE} strokeWidth="1.5" />
        <circle cx="60" cy="42" r="15" fill="none" stroke={OUTLINE} strokeWidth="1.5" />
        <Shank topY={72} botY={186} w={20} point="blunt" pitch={9} />
      </Side>
    ),
  },
  {
    id: 'screw-lag', name: 'Lag Screw', group: 'screw',
    description: 'Heavy hex-head wood screw — coarse deep thread and gimlet point for structural timber.',
    render: () => (
      <Side tall>
        <Shank topY={46} botY={192} w={26} taper point="gimlet" pitch={15} />
        <rect x="30" y="18" width="60" height="28" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        <line x1="48" y1="18" x2="48" y2="46" stroke={STEEL_DK} strokeWidth="2" />
        <line x1="72" y1="18" x2="72" y2="46" stroke={STEEL_DK} strokeWidth="2" />
      </Side>
    ),
  },
  {
    id: 'screw-masonry', name: 'Masonry Screw', group: 'screw',
    description: 'Hardened screw with high-low dual-lead thread — taps into drilled concrete or brick.',
    render: () => (
      <Side tall>
        <Shank topY={44} botY={188} w={22} point="blunt" pitch={8} />
        <rect x="34" y="18" width="52" height="18" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        <line x1="52" y1="18" x2="52" y2="36" stroke={STEEL_DK} strokeWidth="2" />
        <line x1="68" y1="18" x2="68" y2="36" stroke={STEEL_DK} strokeWidth="2" />
        <rect x="26" y="36" width="68" height="8" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
      </Side>
    ),
  },
  {
    id: 'screw-doubleend', name: 'Double-End (Hanger)', group: 'screw',
    description: 'Wood thread on one end, machine thread on the other — no head at all.',
    render: () => (
      <Side tall>
        <Shank topY={14} botY={96} w={20} point="blunt" pitch={8} />
        <rect x="52" y="96" width="16" height="14" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <Shank topY={110} botY={196} w={20} taper point="gimlet" pitch={13} />
      </Side>
    ),
  },
  {
    id: 'screw-decking', name: 'Decking Screw', group: 'screw',
    description: 'Corrosion-resistant bugle-head screw, often with a cutting nib and reverse top thread.',
    render: () => (
      <Side tall>
        <Shank topY={40} botY={192} w={20} point="gimlet" pitch={12} />
        <path d="M 28 14 L 92 14 C 82 18 72 26 68 40 L 52 40 C 48 26 38 18 28 14 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <polygon points={starPoints(60, 26, 6, 11, 6)} fill={RECESS} />
      </Side>
    ),
  },
];
