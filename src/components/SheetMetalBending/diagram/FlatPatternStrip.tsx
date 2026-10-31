import React from 'react';
import { SvgGridPattern } from '../../common/SvgGridPattern';
import type { ActiveParams, BendResults } from '../types';

interface FlatPatternStripProps {
  calculations: BendResults;
  activeParams: ActiveParams;
  unitLabel: string;
  leftFlange: string;
  rightFlange: string;
}

/** DIAGRAM 1: FLAT PATTERN LAYOUT STRIP — the blank, its bend lines and their dimensions. */
export const FlatPatternStrip: React.FC<FlatPatternStripProps> = ({ calculations, activeParams, unitLabel, leftFlange, rightFlange }) => {
  // Compute visual SVG coordinates
  const margin = 60;
  const availableW = 800 - margin * 2;
  const L_tot = calculations.flatLength || 1;
  const scaleX = availableW / L_tot;
  const y0 = 60;
  const h = 60;

  const x_leftLine = margin + calculations.leftBendLine * scaleX;
  const x_rightLine = margin + (calculations.flatLength - calculations.rightBendLine) * scaleX;

  return (
    <div style={{ background: 'var(--bg-primary)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '30px', overflowX: 'auto' }}>
      <h4 style={{ fontSize: '0.9rem', color: '#00ff80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
        1. Flat Pattern Layout (Top View Blank) — Total Cut Length: {calculations.flatLength.toFixed(3)} {unitLabel}
      </h4>

      <svg viewBox="0 0 800 180" style={{ width: '100%', height: 'auto', background: '#0a0e17', borderRadius: '8px', border: '1px solid rgba(var(--apk-accent-rgb), 0.2)' }}>
        <defs>
          <SvgGridPattern id="grid" size={20} opacity={0.05} />
        </defs>
        <rect width="800" height="180" fill="url(#grid)" />

        <g>
          {/* Blank outline */}
          <rect x={margin} y={y0} width={availableW} height={h} fill="rgba(var(--apk-accent-rgb), 0.15)" stroke="var(--accent)" strokeWidth="2" rx="2" />

          {/* Overall dimension bar */}
          <line x1={margin} y1={25} x2={margin + availableW} y2={25} stroke="#fff" strokeWidth="1.5" />
          <line x1={margin} y1={18} x2={margin} y2={32} stroke="#fff" strokeWidth="1.5" />
          <line x1={margin + availableW} y1={18} x2={margin + availableW} y2={32} stroke="#fff" strokeWidth="1.5" />
          <text x={margin + availableW / 2} y={18} fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            TOTAL BLANK: {calculations.flatLength.toFixed(3)} {unitLabel}
          </text>

          {/* Left Bend Line */}
          {(parseFloat(leftFlange) > 0) && (
            <g>
              <line x1={x_leftLine} y1={y0 - 10} x2={x_leftLine} y2={y0 + h + 10} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              <text x={x_leftLine} y={y0 + h + 25} fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                BEND LINE 1
              </text>
              {/* Dimension from left edge */}
              <line x1={margin} y1={y0 + h + 40} x2={x_leftLine} y2={y0 + h + 40} stroke="#f59e0b" strokeWidth="1" />
              <line x1={margin} y1={y0 + h + 35} x2={margin} y2={y0 + h + 45} stroke="#f59e0b" strokeWidth="1" />
              <line x1={x_leftLine} y1={y0 + h + 35} x2={x_leftLine} y2={y0 + h + 45} stroke="#f59e0b" strokeWidth="1" />
              <text x={(margin + x_leftLine) / 2} y={y0 + h + 53} fill="#f59e0b" fontSize="11" textAnchor="middle" fontFamily="monospace">
                {calculations.leftBendLine.toFixed(3)} {unitLabel}
              </text>
            </g>
          )}

          {/* Right Bend Line */}
          {(parseFloat(rightFlange) > 0) && (
            <g>
              <line x1={x_rightLine} y1={y0 - 10} x2={x_rightLine} y2={y0 + h + 10} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              <text x={x_rightLine} y={y0 + h + 25} fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                BEND LINE 2
              </text>
              {/* Dimension from right edge */}
              <line x1={x_rightLine} y1={y0 + h + 40} x2={margin + availableW} y2={y0 + h + 40} stroke="#f59e0b" strokeWidth="1" />
              <line x1={x_rightLine} y1={y0 + h + 35} x2={x_rightLine} y2={y0 + h + 45} stroke="#f59e0b" strokeWidth="1" />
              <line x1={margin + availableW} y1={y0 + h + 35} x2={margin + availableW} y2={y0 + h + 45} stroke="#f59e0b" strokeWidth="1" />
              <text x={(x_rightLine + margin + availableW) / 2} y={y0 + h + 53} fill="#f59e0b" fontSize="11" textAnchor="middle" fontFamily="monospace">
                {calculations.rightBendLine.toFixed(3)} {unitLabel}
              </text>
            </g>
          )}

          {/* Center Base Label */}
          <text x={margin + availableW / 2} y={y0 + h / 2 + 5} fill="var(--accent)" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            {activeParams.specName}
          </text>
        </g>
      </svg>
    </div>
  );
};
