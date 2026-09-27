import React from 'react';
import { MATRIX_COLUMNS, SPEED_MATRIX } from '../data/speedMatrix';

interface SpeedMatrixTableProps {
  sfmNum: number;
  speedCutterDia: string;
}

/** Bottom Section: Official Page 34 Speed Matrix Table, the current SFM row and diameter lit. */
export const SpeedMatrixTable: React.FC<SpeedMatrixTableProps> = ({ sfmNum, speedCutterDia }) => (
  <div className="glass-panel" style={{ padding: '35px', background: 'var(--bg-primary)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
      <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          📊 Official Speed Chart Matrix (Manual Page 34)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Spindle revolutions per minute (RPM) across standard cutter diameters and surface speeds. Click any SFM row to test in calculator!
        </p>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
        Formula: RPM = (SFM × 12) ÷ (π × Dia)
      </div>
    </div>

    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
            <th style={{ padding: '14px', borderBottom: '2px solid var(--border-color)', color: '#10b981' }}>Surface Ft. / Min (SFM)</th>
            {MATRIX_COLUMNS.map(col => (
              <th key={col.key} style={{ padding: '14px', borderBottom: '2px solid var(--border-color)' }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SPEED_MATRIX.map((row, idx) => {
            const isCurrent = (sfmNum > 0 && Math.abs(row.sfm - sfmNum) < 15);
            return (
              <tr
                key={row.sfm}
                style={{
                  background: isCurrent ? 'rgba(16, 185, 129, 0.15)' : idx % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-tertiary)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s ease'
                }}
              >
                <td style={{ padding: '11px', fontWeight: 800, color: isCurrent ? '#10b981' : '#fff', background: isCurrent ? 'rgba(16, 185, 129, 0.2)' : 'transparent' }}>
                  {row.sfm} SFM
                </td>
                {MATRIX_COLUMNS.map(col => (
                  <td key={col.key} style={{ padding: '11px', fontFamily: 'var(--font-mono)', color: speedCutterDia === col.dia && isCurrent ? '#f4902c' : 'var(--text-secondary)', fontWeight: speedCutterDia === col.dia && isCurrent ? 800 : 400 }}>{row[col.key].toLocaleString()}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
