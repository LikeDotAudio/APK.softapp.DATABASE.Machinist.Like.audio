import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import type { CutResults, SpeedsTab } from '../types';

interface MachiningMetricsProps {
  r: CutResults;
  unit: UnitType;
  activeTab: SpeedsTab;
  contactAngleDeg: number;
}

/** Secondary Details Table: MRR, immersion angle, surface speed, predicted Ra and removed volume. */
export const MachiningMetrics: React.FC<MachiningMetricsProps> = ({ r, unit, activeTab, contactAngleDeg }) => {
  const { woc, doc, revisedFeedRate, mrr, radialStepoverPercent, speedVal, raMicroInches, raMicrons, finishQuality, length } = r;
  return (
    <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
      <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 700, letterSpacing: '0.5px' }}>
        Efficiency & Machining Metrics
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Material Removal Rate (MRR):</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {(activeTab === 'chip_thinning' ? (woc * doc * revisedFeedRate) / (unit === 'imperial' ? 1 : 1000) : mrr).toFixed(3)} {unit === 'imperial' ? 'in³/min' : 'cm³/min'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Radial Immersion Angle (θ):</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>
            {contactAngleDeg.toFixed(1)}° ({radialStepoverPercent.toFixed(1)}% stepover)
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Surface Velocity (Vc / SFM):</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {speedVal} {unit === 'imperial' ? 'SFM' : 'M/Min'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Predicted Finish Roughness (Ra):</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f59e0b' }}>
            {Math.round(raMicroInches)} µin / {raMicrons.toFixed(2)} µm ({finishQuality})
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Total Volume Removed:</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {(woc * doc * length).toFixed(3)} {unit === 'imperial' ? 'in³' : 'cm³'}
          </span>
        </div>
      </div>
    </div>
  );
};
