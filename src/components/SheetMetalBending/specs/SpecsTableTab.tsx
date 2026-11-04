import React from 'react';
import { fmtInOrMm } from '../../../lib/units';
import { SENDCUTSEND_BENDING_SPECS } from '../data/bendingSpecs';
import type { BendingSpec, LengthUnit } from '../types';
import { ApkTable, h } from '../../common/ApkTable';

interface SpecsTableTabProps {
  unit: LengthUnit;
  searchMaterial: string;
  onSearchChange: (value: string) => void;
  /** "Use Spec ➔": load this row into the calculator. */
  onUseSpec: (spec: BendingSpec) => void;
}

/** TAB 3: MATERIAL BENDING SPECS DATABASE */
export const SpecsTableTab: React.FC<SpecsTableTabProps> = ({ unit, searchMaterial, onSearchChange, onUseSpec }) => {
  const isMetric = unit !== 'in';
  return (
    <div className="glass-panel" style={{ padding: '30px', borderTop: '3px solid #f59e0b' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            📋 Industrial Sheet Metal & Plastic Bending Specifications
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Complete lookup table of K-Factors, Bend Deductions, Effective Radii, and Die Widths for precision press brake tooling.
          </p>
        </div>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="🔍 Search alloy (e.g. Aluminum, Chromoly, Stainless)..."
          value={searchMaterial}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-precision"
          style={{ width: '300px', fontSize: '0.85rem' }}
        />
      </div>

      <ApkTable
        id="machinist-bending-specs"
        style={{ maxHeight: '600px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
        rows={SENDCUTSEND_BENDING_SPECS.filter(s =>
          s.material.toLowerCase().includes(searchMaterial.toLowerCase()) ||
          s.thicknessInches.toString().includes(searchMaterial)
        )}
        columns={[
          { key: 'material', label: 'Material Alloy', style: () => ({ fontWeight: '700', color: '#fff', fontFamily: 'var(--font-sans)' }) },
          { key: 'thickness', label: 'Thickness', value: (spec) => spec.thicknessInches,
            text: (spec) => (unit === 'in' ? `${spec.thicknessInches.toFixed(3)}"` : `${spec.thicknessMm} mm`), style: () => ({ color: 'var(--accent)' }) },
          { key: 'kFactor', label: 'K-Factor', style: () => ({ color: '#f59e0b', fontWeight: '600' }) },
          { key: 'bd', label: 'Bend Deduction (90°)', value: (spec) => spec.bendDeduction90Inches,
            text: (spec) => fmtInOrMm(spec.bendDeduction90Inches, isMetric, 4, 3, '"', ' mm'), style: () => ({ color: '#00ff80' }) },
          { key: 'er', label: 'Effective Radius (90°)', value: (spec) => spec.effectiveRadius90Inches,
            text: (spec) => fmtInOrMm(spec.effectiveRadius90Inches, isMetric, 3, 2, '"', ' mm') },
          { key: 'die', label: 'Die Width', value: (spec) => spec.dieWidthInches,
            text: (spec) => fmtInOrMm(spec.dieWidthInches, isMetric, 3, 2, '"', ' mm') },
          { key: 'flange', label: 'Min Flange @ 90°', value: (spec) => spec.minFlangeLength90Inches,
            text: (spec) => fmtInOrMm(spec.minFlangeLength90Inches, isMetric, 3, 2, '"', ' mm'), style: () => ({ color: '#fff' }) },
          { key: 'relief', label: 'Min Corner Relief', value: (spec) => spec.minCornerReliefInches,
            text: (spec) => fmtInOrMm(spec.minCornerReliefInches, isMetric, 3, 2, '"', ' mm'), style: () => ({ color: 'var(--text-muted)' }) },
          { key: 'action', label: 'Action', value: () => '', node: (spec) => {
            const b = h('button', { background: 'rgba(var(--apk-accent-rgb), 0.15)', color: 'var(--accent)', border: '1px solid rgba(var(--apk-accent-rgb), 0.4)',
              padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: '600' }, 'Use Spec ➔') as HTMLButtonElement;
            b.type = 'button';
            b.onclick = () => onUseSpec(spec);
            return b;
          } },
        ]}
      />
    </div>
  );
};
