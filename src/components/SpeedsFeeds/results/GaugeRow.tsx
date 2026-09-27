import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import type { CutResults, SpeedsTab } from '../types';
import { GaugeCard } from './GaugeCard';

interface GaugeRowProps {
  r: CutResults;
  unit: UnitType;
  activeTab: SpeedsTab;
}

/** Primary Gauge Cards (4-Grid: RPM, Feed, Power, Torque) */
export const GaugeRow: React.FC<GaugeRowProps> = ({ r, unit, activeTab }) => {
  const imperial = unit === 'imperial';
  const hemOn = activeTab === 'chip_thinning' && r.isChipThinningActive;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>

      {/* Spindle RPM */}
      <GaugeCard
        title="SPINDLE SPEED (RPM)"
        value={Math.round(r.rpm).toLocaleString()}
        caption="Rev / Minute"
        color="#f4902c"
        border="1px solid rgba(244, 144, 44, 0.3)"
        boxShadow="0 10px 25px -5px rgba(244, 144, 44, 0.1)"
        textShadow="0 0 15px rgba(244, 144, 44, 0.4)"
      />

      {/* Table Feed Rate (Programmed vs Revised) */}
      <GaugeCard
        title={hemOn ? 'REVISED FEED' : 'TABLE FEED RATE'}
        value={(activeTab === 'chip_thinning' ? r.revisedFeedRate : r.ipmOrMmMin).toFixed(imperial ? 1 : 0)}
        caption={imperial ? 'Inches/min (IPM)' : 'mm/min'}
        color={hemOn ? '#c084fc' : '#00ff80'}
        border={hemOn ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(0, 255, 128, 0.3)'}
        boxShadow={hemOn ? '0 10px 25px -5px rgba(168, 85, 247, 0.2)' : '0 10px 25px -5px rgba(0, 255, 128, 0.1)'}
        textShadow={hemOn ? '0 0 15px rgba(168, 85, 247, 0.4)' : '0 0 15px rgba(0, 255, 128, 0.4)'}
        relative
        tag={hemOn && (
          <span style={{ position: 'absolute', top: '6px', right: '6px', background: '#a855f7', color: '#fff', fontSize: '0.6rem', padding: '2px 5px', borderRadius: '4px', fontWeight: 800 }}>
            +{Math.round((r.chipThinningMultiplier - 1) * 100)}% HEM
          </span>
        )}
      />

      {/* Spindle Power Requirement */}
      <GaugeCard
        title="SPINDLE POWER (EST.)"
        value={imperial ? r.horsepower.toFixed(1) : r.kilowatts.toFixed(1)}
        caption={imperial ? `Horsepower (HP) [${r.kilowatts.toFixed(1)} kW]` : `Kilowatts (kW) [${r.horsepower.toFixed(1)} HP]`}
        color="#f59e0b"
        border="1px solid rgba(245, 158, 11, 0.3)"
        boxShadow="0 10px 25px -5px rgba(245, 158, 11, 0.1)"
        textShadow="0 0 15px rgba(245, 158, 11, 0.3)"
      />

      {/* Spindle Torque */}
      <GaugeCard
        title="SPINDLE TORQUE"
        value={imperial ? r.torqueInLb.toFixed(1) : r.torqueNm.toFixed(1)}
        caption={imperial ? 'in-lbf (Inch-Pounds)' : 'N·m (Newton-Meters)'}
        color="#ec4899"
        border="1px solid rgba(236, 72, 153, 0.3)"
        boxShadow="0 10px 25px -5px rgba(236, 72, 153, 0.1)"
        textShadow="0 0 15px rgba(236, 72, 153, 0.3)"
      />

    </div>
  );
};
