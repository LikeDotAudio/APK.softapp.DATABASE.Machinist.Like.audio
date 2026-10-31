import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import { SvgGridPattern } from '../../common/SvgGridPattern';
import type { EngagementGeometry } from './engagementGeometry';

interface CutterEngagementSvgProps {
  geo: EngagementGeometry;
  rotation: number;
  flutes: number;
  widthOfCut: string;
  unit: UnitType;
}

/** The top-down drawing: stock, machined channel, contact arc, rotating flutes and the Ae dimension. */
export const CutterEngagementSvg: React.FC<CutterEngagementSvgProps> = ({ geo, rotation, flutes, widthOfCut, unit }) => {
  const { svgSize, center, maxRadiusPx, blockRightX, blockLeftX, blockTopY, blockHeight, contactAngleRad } = geo;
  return (
    <svg width={svgSize} height={svgSize} style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <SvgGridPattern id="cutterGrid" size={20} opacity={0.04} />
        <radialGradient id="cutterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(var(--apk-accent-rgb), 0.2)" />
          <stop offset="100%" stopColor="rgba(var(--apk-accent-rgb), 0)" />
        </radialGradient>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      <rect width={svgSize} height={svgSize} fill="url(#cutterGrid)" />

      {/* WORKPIECE BLOCK */}
      <rect
        x={blockLeftX}
        y={blockTopY}
        width={svgSize - blockLeftX}
        height={blockHeight}
        fill="url(#metalGrad)"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Machined channel (cutout where tool passed) */}
      <path
        d={`M ${blockLeftX} ${blockTopY} L ${blockRightX} ${blockTopY} L ${blockRightX} ${center} A ${maxRadiusPx} ${maxRadiusPx} 0 0 0 ${blockLeftX} ${center - Math.sin(contactAngleRad) * maxRadiusPx} Z`}
        fill="#090d16"
        opacity="0.85"
      />

      {/* Engagement Arc Highlight (The actual chip formation zone!) */}
      <path
        d={`M ${center} ${center} L ${blockRightX} ${center} A ${maxRadiusPx} ${maxRadiusPx} 0 0 0 ${blockLeftX} ${center - Math.sin(contactAngleRad) * maxRadiusPx} Z`}
        fill="rgba(249, 115, 22, 0.25)"
        stroke="#f97316"
        strokeWidth="2"
        strokeDasharray="4 2"
      />

      {/* Cutter Glow & Outer Diameter Circle */}
      <circle cx={center} cy={center} r={maxRadiusPx + 10} fill="url(#cutterGlow)" />
      <circle cx={center} cy={center} r={maxRadiusPx} fill="rgba(15, 23, 42, 0.8)" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx={center} cy={center} r={maxRadiusPx * 0.4} fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx={center} cy={center} r={5} fill="var(--accent)" />

      {/* Rotating Flutes */}
      <g transform={`rotate(${rotation}, ${center}, ${center})`}>
        {Array.from({ length: flutes }).map((_, i) => {
          const angleDeg = (360 / flutes) * i;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x2 = center + Math.cos(angleRad) * maxRadiusPx;
          const y2 = center + Math.sin(angleRad) * maxRadiusPx;
          const xInner = center + Math.cos(angleRad) * (maxRadiusPx * 0.4);
          const yInner = center + Math.sin(angleRad) * (maxRadiusPx * 0.4);

          // Flute cutting tip arc
          const tipRad = ((angleDeg + 15) * Math.PI) / 180;
          const xTip = center + Math.cos(tipRad) * (maxRadiusPx * 0.85);
          const yTip = center + Math.sin(tipRad) * (maxRadiusPx * 0.85);

          return (
            <g key={i}>
              <path
                d={`M ${xInner} ${yInner} L ${x2} ${y2} Q ${xTip} ${yTip} ${xInner} ${yInner}`}
                fill="rgba(var(--apk-accent-rgb), 0.3)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              <circle cx={x2} cy={y2} r="3" fill="#fff" />
            </g>
          );
        })}
      </g>

      {/* Dimension Lines / Telemetry Overlays on Canvas */}
      {/* WOC Arrow */}
      <line x1={blockLeftX} y1={blockTopY - 12} x2={blockRightX} y2={blockTopY - 12} stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x={(blockLeftX + blockRightX) / 2} y={blockTopY - 18} fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
        Ae: {widthOfCut} {unit === 'imperial' ? 'in' : 'mm'}
      </text>
    </svg>
  );
};
