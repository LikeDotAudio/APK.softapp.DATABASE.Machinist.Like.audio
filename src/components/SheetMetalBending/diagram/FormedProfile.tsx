import React from 'react';
import { fmtInOrMm } from '../../../lib/units';
import { SvgGridPattern } from '../../common/SvgGridPattern';
import type { ActiveParams, LengthUnit } from '../types';

interface FormedProfileProps {
  activeParams: ActiveParams;
  unit: LengthUnit;
  unitLabel: string;
  bendAngle: number;
  baseLength: string;
  leftFlange: string;
  rightFlange: string;
}

/** DIAGRAM 2: 2D FORMED PROFILE SKETCH — side elevation of the U-channel or L-bracket. */
export const FormedProfile: React.FC<FormedProfileProps> = ({ activeParams, unit, unitLabel, bendAngle, baseLength, leftFlange, rightFlange }) => {
  const cx = 400;
  const cy = 160;
  const L_base = parseFloat(baseLength) || 10;
  const L_left = parseFloat(leftFlange) || 0;
  const L_right = parseFloat(rightFlange) || 0;

  const maxDim = Math.max(L_base, L_left * 2, L_right * 2, 10);
  const scale = 300 / maxDim;

  const halfBase = (L_base * scale) / 2;
  const x_left = cx - halfBase;
  const x_right = cx + halfBase;

  // Calculate flange tip points based on bend angle A
  // A bend angle of 90 deg means flange points straight up (angle = 90 deg)
  const A_rad = (bendAngle * Math.PI) / 180;
  const leftTipX = x_left - (L_left * scale) * Math.cos(A_rad);
  const leftTipY = cy - (L_left * scale) * Math.sin(A_rad);

  const rightTipX = x_right + (L_right * scale) * Math.cos(A_rad);
  const rightTipY = cy - (L_right * scale) * Math.sin(A_rad);

  return (
    <div style={{ background: 'var(--bg-primary)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
      <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
        2. Formed Profile Preview (Side Elevation View @ {bendAngle}° Bends)
      </h4>

      <svg viewBox="0 0 800 220" style={{ width: '100%', height: 'auto', background: '#0a0e17', borderRadius: '8px', border: '1px solid rgba(244, 144, 44, 0.2)' }}>
        {/* Its own grid: this drawing used to borrow #grid from the flat-pattern SVG. */}
        <defs>
          <SvgGridPattern id="profileGrid" size={20} opacity={0.05} />
        </defs>
        <rect width="800" height="220" fill="url(#profileGrid)" />

        <g>
          {/* Base floor line */}
          <line x1={x_left} y1={cy} x2={x_right} y2={cy} stroke="var(--accent-cyan)" strokeWidth="6" strokeLinecap="round" />

          {/* Left Flange */}
          {L_left > 0 && (
            <g>
              <line x1={x_left} y1={cy} x2={leftTipX} y2={leftTipY} stroke="#00ff80" strokeWidth="6" strokeLinecap="round" />
              <circle cx={x_left} cy={cy} r="5" fill="#f59e0b" />
              <text x={leftTipX - 10} y={leftTipY - 10} fill="#00ff80" fontSize="12" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                Left Flange: {L_left.toFixed(3)} {unitLabel}
              </text>
            </g>
          )}

          {/* Right Flange */}
          {L_right > 0 && (
            <g>
              <line x1={x_right} y1={cy} x2={rightTipX} y2={rightTipY} stroke="#00ff80" strokeWidth="6" strokeLinecap="round" />
              <circle cx={x_right} cy={cy} r="5" fill="#f59e0b" />
              <text x={rightTipX + 10} y={rightTipY - 10} fill="#00ff80" fontSize="12" fontWeight="bold" textAnchor="start" fontFamily="monospace">
                Right Flange: {L_right.toFixed(3)} {unitLabel}
              </text>
            </g>
          )}

          {/* Base Dimension */}
          <text x={cx} y={cy + 30} fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Base (Outside): {L_base.toFixed(3)} {unitLabel}
          </text>

          <text x={cx} y={30} fill="var(--text-muted)" fontSize="12" textAnchor="middle" fontFamily="monospace">
            Radius: {fmtInOrMm(activeParams.radius_in, unit === 'mm', 3, 2)} | K-Factor: {activeParams.kFactor}
          </text>
        </g>
      </svg>
    </div>
  );
};
