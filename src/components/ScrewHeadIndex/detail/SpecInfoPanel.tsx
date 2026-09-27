import React from 'react';
import type { SpecInfo } from '../types';

/** Standards, measurement method & standard sizes for the selected item. */
export const SpecInfoPanel: React.FC<{ spec: SpecInfo }> = ({ spec }) => (
  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '12px 14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {spec.standard && (
      <div>
        <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '2px' }}>
          GOVERNING STANDARD
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>
          {spec.standard}
        </span>
      </div>
    )}
    <div>
      <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '2px' }}>
        HOW IT'S MEASURED
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
        {spec.measurement}
      </p>
    </div>
    {spec.sizes && (
      <div>
        <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '6px' }}>
          STANDARD SIZES
        </div>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {spec.sizes.map(s => (
            <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '3px 8px', color: 'var(--text-primary)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);
