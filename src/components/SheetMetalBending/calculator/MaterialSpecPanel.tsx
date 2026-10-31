import React from 'react';
import { fmtInOrMm, toMm } from '../../../lib/units';
import { UNIQUE_MATERIALS } from '../data/bendingSpecs';
import type { BendInputs } from '../hooks/useBendInputs';

/** Step 1: material, gauge, custom override and the active-spec mini dashboard. */
export const MaterialSpecPanel: React.FC<{ b: BendInputs }> = ({ b }) => {
  const {
    isCustomSpec, selectedMaterial, setIsCustomSpec, handleMaterialChange, selectedSpecIdx, setSelectedSpecIdx,
    availableSpecs, unit, unitLabel, customThickness, setCustomThickness, customKFactor, setCustomKFactor,
    customRadius, setCustomRadius, activeParams,
  } = b;
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚙️</span> Step 1: Material & Specs
        </h3>
      </div>

      {/* Material Category Dropdown */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
          Sheet Material Type
        </label>
        <select
          value={isCustomSpec ? 'CUSTOM' : selectedMaterial}
          onChange={(e) => {
            if (e.target.value === 'CUSTOM') {
              setIsCustomSpec(true);
            } else {
              handleMaterialChange(e.target.value);
            }
          }}
          style={{ width: '100%', background: 'var(--bg-primary)', color: 'var(--accent)', border: '1px solid var(--border-color)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
        >
          {UNIQUE_MATERIALS.map(mat => (
            <option key={mat} value={mat}>{mat}</option>
          ))}
          <option value="CUSTOM">⚡ Custom Material / Manual Override...</option>
        </select>
      </div>

      {/* Thickness / Spec Selector */}
      {!isCustomSpec ? (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Material Thickness Gauge
          </label>
          <select
            value={selectedSpecIdx}
            onChange={(e) => setSelectedSpecIdx(parseInt(e.target.value) || 0)}
            style={{ width: '100%', background: 'var(--bg-primary)', color: '#fff', border: '1px solid var(--border-color)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.92rem', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            {availableSpecs.map((spec, idx) => (
              <option key={idx} value={idx}>
                {unit === 'in' 
                  ? `${spec.thicknessInches.toFixed(3)}" (${spec.thicknessMm}mm) — K: ${spec.kFactor} | Rad: ${spec.effectiveRadius90Inches}"`
                  : `${spec.thicknessMm.toFixed(2)} mm (${spec.thicknessInches.toFixed(3)}") — K: ${spec.kFactor} | Rad: ${toMm(spec.effectiveRadius90Inches).toFixed(2)}mm`
                }
              </option>
            ))}
          </select>
        </div>
      ) : (
        /* Custom Override Inputs */
        <div style={{ background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--accent)', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Thickness ({unitLabel})</label>
            <input
              type="number"
              step={unit === 'in' ? '0.005' : '0.1'}
              value={customThickness}
              onChange={(e) => setCustomThickness(e.target.value)}
              className="input-precision"
              style={{ fontSize: '0.85rem', padding: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>K-Factor (0.3 - 0.5)</label>
            <input
              type="number"
              step="0.01"
              min="0.1"
              max="0.9"
              value={customKFactor}
              onChange={(e) => setCustomKFactor(e.target.value)}
              className="input-precision"
              style={{ fontSize: '0.85rem', padding: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Radius ({unitLabel})</label>
            <input
              type="number"
              step={unit === 'in' ? '0.005' : '0.1'}
              value={customRadius}
              onChange={(e) => setCustomRadius(e.target.value)}
              className="input-precision"
              style={{ fontSize: '0.85rem', padding: '6px' }}
            />
          </div>
        </div>
      )}

      {/* Active Spec Mini Dashboard */}
      <div style={{ background: 'rgba(244, 144, 44, 0.05)', border: '1px solid rgba(244, 144, 44, 0.2)', borderRadius: '8px', padding: '12px 16px', marginBottom: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>K-Factor</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
            {activeParams.kFactor.toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Effective Radius</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
            {fmtInOrMm(activeParams.radius_in, unit === 'mm', 3, 2)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Min Flange @ 90°</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#00ff80', fontFamily: 'var(--font-mono)' }}>
            {fmtInOrMm(activeParams.minFlange_in, unit === 'mm', 3, 2)}
          </div>
        </div>
      </div>
    </>
  );
};
