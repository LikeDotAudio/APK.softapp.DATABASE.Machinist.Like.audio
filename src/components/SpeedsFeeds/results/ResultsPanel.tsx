import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import type { CutResults, SpeedsTab } from '../types';
import { ChipThinningPanel } from './ChipThinningPanel';
import { GaugeRow } from './GaugeRow';
import { MachiningMetrics } from './MachiningMetrics';

interface ResultsPanelProps {
  r: CutResults;
  unit: UnitType;
  activeTab: SpeedsTab;
  materialName: string;
  contactAngleDeg: number;
}

/** 3. EXPLANATION & RESULTS: header with cut time, gauges, thinning block, metrics and the pro-tip. */
export const ResultsPanel: React.FC<ResultsPanelProps> = ({ r, unit, activeTab, materialName, contactAngleDeg }) => {
  const { cutMinutes, cutSeconds } = r;
  return (
    <div className="glass-panel" style={{ padding: '25px', background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.7) 100%)', borderTop: activeTab === 'chip_thinning' ? '3px solid #a855f7' : '3px solid var(--accent)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '18px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: activeTab === 'chip_thinning' ? '#c084fc' : 'var(--accent)', margin: 0 }}>
          📐 EXPLANATION // {activeTab === 'chip_thinning' ? 'HEM CHIP THINNING DASHBOARD' : 'OPTIMAL MACHINING PARAMETERS'} — {materialName}
        </h3>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>ESTIMATED CUT TIME</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8' }}>
            {cutMinutes}m {cutSeconds}s
          </span>
        </div>
      </div>

      {/* Primary Gauge Cards (4-Grid: RPM, Feed, Power, Torque) */}
      <GaugeRow r={r} unit={unit} activeTab={activeTab} />

      {/* Chip Thinning Highlight Panel (When Active) */}
      {activeTab === 'chip_thinning' && <ChipThinningPanel r={r} unit={unit} />}

      {/* Secondary Details Table */}
      <MachiningMetrics r={r} unit={unit} activeTab={activeTab} contactAngleDeg={contactAngleDeg} />

      {/* Pro Tip */}
      <div style={{
        background: activeTab === 'chip_thinning' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        borderLeft: activeTab === 'chip_thinning' ? '4px solid #a855f7' : '4px solid #3b82f6',
        padding: '12px 16px',
        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
        fontSize: '0.85rem',
        color: activeTab === 'chip_thinning' ? '#e9d5ff' : '#93c5fd',
        lineHeight: 1.5,
        marginTop: '5px'
      }}>
        {activeTab === 'chip_thinning' ? (
          <><strong>💡 HEM Pro-Tip:</strong> In Trochoidal or Dynamic milling with small radial stepovers (under 30%), increasing feed per tooth is essential to prevent chip rubbing, heat buildup, and work hardening.</>
        ) : (
          <><strong>💡 Tooling Pro-Tip:</strong> When full-slotting (100% radial immersion), reduce recommended table feed rate by 20% to prevent flute packing and excessive tool deflection.</>
        )}
      </div>
    </div>
  );
};
