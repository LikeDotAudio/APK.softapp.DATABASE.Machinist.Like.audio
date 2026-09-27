import React from 'react';
import { FACTORY_TABLE } from '../data/factoryTable';

interface ReductionTableTabProps {
  ratio: number;
  /** A row was clicked: load its ratio (as the row's number string) into the calculator. */
  onLoadRatio: (ratioVal: string) => void;
}

/** MAIN VIEW 4: FACTORY REDUCTION TABLE (Pages 31-33) */
export const ReductionTableTab: React.FC<ReductionTableTabProps> = ({ ratio, onLoadRatio }) => (
  <div className="glass-panel" style={{ padding: '35px', background: 'var(--bg-primary)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
      <div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          📊 Factory Reduction Table (Gorton Manual Pages 31-33)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Standard calibration distances from Graduation "2" for Lower Bar and Upper Bar. Click any row to load settings into calculator!
        </p>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700, background: 'rgba(244, 144, 44, 0.1)', padding: '6px 14px', borderRadius: '20px' }}>
        22 Standard Factory Ratios
      </div>
    </div>

    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.92rem' }}>
        <thead>
          <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
            <th style={{ padding: '14px', borderBottom: '2px solid var(--border-color)' }}>Reduction Ratio</th>
            <th style={{ padding: '14px', borderBottom: '2px solid var(--border-color)' }}>Lower Bar (Inches)</th>
            <th style={{ padding: '14px', borderBottom: '2px solid var(--border-color)' }}>Upper Bar (Inches)</th>
            <th style={{ padding: '14px', borderBottom: '2px solid var(--border-color)' }}>Lower Bar (mm)</th>
            <th style={{ padding: '14px', borderBottom: '2px solid var(--border-color)' }}>Upper Bar (mm)</th>
            <th style={{ padding: '14px', borderBottom: '2px solid var(--border-color)' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {FACTORY_TABLE.map((row, idx) => {
            const numVal = parseFloat(row.ratio.split(' ')[0]);
            const isCurrent = Math.abs(numVal - ratio) < 0.05;
            return (
              <tr 
                key={row.ratio}
                style={{ 
                  background: isCurrent ? 'rgba(244, 144, 44, 0.12)' : idx % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-tertiary)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => onLoadRatio(numVal.toString())}
              >
                <td style={{ padding: '12px', fontWeight: 700, color: isCurrent ? '#f4902c' : '#fff' }}>{row.ratio}</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{row.lowerInches.toFixed(3)}"</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: '#f59e0b' }}>{row.upperInches.toFixed(3)}"</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{row.lowerMm.toFixed(2)} mm</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{row.upperMm.toFixed(2)} mm</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: '0.75rem', background: 'var(--accent-cyan)', color: '#000', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                    Load Ratio ➔
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
