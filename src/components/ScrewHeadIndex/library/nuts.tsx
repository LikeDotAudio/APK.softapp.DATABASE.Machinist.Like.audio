import { Side } from '../glyphs/frames';
import { starPoints } from '../glyphs/geometry';
import { OUTLINE, RECESS, STEEL, STEEL_DK } from '../glyphs/palette';
import { NutBody, Shank } from '../glyphs/parts';
import type { FastenerItem } from '../types';

// ============ NUT TYPES (side profile) ============
// The 17 nut types.
export const NUT_GLYPHS: FastenerItem[] = [
  {
    id: 'nut-hex', name: 'Hex Finish Nut', group: 'nut',
    description: 'The standard general-purpose hexagon nut — see the wrench size chart below.',
    render: () => <Side><NutBody y={44} h={32} /><circle cx="60" cy="60" r="11" fill={RECESS} /></Side>,
  },
  {
    id: 'nut-jam', name: 'Hex Jam Nut', group: 'nut',
    description: 'Thin (half-height) hex nut — jammed against a full nut to lock it, or used in tight spaces.',
    render: () => <Side><NutBody y={50} h={19} /><circle cx="60" cy="60" r="10" fill={RECESS} /></Side>,
  },
  {
    id: 'nut-heavy', name: 'Heavy Hex Nut', group: 'nut',
    description: 'Taller and wider across flats than a finish nut — structural and high-pressure joints.',
    render: () => <Side><NutBody y={40} h={40} w={94} /><circle cx="60" cy="60" r="12" fill={RECESS} /></Side>,
  },
  {
    id: 'nut-square', name: 'Square Nut', group: 'nut',
    description: 'Four-sided nut with large bearing surface — resists loosening in wood and channel.',
    render: () => <Side><rect x="24" y="42" width="72" height="34" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" /><circle cx="60" cy="59" r="11" fill={RECESS} /></Side>,
  },
  {
    id: 'nut-acorn', name: 'Cap (Acorn) Nut', group: 'nut',
    description: 'Hex nut with a closed dome that covers and protects the bolt end.',
    render: () => <Side><path d="M 38 56 A 22 26 0 0 1 82 56 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" /><NutBody y={56} h={28} w={68} /></Side>,
  },
  {
    id: 'nut-castle', name: 'Castle Nut', group: 'nut',
    description: 'Crenellated top takes a cotter pin through the bolt for positive locking (axles, spindles).',
    render: () => (
      <Side>
        {[34, 54, 74].map(x => <rect key={x} x={x} y={36} width={12} height={14} fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />)}
        <NutBody y={50} h={30} w={76} />
        <circle cx="60" cy="65" r="10" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-slotted', name: 'Slotted Hex Nut', group: 'nut',
    description: 'Slots cut directly into the hex flats for cotter pinning — no raised crown.',
    render: () => (
      <Side>
        <NutBody y={40} h={38} w={80} />
        <rect x="42" y="40" width="9" height="13" fill={RECESS} />
        <rect x="69" y="40" width="9" height="13" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-nyloc', name: 'Nylon Insert Lock', group: 'nut',
    description: 'Nylon collar grips the bolt threads — prevailing-torque lock, resists vibration.',
    render: () => (
      <Side>
        <path d="M 40 48 Q 40 34 60 34 Q 80 34 80 48 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <rect x="44" y="38" width="32" height="7" fill="#3b82f6" rx="2" />
        <NutBody y={48} h={30} />
        <circle cx="60" cy="63" r="10" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-keps', name: 'Keps-K Lock Nut', group: 'nut',
    description: 'Hex nut with free-spinning external-tooth star washer attached — one-piece assembly.',
    render: () => (
      <Side>
        <NutBody y={38} h={30} w={72} />
        <polygon points={starPoints(60, 76, 12, 34, 24, 0)} fill={STEEL_DK} stroke={OUTLINE} strokeWidth="1" />
        <circle cx="60" cy="53" r="10" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-flange', name: 'Flange Serrated Nut', group: 'nut',
    description: 'Integral wide flange with serrations bites the surface — spreads load, resists loosening.',
    render: () => (
      <Side>
        <NutBody y={36} h={30} w={68} />
        <path d="M 22 66 L 98 66 L 90 80 L 30 80 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        {[32, 42, 52, 62, 72, 82].map(x => <line key={x} x1={x} y1="80" x2={x + 4} y2="72" stroke={STEEL_DK} strokeWidth="2" />)}
        <circle cx="60" cy="51" r="9" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-coupling', name: 'Coupling Nut', group: 'nut',
    description: 'Long hex nut joining two threaded rods or extending studs.',
    render: () => <Side><NutBody y={14} h={92} w={58} /><circle cx="60" cy="60" r="9" fill={RECESS} /></Side>,
  },
  {
    id: 'nut-thumb', name: 'Knurled Thumb Nut', group: 'nut',
    description: 'Cylindrical knurled body for tool-free finger tightening.',
    render: () => (
      <Side>
        <rect x="26" y="40" width="68" height="38" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="4" />
        {[34, 42, 50, 58, 66, 74, 82].map(x => <line key={x} x1={x} y1="42" x2={x} y2="76" stroke={STEEL_DK} strokeWidth="1.5" />)}
        <circle cx="60" cy="59" r="9" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-wing', name: 'Wing Nut', group: 'nut',
    description: 'Two flat wings for hand tightening — clamps, jigs and battery terminals.',
    render: () => (
      <Side>
        <path d="M 40 60 C 22 34 14 40 18 62 C 20 74 32 74 40 70 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <path d="M 80 60 C 98 34 106 40 102 62 C 100 74 88 74 80 70 Z" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <rect x="40" y="52" width="40" height="26" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="3" />
        <circle cx="60" cy="65" r="9" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-cage', name: 'Cage Nut', group: 'nut',
    description: 'Square nut in a sprung steel cage — snaps into square holes in racks and panels.',
    render: () => (
      <Side>
        <path d="M 24 40 L 24 84 L 40 84 L 40 92 L 20 92 L 20 32 L 40 32 L 40 40 Z" fill={STEEL_DK} stroke={OUTLINE} strokeWidth="1.5" />
        <path d="M 96 40 L 96 84 L 80 84 L 80 92 L 100 92 L 100 32 L 80 32 L 80 40 Z" fill={STEEL_DK} stroke={OUTLINE} strokeWidth="1.5" />
        <rect x="34" y="44" width="52" height="34" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        <circle cx="60" cy="61" r="10" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-tslot', name: 'T-Slot Nut', group: 'nut',
    description: 'T-profile slides in machine table or extrusion slots — the machinist\'s hold-down nut.',
    render: () => (
      <Side>
        <rect x="40" y="38" width="40" height="22" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" />
        <rect x="20" y="60" width="80" height="26" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        <circle cx="60" cy="52" r="9" fill={RECESS} />
      </Side>
    ),
  },
  {
    id: 'nut-barrel', name: 'Barrel Nut', group: 'nut',
    description: 'Cylinder with a cross-threaded hole — joins panels in furniture (with a cross-dowel bolt).',
    render: () => (
      <Side>
        <rect x="34" y="24" width="52" height="76" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="10" />
        <circle cx="60" cy="62" r="12" fill={RECESS} />
        <rect x="50" y="28" width="20" height="6" fill={RECESS} rx="2" />
      </Side>
    ),
  },
  {
    id: 'nut-insert', name: 'Threaded Insert Nut', group: 'nut',
    description: 'Coarse external wood thread, machine thread inside — screws into wood to accept bolts.',
    render: () => (
      <Side>
        <Shank topY={26} botY={100} w={40} pitch={15} />
        <rect x="34" y="20" width="52" height="10" fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        <rect x="49" y="20" width="22" height="8" fill={RECESS} rx="1" />
      </Side>
    ),
  },
];
