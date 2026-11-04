import React from 'react';
import { useUnit } from '../../../context/UnitContext';
import { ROBERTSON_SIZES } from '../data/sizeCharts';
import { ApkTable, h } from '../../common/ApkTable';

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
    <ApkTable
      id="machinist-robertson-sizes"
      rows={ROBERTSON_SIZES}
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}
      columns={[
        { key: 'color', label: 'Color', node: (r) => {
          const box = h('span', { whiteSpace: 'nowrap' });
          box.appendChild(h('span', { display: 'inline-block', width: '11px', height: '11px', borderRadius: '2px', background: r.swatch, border: '1px solid rgba(255,255,255,0.35)', marginRight: '6px', verticalAlign: 'middle' }));
          box.appendChild(h('span', { color: '#fff' }, r.color));
          return box;
        } },
        { key: 'no', label: 'No', style: () => ({ color: '#16a34a', fontWeight: '700' }) },
        { key: 'screws', label: 'Screw Sizes', style: () => ({ color: 'var(--text-secondary)' }) },
        { key: 'fraction', label: 'Fraction', style: () => ({ color: 'var(--text-secondary)' }) },
        ...ranges.map(([label, key], i) => ({ key, label, style: () => ({ color: i === 0 ? '#fff' : 'var(--text-secondary)' }) })),
      ]}
    />
  </div>
);
};
