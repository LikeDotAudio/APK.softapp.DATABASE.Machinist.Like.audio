import React from 'react';
import type { SimResults } from '../types';
import { ReadoutCard } from './ReadoutCard';

/** RIGHT PANEL: LIVE METROLOGY DASHBOARD — six readout cards and the neutral-radius strip. */
export const SimulatorReadouts: React.FC<{ simCalc: SimResults }> = ({ simCalc }) => (
  <div className="glass-panel" style={{ padding: '25px', borderTop: '3px solid #00ff80', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📊</span> Live Metrology Readouts
      </h4>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Real-time computation of the 7 core relationships. Watch values dynamically grow and shrink as you form the bend!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        <ReadoutCard title="Flat Pattern Length (FL)" value={`${simCalc.FL.toFixed(4)}"`} caption="L₁ + L₂ - BD"
          color="#00ff80" background="rgba(0, 255, 128, 0.08)" border="rgba(0, 255, 128, 0.3)" />
        <ReadoutCard title="Bend Deduction (BD)" value={`${simCalc.BD.toFixed(4)}"`} caption="2 × OSSB - BA"
          color="#ef4444" background="rgba(239, 68, 68, 0.08)" border="rgba(239, 68, 68, 0.3)" />
        <ReadoutCard title="Bend Allowance (BA / DL)" value={`${simCalc.BA.toFixed(4)}"`} caption="Neutral Arc Length"
          color="#38bdf8" background="rgba(56, 189, 248, 0.08)" border="rgba(56, 189, 248, 0.3)" />
        <ReadoutCard title="Outside Setback (OSSB)" value={`${simCalc.OSSB.toFixed(4)}"`} caption="Tangent to Apex Distance"
          color="#f59e0b" background="rgba(245, 158, 11, 0.08)" border="rgba(245, 158, 11, 0.3)" />
        <ReadoutCard title="K-Factor Ratio (K)" value={simCalc.K.toFixed(2)} caption="t / T (Neutral Shift)"
          color="#a855f7" background="rgba(168, 85, 247, 0.08)" border="rgba(168, 85, 247, 0.3)" />
        <ReadoutCard title="Y-Factor Value (Y)" value={simCalc.Y.toFixed(4)} caption="K × (π / 2) (CAD Factor)"
          color="#ec4899" background="rgba(236, 72, 153, 0.08)" border="rgba(236, 72, 153, 0.3)" />
      </div>
    </div>

    <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-primary)', borderRadius: '6px', border: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Neutral Axis Radius (r_neutral):</span>
      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>{simCalc.r_neutral.toFixed(4)}"</span>
    </div>
  </div>
);
