import React from 'react';
import { SIM_SLIDERS } from '../data/simSliders';
import type { SimInputs } from '../types';

interface SimulatorControlsProps {
  inputs: SimInputs;
  onChange: (key: keyof SimInputs, raw: string) => void;
}

/** LEFT PANEL: SLIDER CONTROLS — the six range inputs defined in data/simSliders.ts. */
export const SimulatorControls: React.FC<SimulatorControlsProps> = ({ inputs, onChange }) => (
  <div className="glass-panel" style={{ padding: '25px', borderTop: '3px solid #38bdf8' }}>
    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>🎛️</span> Live Deformation Control Levers
    </h4>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {SIM_SLIDERS.map(s => (
        <div key={s.key}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
              {s.label}<span style={{ color: s.valueColor }}>{inputs[s.key]}{s.suffix}</span>
            </label>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{s.rangeText}</span>
          </div>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={inputs[s.key]}
            onChange={(e) => onChange(s.key, e.target.value)}
            style={{ width: '100%', accentColor: s.accent, cursor: 'pointer' }}
          />
        </div>
      ))}
    </div>
  </div>
);
