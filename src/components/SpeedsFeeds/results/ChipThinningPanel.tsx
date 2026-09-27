import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import type { CutResults } from '../types';

interface ChipThinningPanelProps {
  r: CutResults;
  unit: UnitType;
}

/** Chip Thinning Highlight Panel: target CPT, programmed CPT and the feed boost. */
export const ChipThinningPanel: React.FC<ChipThinningPanelProps> = ({ r, unit }) => {
  const { isChipThinningActive, tCpt, revisedCpt, chipThinningMultiplier } = r;
  return (
    <div style={{
      background: isChipThinningActive ? 'rgba(168, 85, 247, 0.12)' : 'rgba(100, 116, 139, 0.1)',
      border: isChipThinningActive ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '18px',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isChipThinningActive ? '#e9d5ff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🌀 Radial Chip Thinning Analysis</span>
        </span>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isChipThinningActive ? '#4ade80' : '#94a3b8' }}>
          {isChipThinningActive ? 'Thinning Compensation Required' : 'Standard Full Immersion Cutting'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Target Chip Load</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>
            {tCpt.toFixed(unit === 'imperial' ? 4 : 3)} {unit === 'imperial' ? 'in' : 'mm'}
          </span>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '6px', border: isChipThinningActive ? '1px solid rgba(168, 85, 247, 0.5)' : 'none' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Programmed CPT (Fz)</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: isChipThinningActive ? '#c084fc' : '#fff', fontSize: '1.05rem' }}>
            {revisedCpt.toFixed(unit === 'imperial' ? 4 : 3)} {unit === 'imperial' ? 'in' : 'mm'}
          </span>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Feed Rate Boost</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: isChipThinningActive ? '#4ade80' : 'var(--text-secondary)', fontSize: '1.05rem' }}>
            {chipThinningMultiplier.toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  );
};
