import React from 'react';
import { useUnit } from '../../../context/UnitContext';
import { ROBERTSON_SIZES } from '../data/sizeCharts';

/** Robertson square recess dimension table with driver color codes. The range in the
 *  app-wide UnitContext's unit comes first and bright; the other follows, muted. */
export const RobertsonTable: React.FC = () => {
  const { unit } = useUnit();
  const ranges: [string, 'rangeIn' | 'rangeMm'][] = unit === 'imperial'
    ? [['Range (in)', 'rangeIn'], ['Range (mm)', 'rangeMm']]
    : [['Range (mm)', 'rangeMm'], ['Range (in)', 'rangeIn']];
  return (
  <div style={{ background: 'rgba(22, 163, 74, 0.05)', border: '1px solid rgba(22, 163, 74, 0.3)', padding: '12px 14px', borderRadius: '8px' }}>
    <div style={{ fontSize: '0.72rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
      SQUARE RECESS DIMENSIONS & DRIVER COLOR CODE
    </div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>
        <thead>
          <tr style={{ color: 'var(--text-muted)', textAlign: 'left' }}>
            <th style={{ padding: '4px 8px' }}>Color</th>
            <th style={{ padding: '4px 8px' }}>No</th>
            <th style={{ padding: '4px 8px' }}>Screw Sizes</th>
            <th style={{ padding: '4px 8px' }}>Fraction</th>
            {ranges.map(([label]) => <th key={label} style={{ padding: '4px 8px' }}>{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {ROBERTSON_SIZES.map(r => (
            <tr key={r.no} style={{ borderTop: '1px solid var(--border-color)' }}>
              <td style={{ padding: '5px 8px', whiteSpace: 'nowrap' }}>
                <span style={{ display: 'inline-block', width: '11px', height: '11px', borderRadius: '2px', background: r.swatch, border: '1px solid rgba(255,255,255,0.35)', marginRight: '6px', verticalAlign: 'middle' }} />
                <span style={{ color: '#fff' }}>{r.color}</span>
              </td>
              <td style={{ padding: '5px 8px', color: '#16a34a', fontWeight: 700 }}>{r.no}</td>
              <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{r.screws}</td>
              <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{r.fraction}</td>
              {ranges.map(([, key], i) => (
                <td key={key} style={{ padding: '5px 8px', color: i === 0 ? '#fff' : 'var(--text-secondary)' }}>{r[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};
