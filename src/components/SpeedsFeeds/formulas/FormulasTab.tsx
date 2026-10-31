import React from 'react';
import { InfoBox } from '../../common/InfoBox';
import { FORMULA_BOXES } from '../data/formulas';
import type { FormulaLine } from '../data/formulas';

const DIVIDER: React.CSSProperties = { borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '6px', paddingTop: '6px' };
const INDENT: React.CSSProperties = { color: '#e9d5ff', paddingLeft: '10px' };

const Line: React.FC<{ line: FormulaLine }> = ({ line }) => (
  <div style={line.divider ? DIVIDER : line.indent ? INDENT : undefined}>
    {line.label !== undefined && <strong>{line.label}</strong>}{line.text}
  </div>
);

/** FORMULAS REFERENCE TAB (Inspired by Garr Tool's Formulas Page) */
export const FormulasTab: React.FC<{ onReturn: () => void }> = ({ onReturn }) => (
  <div className="glass-panel" style={{ padding: '40px', background: 'var(--bg-primary)' }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '10px', borderBottom: '2px solid rgba(var(--apk-accent-rgb), 0.3)', paddingBottom: '12px' }}>
        📐 Essential Machining & Metrology Formulas
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.05rem', lineHeight: 1.6 }}>
        Quick reference equations used by precision CNC milling, turning, and toolroom machinists worldwide.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '25px' }}>
        {FORMULA_BOXES.map(box => (
          <InfoBox key={box.title} title={box.title} color={box.color} border={box.border} gridColumn={box.fullWidth ? '1 / -1' : undefined}>
            {box.groups ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', fontFamily: 'var(--font-mono)', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '6px', fontSize: box.monoFontSize, color: '#fff', marginBottom: '12px', lineHeight: 1.8 }}>
                {box.groups.map(g => (
                  <div key={g.title}>
                    <div style={{ color: g.color, fontWeight: 700, marginBottom: '4px' }}>{g.title}</div>
                    {g.lines.map((l, i) => <Line key={i} line={l} />)}
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{g.note}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '6px', fontSize: box.monoFontSize, color: '#fff', marginBottom: '12px', lineHeight: 1.8 }}>
                {box.lines?.map((l, i) => <Line key={i} line={l} />)}
              </div>
            )}
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              {box.caption}
            </p>
          </InfoBox>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '35px' }}>
        <button
          onClick={onReturn}
          style={{
            padding: '12px 28px',
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(var(--apk-accent-rgb), 0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          ← Return to Interactive Calculator
        </button>
      </div>
    </div>
  </div>
);
