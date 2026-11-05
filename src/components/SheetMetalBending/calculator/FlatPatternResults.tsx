import React from 'react';
import type { BendInputs } from '../hooks/useBendInputs';
import { buildBendReport } from './bendReport';
import { copyText } from '../../../lib/softapp';

interface FlatPatternResultsProps {
  b: BendInputs;
  onShowDiagram: () => void;
}

/** Step 3: hero flat length, metrology table, bend lines, inside dimensions and the copy button. */
export const FlatPatternResults: React.FC<FlatPatternResultsProps> = ({ b, onShowDiagram }) => {
  const { calculations, activeParams, unitLabel, bendAngle, leftFlange, rightFlange } = b;
  return (
    <div className="glass-panel" style={{ padding: '25px', borderTop: '3px solid #00ff80', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', order: -1 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎯</span> Step 3: Flat Pattern Cut Results
          </h3>
          <span style={{ fontSize: '0.75rem', background: 'rgba(0, 255, 128, 0.15)', color: '#00ff80', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
            {calculations.numBends} Bending Operation{calculations.numBends !== 1 ? 's' : ''}
          </span>
        </div>

        {/* HERO RESULT: TOTAL FLAT PATTERN LENGTH */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(0, 255, 128, 0.12), rgba(var(--apk-accent-rgb), 0.08))', 
          border: '2px solid rgba(0, 255, 128, 0.5)', 
          borderRadius: '12px', 
          padding: '24px', 
          textAlign: 'center',
          marginBottom: '20px',
          boxShadow: '0 0 25px rgba(0, 255, 128, 0.1)'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#00ff80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
            Required Flat Pattern Cut Length
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
            {calculations.flatLength.toFixed(3)} <span style={{ fontSize: '1.4rem', fontWeight: 500, color: 'var(--accent)' }}>{unitLabel}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Unbent blank size ready for laser or waterjet cutting before brake forming
          </div>
        </div>

        <button
          type="button"
          onClick={onShowDiagram}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(90deg, var(--accent), #00ff80)',
            color: '#000',
            fontWeight: 800,
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(var(--apk-accent-rgb), 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <span>📐</span> View Interactive 2D Bending Diagrams & Animations →
        </button>

        {/* DETAILED FORMING PARAMETERS TABLE */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
            📊 Forming Metrology & Deduction Breakdown
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Bend Allowance (BA):</span>
              <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{calculations.BA.toFixed(4)} {unitLabel}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Outside Setback (OSSB):</span>
              <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{calculations.OSSB.toFixed(4)} {unitLabel}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', gridColumn: 'span 2', borderLeft: '3px solid #f59e0b' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Bend Deduction (per bend @ {bendAngle}°):</span>
              <strong style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>{calculations.BD.toFixed(4)} {unitLabel}</strong>
            </div>
          </div>
        </div>

        {/* BEND LINE LOCATIONS FROM OUTER EDGES */}
        {calculations.numBends > 0 && (
          <div style={{ background: 'rgba(var(--apk-accent-rgb), 0.04)', borderRadius: '8px', border: '1px solid rgba(var(--apk-accent-rgb), 0.3)', padding: '16px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span> Press Brake Bend Line Layout (From Outer Edge)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: calculations.numBends === 2 ? '1fr 1fr' : '1fr', gap: '10px' }}>
              {(parseFloat(leftFlange) > 0) && (
                <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From Left Blank Edge ➔ Bend Line 1</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    {calculations.leftBendLine.toFixed(3)} {unitLabel}
                  </div>
                </div>
              )}
              {(parseFloat(rightFlange) > 0) && (
                <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From Right Blank Edge ➔ Bend Line 2</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    {calculations.rightBendLine.toFixed(3)} {unitLabel}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ESTIMATED INSIDE DIMENSIONS AFTER BENDING */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '14px', fontSize: '0.85rem' }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
            ℹ️ Estimated Inside Dimensions After Bending (assuming standard thickness clearance)
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            <span>Base Inside: <strong style={{ color: '#fff' }}>{calculations.insideBase.toFixed(3)} {unitLabel}</strong></span>
            {(parseFloat(leftFlange) > 0) && <span>Left Inside: <strong style={{ color: '#fff' }}>{calculations.insideLeft.toFixed(3)} {unitLabel}</strong></span>}
            {(parseFloat(rightFlange) > 0) && <span>Right Inside: <strong style={{ color: '#fff' }}>{calculations.insideRight.toFixed(3)} {unitLabel}</strong></span>}
          </div>
        </div>
      </div>

      {/* Quick Copy to Clipboard Button */}
      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          onClick={() => {
            const summary = buildBendReport(activeParams, calculations, unitLabel);
            copyText(summary, 'Bending summary').then((ok) => { if (ok) alert('Bending summary copied to clipboard!'); });
          }}
          className="btn-precision"
          style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
        >
          📋 Copy Bending Report to Clipboard
        </button>
      </div>
    </div>
  );
};
