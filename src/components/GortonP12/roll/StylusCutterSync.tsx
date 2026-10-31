import React from 'react';
import { SegmentedButtons } from '../SegmentedButtons';
import type { SyncTarget } from '../types';

interface StylusCutterSyncProps {
  ratio: number;
  cutterDia: string;
  setCutterDia: (v: string) => void;
  rollerDia: string;
  setRollerDia: (v: string) => void;
  syncTarget: SyncTarget;
  setSyncTarget: (t: SyncTarget) => void;
  calculatedRoller: number;
  calculatedCutter: number;
}

/** Card 1: Stylus Roller to Cutter Diameter Synchronizer (Page 20) */
export const StylusCutterSync: React.FC<StylusCutterSyncProps> = ({
  ratio, cutterDia, setCutterDia, rollerDia, setRollerDia, syncTarget, setSyncTarget, calculatedRoller, calculatedCutter,
}) => (
  <div className="glass-panel" style={{ padding: '35px', borderTop: '3px solid #38bdf8' }}>
    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>⭕ Stylus Roller & Cutter Synchronizer</span>
    </h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '25px', lineHeight: 1.6 }}>
      When engraving raised or non-uniform relief lettering with Style Sets 795-1 / 25-1 (Page 20), cutter diameter must be precisely proportional to stylus roller diameter based on reduction ratio (Roller Dia = Cutter Dia × Ratio).
    </p>

    <div style={{ marginBottom: '20px', background: 'var(--bg-secondary)', padding: '15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase' }}>
        Select Variable To Calculate:
      </label>
      <SegmentedButtons
        options={[
          { id: 'roller', label: 'Calculate Roller Size' },
          { id: 'cutter', label: 'Calculate Cutter Size' },
        ]}
        value={syncTarget}
        onChange={setSyncTarget}
        containerStyle={{ display: 'flex', gap: '10px' }}
        variant="filled"
        activeColor="#38bdf8"
        pad="10px"
        radius="6px"
        stretch
      />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          Cutter Diameter (in)
        </label>
        <input
          type="number"
          value={syncTarget === 'roller' ? cutterDia : calculatedCutter.toFixed(4)}
          step="0.005"
          disabled={syncTarget === 'cutter'}
          onChange={(e) => setCutterDia(e.target.value)}
          className="input-precision"
          style={{ fontWeight: 700, color: syncTarget === 'cutter' ? '#f4902c' : '#fff' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          Stylus Roller Diameter (in)
        </label>
        <input
          type="number"
          value={syncTarget === 'cutter' ? rollerDia : calculatedRoller.toFixed(4)}
          step="0.01"
          disabled={syncTarget === 'roller'}
          onChange={(e) => setRollerDia(e.target.value)}
          className="input-precision"
          style={{ fontWeight: 700, color: syncTarget === 'roller' ? '#f59e0b' : '#fff' }}
        />
      </div>
    </div>

    <div style={{ background: 'var(--bg-primary)', padding: '18px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)', textAlign: 'center' }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
        Proportional Rule at {ratio.toFixed(2)} : 1 Ratio
      </span>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
        {syncTarget === 'roller' ? `${cutterDia}" Cutter ➔ ${calculatedRoller.toFixed(3)}" Roller` : `${rollerDia}" Roller ➔ ${calculatedCutter.toFixed(3)}" Cutter`}
      </div>
    </div>
  </div>
);
