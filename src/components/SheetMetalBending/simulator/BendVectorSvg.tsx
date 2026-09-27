import React from 'react';
import { SvgGridPattern } from '../../common/SvgGridPattern';
import type { SimResults } from '../types';

/** LIVE ANIMATED VECTOR VISUALIZER — the bend drawing and its HUD, driven by the simulator results. */
export const BendVectorSvg: React.FC<{ simCalc: SimResults }> = ({ simCalc }) => (
  <div className="glass-panel" style={{ padding: '30px', borderTop: '3px solid #f59e0b', textAlign: 'center' }}>
    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      <span>⚡</span> Live Vector Bending Simulation & Geometry Projections
    </h4>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '700px', margin: '0 auto 20px auto' }}>
      Real-time vector visualization of the plastic deformation zone. Notice how the dashed green neutral axis (K × T) shifts inward from the geometric centerline as bend angle θ increases.
    </p>

    <div style={{ background: '#0a0e17', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <svg viewBox="0 0 800 360" style={{ width: '100%', height: 'auto', maxHeight: '380px' }}>
        <defs>
          <SvgGridPattern id="simGrid" size={40} stroke="rgba(255,255,255,0.04)" />
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>
        <rect width="800" height="360" fill="url(#simGrid)" />

        {/* Base reference line */}
        <line x1="50" y1="280" x2="750" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <text x="70" y="300" fill="rgba(255,255,255,0.3)" fontSize="12" fontFamily="monospace">DATUM PLANO: HORIZONTAL BASE</text>

        {/* Left Flange (Fixed Horizontal) */}
        <rect x="100" y={280 - Math.min(50, simCalc.T * 100)} width="240" height={Math.min(50, simCalc.T * 100)} fill="url(#metalGrad)" stroke="#94a3b8" strokeWidth="2" />
        <text x="220" y={270 - Math.min(50, simCalc.T * 100)} fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">FLANGE 1 ({simCalc.L1}")</text>

        {/* Bend Zone & Right Flange Representation (Rotated dynamically by simAngle) */}
        <g transform={`translate(340, ${280})`}>
          {/* Outer Apex Setback Projection Lines */}
          <line x1="0" y1="0" x2={Math.min(120, simCalc.OSSB * 80)} y2="0" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="4" fill="#38bdf8" />
          <text x="0" y="20" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">TANGENT POINT</text>
          
          {/* Rotated Right Flange */}
          <g transform={`rotate(-${simCalc.angle}, 0, 0)`}>
            <rect x="0" y={-Math.min(50, simCalc.T * 100)} width="240" height={Math.min(50, simCalc.T * 100)} fill="url(#metalGrad)" stroke="#94a3b8" strokeWidth="2" opacity="0.9" />
            <line x1="0" y1="0" x2={Math.min(120, simCalc.OSSB * 80)} y2="0" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="120" y={-Math.min(50, simCalc.T * 100) - 10} fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">FLANGE 2 ({simCalc.L2}")</text>

            {/* Neutral Axis Arc representation */}
            <line x1="20" y1={-Math.min(50, simCalc.T * 100) * simCalc.K} x2="220" y2={-Math.min(50, simCalc.T * 100) * simCalc.K} stroke="#00ff80" strokeWidth="2" strokeDasharray="6 4" />
          </g>
        </g>

        {/* Left Neutral Axis Line */}
        <line x1="100" y1={280 - Math.min(50, simCalc.T * 100) * simCalc.K} x2="340" y2={280 - Math.min(50, simCalc.T * 100) * simCalc.K} stroke="#00ff80" strokeWidth="2" strokeDasharray="6 4" />

        {/* HUD Overlay Indicators */}
        <g transform="translate(550, 40)">
          <rect x="0" y="0" width="220" height="110" fill="rgba(15, 23, 42, 0.8)" stroke="var(--border-color)" rx="6" />
          <text x="15" y="25" fill="#00ff80" fontSize="12" fontWeight="bold" fontFamily="monospace">--- NEUTRAL AXIS (K={simCalc.K})</text>
          <text x="15" y="48" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">... APEX SETBACK (OSSB)</text>
          <text x="15" y="71" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">=== BEND ALLOWANCE ({simCalc.BA.toFixed(3)}")</text>
          <text x="15" y="94" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="monospace">▼ BEND DEDUCTION ({simCalc.BD.toFixed(3)}")</text>
        </g>

        {/* Live Angle Arc Indicator */}
        <path d={`M 400 280 A 60 60 0 0 0 ${400 - 60 * Math.cos((simCalc.angle * Math.PI)/180)} ${280 - 60 * Math.sin((simCalc.angle * Math.PI)/180)}`} fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
        <text x="430" y="250" fill="var(--accent-cyan)" fontSize="16" fontWeight="bold" fontFamily="monospace">θ = {simCalc.angle}°</text>
      </svg>
    </div>
  </div>
);
