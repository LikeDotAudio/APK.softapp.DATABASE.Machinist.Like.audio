import React from 'react';
import { OUTLINE, RECESS, STEEL, STEEL_DK } from './palette';
import { Shank, SlotTop } from './parts';

// The three SVG frames a glyph is drawn in.

// Drive glyph wrapper: steel screw head circle + dark recess children
export const Drive = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <circle cx="50" cy="50" r="45" fill={STEEL} stroke={OUTLINE} strokeWidth="2" />
    <circle cx="50" cy="50" r="38" fill="none" stroke={STEEL_DK} strokeWidth="1.5" opacity="0.6" />
    <g fill={RECESS} stroke={RECESS}>{children}</g>
  </svg>
);

// Side-profile wrapper for heads/screws
export const Side = ({ children, tall = false }: { children: React.ReactNode; tall?: boolean }) => (
  <svg viewBox={tall ? '0 0 120 200' : '0 0 120 120'} style={{ width: '100%', height: '100%' }}>
    {children}
  </svg>
);

// Head profile paths (head sits at top, shank stub below to y=115)
export const HeadGlyph = ({ head, stub = true, slotY }: { head: React.ReactNode; stub?: boolean; slotY?: number }) => (
  <Side>
    {stub && <Shank topY={52} botY={115} w={20} pitch={10} />}
    {head}
    {slotY !== undefined && <SlotTop y={slotY} />}
  </Side>
);
