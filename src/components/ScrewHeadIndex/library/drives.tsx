import { Drive } from '../glyphs/frames';
import { polyPoints, starPoints } from '../glyphs/geometry';
import { STEEL } from '../glyphs/palette';
import type { FastenerItem } from '../types';

// ============ DRIVE TYPES (top view) ============
// The 19 top-view drive recesses.
export const DRIVE_GLYPHS: FastenerItem[] = [
  {
    id: 'drive-slotted', name: 'Slotted', group: 'drive',
    description: 'Single straight slot. The oldest drive — flat blade driver, prone to cam-out and slip.',
    render: () => <Drive><rect x="12" y="45" width="76" height="10" rx="2" /></Drive>,
  },
  {
    id: 'drive-phillips', name: 'Phillips', group: 'drive',
    description: 'Self-centering tapered cross recess (ANSI Type I). Designed to cam out at high torque.',
    render: () => <Drive><polygon points="50,10 56,42 88,48 88,52 56,58 50,90 44,58 12,52 12,48 44,42" /></Drive>,
  },
  {
    id: 'drive-phillips-slot', name: 'Phillips / Slot', group: 'drive',
    description: 'Combination recess driven by either Phillips or flat blade. Common on electrical terminals.',
    render: () => <Drive><polygon points="50,12 55,45 50,88 45,45" /><rect x="12" y="45" width="76" height="10" rx="2" /></Drive>,
  },
  {
    id: 'drive-pozidriv', name: 'Pozidriv', group: 'drive',
    description: 'Phillips-style cross with four extra 45° ribs for less cam-out. Marked by tick lines on the head.',
    render: () => (
      <Drive>
        <polygon points="50,10 56,42 88,48 88,52 56,58 50,90 44,58 12,52 12,48 44,42" />
        <g transform="rotate(45 50 50)">
          <rect x="47.5" y="14" width="5" height="16" /><rect x="47.5" y="70" width="5" height="16" />
          <rect x="14" y="47.5" width="16" height="5" /><rect x="70" y="47.5" width="16" height="5" />
        </g>
      </Drive>
    ),
  },
  {
    id: 'drive-square', name: 'Square (Robertson)', group: 'drive',
    description: 'Square recess with slight taper — excellent stick-fit and high torque. Sizes #0–#3.',
    render: () => <Drive><rect x="36" y="36" width="28" height="28" rx="2" /></Drive>,
  },
  {
    id: 'drive-square-slot', name: 'Square / Slot', group: 'drive',
    description: 'Combination square recess plus slot, driven by Robertson or flat blade.',
    render: () => <Drive><rect x="38" y="38" width="24" height="24" rx="2" /><rect x="12" y="46" width="76" height="8" rx="2" /></Drive>,
  },
  {
    id: 'drive-torx', name: 'Torx (6-Lobe)', group: 'drive',
    description: '6-lobe star recess (ISO 10664). Near-zero cam-out, full torque transfer. Sizes T1–T100.',
    render: () => <Drive><polygon points={starPoints(50, 50, 6, 28, 15)} strokeWidth="9" strokeLinejoin="round" /></Drive>,
  },
  {
    id: 'drive-torx-tamper', name: 'Torx Tamper (Pin)', group: 'drive',
    description: 'Security 6-lobe with center pin — requires a hollow-tip driver bit.',
    render: () => (
      <Drive>
        <polygon points={starPoints(50, 50, 6, 28, 15)} strokeWidth="9" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="7" fill={STEEL} stroke={STEEL} />
      </Drive>
    ),
  },
  {
    id: 'drive-torx-slot', name: '6-Lobe / Slot', group: 'drive',
    description: 'Combination star and slot recess.',
    render: () => <Drive><polygon points={starPoints(50, 50, 6, 26, 14)} strokeWidth="8" strokeLinejoin="round" /><rect x="12" y="46" width="76" height="8" rx="2" /></Drive>,
  },
  {
    id: 'drive-hex', name: 'Internal Hex (Allen)', group: 'drive',
    description: 'Hex socket driven by an Allen key. Standard on socket head cap screws — see key chart below.',
    render: () => <Drive><polygon points={polyPoints(50, 50, 6, 26)} strokeWidth="4" strokeLinejoin="round" /></Drive>,
  },
  {
    id: 'drive-triangle', name: 'Triangle (TA)', group: 'drive',
    description: 'Security triangular recess found on appliances and toys.',
    render: () => <Drive><polygon points={polyPoints(50, 52, 3, 24)} strokeWidth="8" strokeLinejoin="round" /></Drive>,
  },
  {
    id: 'drive-pentagon', name: '5-Point Pentagon', group: 'drive',
    description: 'Security pentagon socket — cannot be driven by standard hex keys.',
    render: () => <Drive><polygon points={polyPoints(50, 50, 5, 25)} strokeWidth="6" strokeLinejoin="round" /></Drive>,
  },
  {
    id: 'drive-y', name: 'Y-Type (Tri-Point)', group: 'drive',
    description: 'Three slots at 120° — common in consumer electronics (e.g., Y00, Y0).',
    render: () => (
      <Drive>
        {[0, 120, 240].map(a => (
          <g key={a} transform={`rotate(${a} 50 50)`}><rect x="46.5" y="16" width="7" height="38" rx="2" /></g>
        ))}
      </Drive>
    ),
  },
  {
    id: 'drive-triwing', name: 'Tri-Wing', group: 'drive',
    description: 'Three tapered offset wings — aerospace and security use.',
    render: () => (
      <Drive>
        <circle cx="50" cy="50" r="8" />
        {[0, 120, 240].map(a => (
          <g key={a} transform={`rotate(${a} 50 50)`}><polygon points="46,50 58,50 66,18 52,20" /></g>
        ))}
      </Drive>
    ),
  },
  {
    id: 'drive-8point', name: '8-Point (Double Square)', group: 'drive',
    description: 'Two overlaid square recesses at 45° — accepts a Robertson driver in eight positions.',
    render: () => <Drive><rect x="37" y="37" width="26" height="26" /><g transform="rotate(45 50 50)"><rect x="37" y="37" width="26" height="26" /></g></Drive>,
  },
  {
    id: 'drive-spline', name: 'Spline (12-Tooth)', group: 'drive',
    description: '12-spline aerospace drive for very high torque in small diameters.',
    render: () => <Drive><polygon points={starPoints(50, 50, 12, 26, 18)} strokeWidth="4" strokeLinejoin="round" /></Drive>,
  },
  {
    id: 'drive-spanner', name: 'Spanner (Snake-Eye)', group: 'drive',
    description: 'Two round holes driven by a pronged security bit.',
    render: () => <Drive><circle cx="33" cy="50" r="8" /><circle cx="67" cy="50" r="8" /></Drive>,
  },
  {
    id: 'drive-clutch', name: 'Clutch (Type A)', group: 'drive',
    description: 'Bow-tie recess used on older GM vehicles and mobile homes.',
    render: () => <Drive><circle cx="50" cy="50" r="9" /><polygon points="16,36 46,48 46,52 16,64" /><polygon points="84,36 54,48 54,52 84,64" /></Drive>,
  },
  {
    id: 'drive-phillips-square', name: 'Phillips / Square', group: 'drive',
    description: 'Quadrex / combo recess taking either Phillips or Robertson drivers.',
    render: () => <Drive><polygon points="50,12 55,44 50,88 45,44" /><polygon points="12,50 44,45 88,50 44,55" /><rect x="41" y="41" width="18" height="18" /></Drive>,
  },
];
