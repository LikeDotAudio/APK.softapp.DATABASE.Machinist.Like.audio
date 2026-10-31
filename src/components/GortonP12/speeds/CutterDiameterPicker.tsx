import React from 'react';
import { CUTTER_PRESETS } from '../data/speedMatrix';

interface CutterDiameterPickerProps {
  speedCutterDia: string;
  setSpeedCutterDia: (v: string) => void;
}

/** Box 2: Cutter Diameter Selection — six presets and a custom diameter. */
export const CutterDiameterPicker: React.FC<CutterDiameterPickerProps> = ({ speedCutterDia, setSpeedCutterDia }) => (
  <div style={{ background: 'var(--bg-secondary)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
      2. Select Cutter Diameter (Page 34):
    </label>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
      {CUTTER_PRESETS.map(btn => (
        <button
          key={btn.label}
          onClick={() => setSpeedCutterDia(btn.val)}
          style={{
            padding: '10px 6px',
            borderRadius: '6px',
            border: speedCutterDia === btn.val ? '2px solid var(--accent)' : '1px solid var(--border-color)',
            background: speedCutterDia === btn.val ? 'rgba(var(--apk-accent-rgb), 0.15)' : 'var(--bg-tertiary)',
            color: speedCutterDia === btn.val ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>

    <div>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        Custom Diameter (Decimal Inches):
      </label>
      <input
        type="number"
        value={speedCutterDia}
        step="0.01"
        onChange={(e) => setSpeedCutterDia(e.target.value)}
        className="input-precision"
        style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent)' }}
      />
    </div>
  </div>
);
