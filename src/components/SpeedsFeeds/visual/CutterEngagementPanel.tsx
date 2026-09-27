import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import type { EngagementGeometry } from './engagementGeometry';
import { CutterEngagementSvg } from './CutterEngagementSvg';

interface CutterEngagementPanelProps {
  geo: EngagementGeometry;
  rotation: number;
  isAnimating: boolean;
  setIsAnimating: (on: boolean) => void;
  flutes: number;
  widthOfCut: string;
  unit: UnitType;
  rpm: number;
  isChipThinningActive: boolean;
  radialStepoverPercent: number;
}

/** 1. VISUAL: Live Kinematic Cutter Engagement Simulation — header, pause button, drawing, overlays, legend. */
export const CutterEngagementPanel: React.FC<CutterEngagementPanelProps> = ({
  geo, rotation, isAnimating, setIsAnimating, flutes, widthOfCut, unit, rpm, isChipThinningActive, radialStepoverPercent,
}) => {
  const { svgSize, contactAngleDeg } = geo;
  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.9) 0%, rgba(10, 15, 30, 0.95) 100%)', border: '1px solid rgba(244, 144, 44, 0.2)' }}>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            TOP-DOWN CUTTER TELEMETRY
          </span>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '2px', marginBottom: 0 }}>
            🟢 VISUAL // Radial Engagement Simulation
          </h4>
        </div>

        <button
          onClick={() => setIsAnimating(!isAnimating)}
          style={{
            background: isAnimating ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            color: isAnimating ? '#f87171' : '#4ade80',
            border: `1px solid ${isAnimating ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>{isAnimating ? '⏸ Pause Spindle' : '▶ Spin Spindle'}</span>
        </button>
      </div>

      {/* SVG Canvas */}
      <div style={{ position: 'relative', width: `${svgSize}px`, height: `${svgSize}px`, background: '#090d16', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)' }}>

        {/* Background Grid */}
        <CutterEngagementSvg geo={geo} rotation={rotation} flutes={flutes} widthOfCut={widthOfCut} unit={unit} />

        {/* Telemetry Badges overlaid on corners */}
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.85)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
          <span>Spindle: </span><strong style={{ color: '#f4902c' }}>{Math.round(rpm)} RPM</strong>
        </div>

        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(15, 23, 42, 0.85)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
          <span>Immersion: </span><strong style={{ color: isChipThinningActive ? '#c084fc' : '#4ade80' }}>{radialStepoverPercent.toFixed(0)}% ({contactAngleDeg.toFixed(0)}°)</strong>
        </div>

      </div>

      {/* Visualizer Legend */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-secondary)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f4902c', display: 'inline-block' }}></span>
          <span>Cutter Flutes ({flutes})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#475569', display: 'inline-block' }}></span>
          <span>Workpiece Stock</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(249, 115, 22, 0.6)', display: 'inline-block' }}></span>
          <span>Chip Formation Arc</span>
        </div>
      </div>

    </div>
  );
};
