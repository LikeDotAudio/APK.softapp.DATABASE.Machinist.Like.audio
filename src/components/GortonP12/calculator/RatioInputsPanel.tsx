import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import type { ReductionInputs } from '../hooks/useReductionInputs';
import { SegmentedButtons } from '../SegmentedButtons';
import type { SegmentOption } from '../SegmentedButtons';
import type { CalcTarget } from '../types';

const CALC_TARGETS: SegmentOption<CalcTarget>[] = [
  { id: 'ratio', label: 'Ratio (R)' },
  { id: 'work', label: 'Work Size' },
  { id: 'copy', label: 'Master Copy' },
];

interface RatioInputsPanelProps {
  r: ReductionInputs;
  unit: UnitType;
}

/** Left Column: Reduction Ratio & Parameters — range, calc target, ratio/copy/work, roll mode. */
export const RatioInputsPanel: React.FC<RatioInputsPanelProps> = ({ r, unit }) => {
  const {
    rangeMode, selectRange, calcTarget, setCalcTarget, ratioVal, copyLength, workLength, handleDimensionChange,
    isRollMode, setIsRollMode, rollDia, setRollDia, masterRollLength,
  } = r;
  return (
    <div className="glass-panel" style={{ padding: '30px', borderTop: '3px solid #f59e0b' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📐 Pantograph Bar Ratio Settings</span>
        </h3>
      </div>

      {/* Range Mode Switcher (Page 29 vs Page 30) */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Reduction Range Standard Formula
        </label>
        <SegmentedButtons
          options={[
            { id: 'standard', label: 'Standard (2:1 to 40:1)', color: '#f59e0b', tint: 'rgba(245, 158, 11, 0.15)' },
            { id: 'low_ratio', label: 'Low Ratio (1:1 to 2:1)', color: '#38bdf8', tint: 'rgba(56, 189, 248, 0.15)' },
          ]}
          value={rangeMode}
          onChange={selectRange}
          containerStyle={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
          variant="outlined"
          pad="10px"
          radius="6px"
          fontSize="0.85rem"
        />
      </div>

      {/* Target Calculator Selector */}
      <div style={{ marginBottom: '20px', background: 'var(--bg-secondary)', padding: '15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          🔄 Select Variable To Calculate:
        </label>
        <SegmentedButtons
          options={CALC_TARGETS}
          value={calcTarget}
          onChange={setCalcTarget}
          containerStyle={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}
          variant="filled"
          activeColor="var(--accent)"
          pad="8px"
          radius="4px"
          fontSize="0.8rem"
        />
      </div>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
        
        {/* Reduction Ratio Input */}
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600, fontSize: '0.85rem', color: calcTarget === 'ratio' ? 'var(--accent)' : 'var(--text-secondary)', textTransform: 'uppercase' }}>
            <span>Reduction Ratio (e.g. 5 for 5:1)</span>
            {calcTarget === 'ratio' && <span style={{ color: 'var(--accent)', fontWeight: 800 }}>[ CALCULATED ]</span>}
          </label>
          <input
            type="number"
            value={ratioVal}
            step="0.1"
            min={rangeMode === 'standard' ? 2.0 : 1.0}
            max={rangeMode === 'standard' ? 40.0 : 2.0}
            disabled={calcTarget === 'ratio'}
            onChange={(e) => handleDimensionChange('ratio', e.target.value)}
            className="input-precision"
            style={{ 
              fontWeight: 700, 
              fontSize: '1.2rem', 
              color: calcTarget === 'ratio' ? 'var(--accent)' : '#fff',
              background: calcTarget === 'ratio' ? 'rgba(var(--apk-accent-rgb), 0.08)' : 'var(--bg-tertiary)',
              borderColor: calcTarget === 'ratio' ? 'var(--accent)' : 'var(--border-color)'
            }}
          />
        </div>

        {/* Master Copy Length */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600, fontSize: '0.8rem', color: calcTarget === 'copy' ? 'var(--accent)' : 'var(--text-secondary)', textTransform: 'uppercase' }}>
              <span>Master Copy Length</span>
              {calcTarget === 'copy' && <span style={{ color: 'var(--accent)', fontWeight: 800 }}>[ CALC ]</span>}
            </label>
            <input
              type="number"
              value={copyLength}
              step="0.1"
              disabled={calcTarget === 'copy'}
              onChange={(e) => handleDimensionChange('copy', e.target.value)}
              className="input-precision"
              style={{ 
                fontWeight: 700, 
                color: calcTarget === 'copy' ? 'var(--accent)' : '#fff',
                background: calcTarget === 'copy' ? 'rgba(var(--apk-accent-rgb), 0.08)' : 'var(--bg-tertiary)'
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
              Template / Brass Type Size
            </span>
          </div>

          {/* Finished Workpiece Length */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600, fontSize: '0.8rem', color: calcTarget === 'work' ? 'var(--accent)' : 'var(--text-secondary)', textTransform: 'uppercase' }}>
              <span>Finished Work Size</span>
              {calcTarget === 'work' && <span style={{ color: 'var(--accent)', fontWeight: 800 }}>[ CALC ]</span>}
            </label>
            <input
              type="number"
              value={workLength}
              step="0.05"
              disabled={calcTarget === 'work'}
              onChange={(e) => handleDimensionChange('work', e.target.value)}
              className="input-precision"
              style={{ 
                fontWeight: 700, 
                color: calcTarget === 'work' ? 'var(--accent)' : '#fff',
                background: calcTarget === 'work' ? 'rgba(var(--apk-accent-rgb), 0.08)' : 'var(--bg-tertiary)'
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
              Engraved Cut Dimension
            </span>
          </div>
        </div>

      </div>

      {/* Roll Attachment Checkbox Preview */}
      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          <input
            type="checkbox"
            checked={isRollMode}
            onChange={(e) => setIsRollMode(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#f59e0b' }}
          />
          <span>⭕ Model 727 Roll Attachment Circumference Mode</span>
        </label>
        {isRollMode && (
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Cylinder / Roll Diameter ({unit === 'imperial' ? 'in' : 'mm'}):
              </label>
              <input
                type="number"
                value={rollDia}
                step="0.1"
                onChange={(e) => setRollDia(e.target.value)}
                className="input-precision"
                style={{ padding: '6px 10px', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Required Master Length:</span>
              <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#f59e0b' }}>
                {masterRollLength.toFixed(3)} {unit === 'imperial' ? 'in' : 'mm'}
              </strong>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
