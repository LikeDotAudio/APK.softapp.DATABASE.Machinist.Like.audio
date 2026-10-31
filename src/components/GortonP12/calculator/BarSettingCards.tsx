import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import type { BarSettings } from '../types';

interface BarCardProps {
  tag: string;
  color: string;
  /** The colour as an "r, g, b" triple for the border, glow and tag fill. */
  rgb: string;
  value: string;
  caption: string;
}

/** One slider-bar setting card (lower or upper). */
const BarCard: React.FC<BarCardProps> = ({ tag, color, rgb, value, caption }) => (
  <div style={{
    background: 'var(--bg-primary)',
    padding: '20px',
    borderRadius: 'var(--radius-md)',
    border: `1px solid rgba(${rgb}, 0.4)`,
    boxShadow: `0 10px 25px -5px rgba(${rgb}, 0.15)`,
    position: 'relative'
  }}>
    <span style={{ position: 'absolute', top: '10px', right: '10px', background: `rgba(${rgb}, 0.2)`, color, fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
      {tag}
    </span>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
      SETTING DISTANCE
    </span>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 700, color, textShadow: `0 0 15px rgba(${rgb}, 0.4)` }}>
      {value}
    </div>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '6px', lineHeight: 1.4 }}>
      {caption}
    </span>
  </div>
);

interface BarSettingCardsProps {
  ratio: number;
  unit: UnitType;
  bars: BarSettings;
}

/** EXACT BAR SETTING DASHBOARD: ratio heading, the two bar cards and the page-15 setup note. */
export const BarSettingCards: React.FC<BarSettingCardsProps> = ({ ratio, unit, bars }) => {
  const imperial = unit === 'imperial';
  const unitWord = imperial ? 'Inches' : 'Millimeters';
  return (
    <div className="glass-panel" style={{ padding: '30px', background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.75) 100%)', borderTop: '3px solid var(--accent)' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '22px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            OFFICIAL GORTON FACTORY CALIBRATION
          </span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginTop: '4px' }}>
            {ratio.toFixed(2)} : 1 Reduction Ratio Settings
          </h3>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>SCALE SETTING</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b' }}>
            Figure "{Math.round(ratio)}" Notch
          </span>
        </div>
      </div>

      {/* Primary Bar Setting Display Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <BarCard
          tag="LOWER BAR"
          color="var(--accent)"
          rgb="var(--apk-accent-rgb)"
          value={imperial ? bars.lowerBarSettingInches.toFixed(3) : bars.lowerBarSettingMm.toFixed(2)}
          caption={`${unitWord} from ${bars.lowerGraduationLabel}`}
        />
        <BarCard
          tag="UPPER BAR"
          color="#f59e0b"
          rgb="245, 158, 11"
          value={imperial ? bars.upperBarSettingInches.toFixed(3) : bars.upperBarSettingMm.toFixed(2)}
          caption={`${unitWord} from ${bars.upperGraduationLabel}`}
        />
      </div>

      {/* Pro Setup Tip from Manual (Page 15) */}
      <div style={{
        background: 'rgba(56, 189, 248, 0.1)',
        borderLeft: '4px solid #38bdf8',
        padding: '12px 16px',
        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
        fontSize: '0.85rem',
        color: '#7dd3fc',
        lineHeight: 1.5
      }}>
        <strong>💡 Factory Setup Note (Page 15):</strong> For extreme repetitive accuracy, align the index line on the slider blocks with the bar calibrations using a <strong>magnifying glass</strong>. Never strike slider blocks with a hammer; loosen clamping screws fully before sliding.
      </div>

    </div>
  );
};
