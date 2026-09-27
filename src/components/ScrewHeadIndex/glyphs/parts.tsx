import React from 'react';
import { OUTLINE, RECESS, STEEL, STEEL_DK } from './palette';

// The reusable parts drawn inside a glyph frame.

// Threaded shank for side-profile glyphs (viewBox 120 × 200)
export const Shank = ({ topY, botY = 190, w = 22, taper = false, point = 'blunt', pitch = 11 }: {
  topY: number; botY?: number; w?: number; taper?: boolean; point?: 'blunt' | 'gimlet' | 'drill'; pitch?: number;
}) => {
  const cx = 60;
  const half = w / 2;
  const tipLen = point === 'gimlet' ? 26 : point === 'drill' ? 22 : 0;
  const bodyBot = botY - tipLen;
  const halfAt = (y: number) => taper ? half * Math.max(0.25, 1 - (0.55 * (y - topY)) / (botY - topY)) : half;
  const threads: React.ReactElement[] = [];
  for (let y = topY + 8; y < bodyBot - 2; y += pitch) {
    const h = halfAt(y);
    threads.push(<line key={y} x1={cx - h - 3} y1={y + 4} x2={cx + h + 3} y2={y - 4} stroke={STEEL_DK} strokeWidth="2.5" />);
  }
  const hb = halfAt(bodyBot);
  const tip = point === 'gimlet'
    ? `L ${cx + hb} ${bodyBot} L ${cx} ${botY} L ${cx - hb} ${bodyBot}`
    : point === 'drill'
      ? `L ${cx + hb} ${bodyBot} L ${cx + hb * 0.4} ${botY} L ${cx - hb * 0.9} ${bodyBot - 6} L ${cx - hb} ${bodyBot}`
      : `L ${cx + hb} ${bodyBot} L ${cx - hb} ${bodyBot}`;
  return (
    <g>
      <path
        d={`M ${cx - half} ${topY} L ${cx + half} ${topY} ${taper || tipLen ? `L ${cx + hb} ${bodyBot} ${tip}` : `L ${cx + half} ${bodyBot} L ${cx - half} ${bodyBot}`} Z`}
        fill={STEEL} stroke={OUTLINE} strokeWidth="1.5"
      />
      {threads}
    </g>
  );
};

// Hex nut body, side view (facet lines imply the hexagon)
export const NutBody = ({ y, h, w = 84, facets = true }: { y: number; h: number; w?: number; facets?: boolean }) => {
  const x = (120 - w) / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={STEEL} stroke={OUTLINE} strokeWidth="1.5" rx="3" />
      {facets && (
        <>
          <line x1={x + w * 0.32} y1={y} x2={x + w * 0.32} y2={y + h} stroke={STEEL_DK} strokeWidth="2" />
          <line x1={x + w * 0.68} y1={y} x2={x + w * 0.68} y2={y + h} stroke={STEEL_DK} strokeWidth="2" />
        </>
      )}
    </g>
  );
};

// A dark screwdriver slot across the top of a side-profile head.
export const SlotTop = ({ y, x0 = 52, x1 = 68 }: { y: number; x0?: number; x1?: number }) => (
  <rect x={x0} y={y} width={x1 - x0} height={5} fill={RECESS} rx={1} />
);
