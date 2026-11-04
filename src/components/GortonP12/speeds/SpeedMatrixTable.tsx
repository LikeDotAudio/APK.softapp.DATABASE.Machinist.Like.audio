import React from 'react';
import { MATRIX_COLUMNS, SPEED_MATRIX } from '../data/speedMatrix';
import { ApkTable } from '../../common/ApkTable';

interface SpeedMatrixTableProps {
  sfmNum: number;
  speedCutterDia: string;
}

/** Bottom Section: Official Page 34 Speed Matrix Table, the current SFM row and diameter lit. */
export const SpeedMatrixTable: React.FC<SpeedMatrixTableProps> = ({ sfmNum, speedCutterDia }) => {
  const isCurrent = (sfm: number) => sfmNum > 0 && Math.abs(sfm - sfmNum) < 15;
  return (
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

    <ApkTable
      id="machinist-gorton-speed-matrix"
      rows={SPEED_MATRIX}
      rowClass={(row) => (isCurrent(row.sfm) ? 'apk-row-current-green' : '')}
      columns={[
        { key: 'sfm', label: 'Surface Ft. / Min (SFM)', align: 'center', value: (row) => row.sfm,
          text: (row) => `${row.sfm} SFM`,
          style: (row) => ({ fontWeight: '800', color: isCurrent(row.sfm) ? '#10b981' : '#fff' }) },
        ...MATRIX_COLUMNS.map(col => ({
          key: col.key, label: col.header, align: 'center' as const, mono: true,
          value: (row: typeof SPEED_MATRIX[number]) => row[col.key],
          style: (row: typeof SPEED_MATRIX[number]) => (speedCutterDia === col.dia && isCurrent(row.sfm)
            ? { color: 'var(--accent)', fontWeight: '800' } : { color: 'var(--text-secondary)' }),
          text: (row: typeof SPEED_MATRIX[number]) => row[col.key].toLocaleString(),
        })),
      ]}
    />
  </div>
);
};
