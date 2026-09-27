import React from 'react';
import type { BendFormula } from '../data/bendFormulas';

/** One of the seven bending-formula explanation cards. */
export const FormulaCard: React.FC<{ formula: BendFormula }> = ({ formula: f }) => (
  <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)', borderLeft: `4px solid ${f.color}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <h5 style={{ fontSize: '1.05rem', fontWeight: 700, color: f.color, margin: 0 }}>{f.title}</h5>
      <span style={{ background: f.badgeBg, color: f.color, padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{f.badge}</span>
    </div>
    <div style={{ background: '#0a0e17', padding: '10px', borderRadius: '6px', fontFamily: 'monospace', color: '#00ff80', marginBottom: '10px', fontSize: f.formulaFontSize, textAlign: 'center' }}>
      {f.formula}
    </div>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
      {f.body}
    </p>
  </div>
);
