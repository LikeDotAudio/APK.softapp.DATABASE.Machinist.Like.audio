import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import { MATERIALS } from '../data/materials';
import type { CutInputState } from '../hooks/useCutInputs';
import type { SpeedsTab } from '../types';
import { LabeledInput } from './LabeledInput';

interface CutParametersPanelProps {
  c: CutInputState;
  unit: UnitType;
  activeTab: SpeedsTab;
  radialStepoverPercent: number;
  doc: number;
  dia: number;
}

/** 2. VARIABLES: Cutter & Workpiece Parameters — material preset and the four input rows. */
export const CutParametersPanel: React.FC<CutParametersPanelProps> = ({ c, unit, activeTab, radialStepoverPercent, doc, dia }) => {
  const { inputs, selectedMat, isCustom, setIsCustom, handleMaterialChange } = c;
  const imperial = unit === 'imperial';
  const hem = activeTab === 'chip_thinning';
  const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' };
  return (
    <div className="glass-panel" style={{ padding: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <span>⚙️ VARIABLES // Cutter & Workpiece Parameters</span>
        </h3>
        {isCustom && (
          <span style={{ fontSize: '0.75rem', background: 'rgba(234, 179, 8, 0.15)', color: '#facc15', padding: '3px 8px', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.4)', fontWeight: 600 }}>
            Custom Overrides Active
          </span>
        )}
      </div>

      {/* Workpiece Material Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Workpiece Material Preset (Carbide Tooling Baseline)
        </label>
        <select
          value={selectedMat}
          onChange={(e) => handleMaterialChange(parseInt(e.target.value))}
          className="input-precision"
          style={{ cursor: 'pointer', background: 'var(--bg-tertiary)', fontWeight: 600, fontSize: '0.95rem' }}
        >
          {MATERIALS.map((m, idx) => (
            <option key={m.name} value={idx}>
              {m.name} — [{m.hardness}] ({imperial ? `${m.sfm} SFM` : `${m.vc} M/Min`})
            </option>
          ))}
        </select>
      </div>

      {/* Cutter Geometry Inputs */}
      <div style={row}>
        <LabeledInput
          label={`Cutter Diameter (${imperial ? 'in' : 'mm'})`}
          value={inputs.toolDia}
          step={imperial ? '0.0625' : '1'}
          onChange={c.setToolDia}
          inputStyle={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent)' }}
        />
        <LabeledInput
          label="Flutes / Teeth Count"
          value={inputs.flutes}
          min={1}
          max={20}
          onChange={(v) => c.setFlutes(parseInt(v) || 1)}
          inputStyle={{ fontWeight: 700, fontSize: '1.05rem' }}
        />
      </div>

      {/* Cutting Speed & Feed Per Tooth */}
      <div style={row}>
        <LabeledInput
          label={`Surface Velocity (${imperial ? 'SFM' : 'M/Min'})`}
          value={inputs.customSpeed}
          onChange={(v) => { c.setCustomSpeed(v); setIsCustom(true); }}
          inputStyle={{ borderColor: isCustom ? 'var(--accent)' : 'var(--border-color)', fontWeight: 700 }}
        />
        <LabeledInput
          label={hem ? `Target Chip Load (${imperial ? 'IPT' : 'fz'})` : `Feed / Tooth (${imperial ? 'IPT' : 'fz'})`}
          value={hem ? inputs.targetCpt : inputs.customFeed}
          step={imperial ? '0.0005' : '0.01'}
          onChange={(v) => {
            if (hem) {
              c.setTargetCpt(v);
            } else {
              c.setCustomFeed(v);
            }
            setIsCustom(true);
          }}
          inputStyle={{ borderColor: isCustom ? '#a855f7' : 'var(--border-color)', fontWeight: 700 }}
        />
      </div>

      {/* Radial Stepover (WOC) & Axial Depth (DOC) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', background: hem ? 'rgba(168, 85, 247, 0.08)' : 'transparent', padding: hem ? '12px' : '0', borderRadius: 'var(--radius-sm)', border: hem ? '1px solid rgba(168, 85, 247, 0.3)' : 'none', transition: 'all 0.3s ease' }}>
        <LabeledInput
          label="Radial Stepover (Ae / WOC)"
          labelColor={hem ? '#c084fc' : 'var(--text-secondary)'}
          value={inputs.widthOfCut}
          step={imperial ? '0.05' : '1'}
          onChange={c.setWidthOfCut}
          inputStyle={{ borderColor: hem ? '#c084fc' : 'var(--border-color)', fontWeight: 700 }}
          hint={<>{radialStepoverPercent.toFixed(1)}% of Cutter Diameter</>}
        />
        <LabeledInput
          label="Axial Depth (Ap / DOC)"
          value={inputs.depthOfCut}
          step={imperial ? '0.05' : '1'}
          onChange={c.setDepthOfCut}
          inputStyle={{ fontWeight: 700 }}
          hint={<>{(doc / dia).toFixed(2)}x Dia Depth Ratio</>}
        />
      </div>

      {/* Cut Length & Tool Corner Radius */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <LabeledInput
          label={`Cut Length (${imperial ? 'in' : 'mm'}) — Time Est.`}
          value={inputs.cutLength}
          step={imperial ? '1.0' : '25'}
          onChange={c.setCutLength}
          inputStyle={{ fontWeight: 700 }}
        />
        <LabeledInput
          label={`Corner Radius (${imperial ? 'in' : 'mm'}) — Ra Finish`}
          value={inputs.cornerRad}
          step={imperial ? '0.015' : '0.4'}
          onChange={c.setCornerRad}
          inputStyle={{ fontWeight: 700, color: '#f59e0b' }}
        />
      </div>

    </div>
  );
};
