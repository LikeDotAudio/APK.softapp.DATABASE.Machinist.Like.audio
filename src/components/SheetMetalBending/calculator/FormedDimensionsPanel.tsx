import React from 'react';
import type { BendInputs } from '../hooks/useBendInputs';

/** Step 2: bend-angle slider, base/flange inputs and the quick presets. */
export const FormedDimensionsPanel: React.FC<{ b: BendInputs }> = ({ b }) => {
  const {
    unit, unitLabel, bendAngle, setBendAngle, baseLength, setBaseLength, leftFlange, setLeftFlange,
    rightFlange, setRightFlange, calculations,
  } = b;
  return (
    <>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📐</span> Step 2: Formed Dimensions (Outside)
      </h3>

      {/* Bend Angle Slider */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Bend Angle (Degrees)
          </label>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
            {bendAngle}°
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="170"
          step="1"
          value={bendAngle}
          onChange={(e) => setBendAngle(parseInt(e.target.value) || 90)}
          style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span onClick={() => setBendAngle(30)} style={{ cursor: 'pointer' }}>30° Acute</span>
          <span onClick={() => setBendAngle(45)} style={{ cursor: 'pointer' }}>45°</span>
          <span onClick={() => setBendAngle(90)} style={{ cursor: 'pointer', color: bendAngle === 90 ? 'var(--accent-cyan)' : 'inherit', fontWeight: bendAngle === 90 ? 700 : 400 }}>90° Right Angle</span>
          <span onClick={() => setBendAngle(120)} style={{ cursor: 'pointer' }}>120° Obtuse</span>
          <span onClick={() => setBendAngle(135)} style={{ cursor: 'pointer' }}>135°</span>
        </div>
      </div>

      {/* Geometry Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Base / Center Span Outside Length ({unitLabel})
          </label>
          <input
            type="number"
            step={unit === 'in' ? '0.125' : '1'}
            value={baseLength}
            onChange={(e) => setBaseLength(e.target.value)}
            className="input-precision"
            placeholder="e.g. 10.000"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Left Flange Length ({unitLabel})
            </label>
            <input
              type="number"
              step={unit === 'in' ? '0.125' : '1'}
              value={leftFlange}
              onChange={(e) => setLeftFlange(e.target.value)}
              className="input-precision"
              style={{ borderColor: calculations.isLeftFlangeTooShort ? '#ef4444' : 'var(--border-color)' }}
              placeholder="0 = No Flange"
            />
            {calculations.isLeftFlangeTooShort && (
              <div style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px', fontWeight: 600 }}>
                ⚠️ Below min ({calculations.minFlangeRequired.toFixed(3)} {unitLabel})
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Right Flange Length ({unitLabel})
            </label>
            <input
              type="number"
              step={unit === 'in' ? '0.125' : '1'}
              value={rightFlange}
              onChange={(e) => setRightFlange(e.target.value)}
              className="input-precision"
              style={{ borderColor: calculations.isRightFlangeTooShort ? '#ef4444' : 'var(--border-color)' }}
              placeholder="0 = No Flange"
            />
            {calculations.isRightFlangeTooShort && (
              <div style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px', fontWeight: 600 }}>
                ⚠️ Below min ({calculations.minFlangeRequired.toFixed(3)} {unitLabel})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Helper presets */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Quick Presets:</span>
        <button
          type="button"
          onClick={() => { setBaseLength(unit === 'in' ? '10.000' : '250.0'); setLeftFlange(unit === 'in' ? '4.000' : '100.0'); setRightFlange(unit === 'in' ? '4.000' : '100.0'); setBendAngle(90); }}
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
        >
          U-Channel (10" × 4" × 4")
        </button>
        <button
          type="button"
          onClick={() => { setBaseLength(unit === 'in' ? '6.000' : '150.0'); setLeftFlange(unit === 'in' ? '3.000' : '75.0'); setRightFlange('0'); setBendAngle(90); }}
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
        >
          L-Bracket (6" × 3")
        </button>
      </div>
    </>
  );
};
