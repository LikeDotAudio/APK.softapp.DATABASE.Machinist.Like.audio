import React from 'react';
import { fmtInOrMm } from '../../../lib/units';
import { SENDCUTSEND_BENDING_SPECS } from '../data/bendingSpecs';
import type { BendingSpec, LengthUnit } from '../types';

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

      <div style={{ overflowX: 'auto', maxHeight: '600px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)', borderBottom: '2px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
              <th style={{ padding: '12px 14px' }}>Material Alloy</th>
              <th style={{ padding: '12px 14px' }}>Thickness</th>
              <th style={{ padding: '12px 14px' }}>K-Factor</th>
              <th style={{ padding: '12px 14px' }}>Bend Deduction (90°)</th>
              <th style={{ padding: '12px 14px' }}>Effective Radius (90°)</th>
              <th style={{ padding: '12px 14px' }}>Die Width</th>
              <th style={{ padding: '12px 14px' }}>Min Flange @ 90°</th>
              <th style={{ padding: '12px 14px' }}>Min Corner Relief</th>
              <th style={{ padding: '12px 14px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {SENDCUTSEND_BENDING_SPECS.filter(s =>
              s.material.toLowerCase().includes(searchMaterial.toLowerCase()) ||
              s.thicknessInches.toString().includes(searchMaterial)
            ).map((spec, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 144, 44, 0.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent')}
              >
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-sans)' }}>{spec.material}</td>
                <td style={{ padding: '10px 14px', color: 'var(--accent)' }}>
                  {unit === 'in' ? `${spec.thicknessInches.toFixed(3)}"` : `${spec.thicknessMm} mm`}
                </td>
                <td style={{ padding: '10px 14px', color: '#f59e0b', fontWeight: 600 }}>{spec.kFactor}</td>
                <td style={{ padding: '10px 14px', color: '#00ff80' }}>
                  {fmtInOrMm(spec.bendDeduction90Inches, isMetric, 4, 3, '"', ' mm')}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  {fmtInOrMm(spec.effectiveRadius90Inches, isMetric, 3, 2, '"', ' mm')}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  {fmtInOrMm(spec.dieWidthInches, isMetric, 3, 2, '"', ' mm')}
                </td>
                <td style={{ padding: '10px 14px', color: '#fff' }}>
                  {fmtInOrMm(spec.minFlangeLength90Inches, isMetric, 3, 2, '"', ' mm')}
                </td>
                <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>
                  {fmtInOrMm(spec.minCornerReliefInches, isMetric, 3, 2, '"', ' mm')}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <button
                    type="button"
                    onClick={() => onUseSpec(spec)}
                    style={{
                      background: 'rgba(244, 144, 44, 0.15)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(244, 144, 44, 0.4)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Use Spec ➔
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
