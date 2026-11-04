import React from 'react';
import { FACTORY_TABLE } from '../data/factoryTable';
import { ApkTable, h } from '../../common/ApkTable';

const ratioOf = (label: string) => parseFloat(label.split(' ')[0]);

interface ReductionTableTabProps {
  ratio: number;
  /** A row was clicked: load its ratio (as the row's number string) into the calculator. */
  onLoadRatio: (ratioVal: string) => void;
}

/** MAIN VIEW 4: FACTORY REDUCTION TABLE (Pages 31-33) */
export const ReductionTableTab: React.FC<ReductionTableTabProps> = ({ ratio, onLoadRatio }) => {
  const isCurrent = (label: string) => Math.abs(ratioOf(label) - ratio) < 0.05;
  return (
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
      <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700, background: 'rgba(var(--apk-accent-rgb), 0.1)', padding: '6px 14px', borderRadius: '20px' }}>
        22 Standard Factory Ratios
      </div>
    </div>

    <ApkTable
      id="machinist-gorton-reduction"
      rows={FACTORY_TABLE}
      rowClass={(row) => (isCurrent(row.ratio) ? 'apk-row-current' : '')}
      onRowClick={(row) => onLoadRatio(ratioOf(row.ratio).toString())}
      columns={[
        { key: 'ratio', label: 'Reduction Ratio', align: 'center', style: (row) => ({ fontWeight: '700', color: isCurrent(row.ratio) ? 'var(--accent)' : '#fff' }) },
        { key: 'lowerInches', label: 'Lower Bar (Inches)', align: 'center', mono: true, text: (row) => `${row.lowerInches.toFixed(3)}"`, style: () => ({ color: '#38bdf8' }) },
        { key: 'upperInches', label: 'Upper Bar (Inches)', align: 'center', mono: true, text: (row) => `${row.upperInches.toFixed(3)}"`, style: () => ({ color: '#f59e0b' }) },
        { key: 'lowerMm', label: 'Lower Bar (mm)', align: 'center', mono: true, text: (row) => `${row.lowerMm.toFixed(2)} mm`, style: () => ({ color: 'var(--text-secondary)' }) },
        { key: 'upperMm', label: 'Upper Bar (mm)', align: 'center', mono: true, text: (row) => `${row.upperMm.toFixed(2)} mm`, style: () => ({ color: 'var(--text-secondary)' }) },
        { key: 'action', label: 'Action', align: 'center', value: () => '',
          node: () => h('span', { fontSize: '0.75rem', background: 'var(--accent)', color: '#000', padding: '3px 10px', borderRadius: '12px', fontWeight: '700' }, 'Load Ratio ➔') },
      ]}
    />
  </div>
);
};
