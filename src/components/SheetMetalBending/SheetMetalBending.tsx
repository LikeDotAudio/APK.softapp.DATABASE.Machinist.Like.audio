import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useUnit } from '../../context/UnitContext';
import { SENDCUTSEND_BENDING_SPECS, UNIQUE_MATERIALS } from './data/bendingSpecs';
import { resolveActiveParams, solveFlatPattern, solveSimulator } from './bend.math';
import { DiagramTab } from './diagram/DiagramTab';
import { SpecsTableTab } from './specs/SpecsTableTab';
import { SimulatorTab } from './simulator/SimulatorTab';

export { SENDCUTSEND_BENDING_SPECS } from './data/bendingSpecs';
export type { BendingSpec } from './types';

export const SheetMetalBending: React.FC = () => {
  // Global Unit context
  const { unit: globalUnit } = useUnit();
  const unit: 'in' | 'mm' = globalUnit === 'imperial' ? 'in' : 'mm';
  const prevUnitRef = useRef<'in' | 'mm'>(unit);

  // Material and Spec selection
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Mild Steel');
  const [selectedSpecIdx, setSelectedSpecIdx] = useState<number>(5); // 0.119" Mild Steel default
  const [isCustomSpec, setIsCustomSpec] = useState<boolean>(false);

  // Custom spec state
  const [customThickness, setCustomThickness] = useState<string>('0.119');
  const [customKFactor, setCustomKFactor] = useState<string>('0.38');
  const [customRadius, setCustomRadius] = useState<string>('0.063');

  // Part Geometry Inputs (Outside Dimensions)
  const [baseLength, setBaseLength] = useState<string>('10.000');
  const [leftFlange, setLeftFlange] = useState<string>('4.000');
  const [rightFlange, setRightFlange] = useState<string>('4.000');
  const [bendAngle, setBendAngle] = useState<number>(90);

  // Active UI Tab
  const [activeTab, setActiveTab] = useState<'calculator' | 'diagram' | 'specs_table' | 'simulator'>('calculator');
  const [searchMaterial, setSearchMaterial] = useState<string>('');

  // Live Bend Simulator State
  const [simAngle, setSimAngle] = useState<number>(90);
  const [simRadius, setSimRadius] = useState<string>('0.125');
  const [simThickness, setSimThickness] = useState<string>('0.100');
  const [simKFactor, setSimKFactor] = useState<string>('0.42');
  const [simFlange1, setSimFlange1] = useState<string>('4.000');
  const [simFlange2, setSimFlange2] = useState<string>('4.000');

  // Simulator Math Engine (60 FPS Reactive Solvers)
  const simCalc = useMemo(
    () => solveSimulator({ simAngle, simRadius, simThickness, simKFactor, simFlange1, simFlange2 }),
    [simAngle, simRadius, simThickness, simKFactor, simFlange1, simFlange2],
  );

  useEffect(() => {
    if (prevUnitRef.current === unit) return;
    const oldUnit = prevUnitRef.current;
    prevUnitRef.current = unit;

    const bVal = parseFloat(baseLength) || 0;
    const lVal = parseFloat(leftFlange) || 0;
    const rVal = parseFloat(rightFlange) || 0;
    const ctVal = parseFloat(customThickness) || 0;
    const crVal = parseFloat(customRadius) || 0;

    if (unit === 'mm' && oldUnit === 'in') {
      setBaseLength((bVal * 25.4).toFixed(2));
      setLeftFlange((lVal * 25.4).toFixed(2));
      setRightFlange((rVal * 25.4).toFixed(2));
      setCustomThickness((ctVal * 25.4).toFixed(3));
      setCustomRadius((crVal * 25.4).toFixed(3));
    } else if (unit === 'in' && oldUnit === 'mm') {
      setBaseLength((bVal / 25.4).toFixed(3));
      setLeftFlange((lVal / 25.4).toFixed(3));
      setRightFlange((rVal / 25.4).toFixed(3));
      setCustomThickness((ctVal / 25.4).toFixed(3));
      setCustomRadius((crVal / 25.4).toFixed(3));
    }
  }, [unit]);

  // Filter specs for current material
  const availableSpecs = useMemo(() => {
    return SENDCUTSEND_BENDING_SPECS.filter(s => s.material === selectedMaterial);
  }, [selectedMaterial]);

  // Active Bending Parameters
  const activeParams = useMemo(
    () => resolveActiveParams({ isCustomSpec, availableSpecs, selectedSpecIdx, unit, customThickness, customRadius, customKFactor }),
    [isCustomSpec, availableSpecs, selectedSpecIdx, unit, customThickness, customRadius, customKFactor],
  );

  // Mathematical Bending Solver
  const calculations = useMemo(
    () => solveFlatPattern({ activeParams, bendAngle, baseLength, leftFlange, rightFlange, unit }),
    [activeParams, bendAngle, baseLength, leftFlange, rightFlange, unit],
  );

  // Handle Material switch
  const handleMaterialChange = (mat: string) => {
    setSelectedMaterial(mat);
    setIsCustomSpec(false);
    setSelectedSpecIdx(0);
  };

  const unitLabel = unit === 'in' ? 'in' : 'mm';

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '90px', color: 'var(--text-primary)' }}>
      {/* TAB 1: INTERACTIVE CALCULATOR */}
      {activeTab === 'calculator' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '25px' }}>
          
          {/* LEFT PANEL: INPUT PARAMETERS */}
          <div className="glass-panel" style={{ padding: '25px', borderTop: '3px solid var(--accent-cyan)' }}>
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
                style={{ width: '100%', background: 'var(--bg-primary)', color: 'var(--accent-cyan)', border: '1px solid var(--border-color)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
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
                        : `${spec.thicknessMm.toFixed(2)} mm (${spec.thicknessInches.toFixed(3)}") — K: ${spec.kFactor} | Rad: ${(spec.effectiveRadius90Inches * 25.4).toFixed(2)}mm`
                      }
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* Custom Override Inputs */
              <div style={{ background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--accent-cyan)', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
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
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {activeParams.kFactor.toFixed(2)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Effective Radius</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                  {unit === 'in' ? `${activeParams.radius_in.toFixed(3)}"` : `${(activeParams.radius_in * 25.4).toFixed(2)}mm`}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Min Flange @ 90°</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#00ff80', fontFamily: 'var(--font-mono)' }}>
                  {unit === 'in' ? `${activeParams.minFlange_in.toFixed(3)}"` : `${(activeParams.minFlange_in * 25.4).toFixed(2)}mm`}
                </div>
              </div>
            </div>

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
          </div>

          {/* RIGHT PANEL (Ordered Left): MATHEMATICAL RESULTS & FLAT PATTERN OUTPUT */}
          <div className="glass-panel" style={{ padding: '25px', borderTop: '3px solid #00ff80', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', order: -1 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎯</span> Step 3: Flat Pattern Cut Results
                </h3>
                <span style={{ fontSize: '0.75rem', background: 'rgba(0, 255, 128, 0.15)', color: '#00ff80', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                  {calculations.numBends} Bending Operation{calculations.numBends !== 1 ? 's' : ''}
                </span>
              </div>

              {/* HERO RESULT: TOTAL FLAT PATTERN LENGTH */}
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 255, 128, 0.12), rgba(244, 144, 44, 0.08))', 
                border: '2px solid rgba(0, 255, 128, 0.5)', 
                borderRadius: '12px', 
                padding: '24px', 
                textAlign: 'center',
                marginBottom: '20px',
                boxShadow: '0 0 25px rgba(0, 255, 128, 0.1)'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#00ff80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  Required Flat Pattern Cut Length
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
                  {calculations.flatLength.toFixed(3)} <span style={{ fontSize: '1.4rem', fontWeight: 500, color: 'var(--accent-cyan)' }}>{unitLabel}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Unbent blank size ready for laser or waterjet cutting before brake forming
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('diagram')}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(90deg, var(--accent-cyan), #00ff80)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '25px',
                  boxShadow: '0 4px 15px rgba(244, 144, 44, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <span>📐</span> View Interactive 2D Bending Diagrams & Animations →
              </button>

              {/* DETAILED FORMING PARAMETERS TABLE */}
              <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                  📊 Forming Metrology & Deduction Breakdown
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Bend Allowance (BA):</span>
                    <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{calculations.BA.toFixed(4)} {unitLabel}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Outside Setback (OSSB):</span>
                    <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{calculations.OSSB.toFixed(4)} {unitLabel}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', gridColumn: 'span 2', borderLeft: '3px solid #f59e0b' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Bend Deduction (per bend @ {bendAngle}°):</span>
                    <strong style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>{calculations.BD.toFixed(4)} {unitLabel}</strong>
                  </div>
                </div>
              </div>

              {/* BEND LINE LOCATIONS FROM OUTER EDGES */}
              {calculations.numBends > 0 && (
                <div style={{ background: 'rgba(244, 144, 44, 0.04)', borderRadius: '8px', border: '1px solid rgba(244, 144, 44, 0.3)', padding: '16px', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>📍</span> Press Brake Bend Line Layout (From Outer Edge)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: calculations.numBends === 2 ? '1fr 1fr' : '1fr', gap: '10px' }}>
                    {(parseFloat(leftFlange) > 0) && (
                      <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From Left Blank Edge ➔ Bend Line 1</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                          {calculations.leftBendLine.toFixed(3)} {unitLabel}
                        </div>
                      </div>
                    )}
                    {(parseFloat(rightFlange) > 0) && (
                      <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From Right Blank Edge ➔ Bend Line 2</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                          {calculations.rightBendLine.toFixed(3)} {unitLabel}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ESTIMATED INSIDE DIMENSIONS AFTER BENDING */}
              <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '14px', fontSize: '0.85rem' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  ℹ️ Estimated Inside Dimensions After Bending (assuming standard thickness clearance)
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  <span>Base Inside: <strong style={{ color: '#fff' }}>{calculations.insideBase.toFixed(3)} {unitLabel}</strong></span>
                  {(parseFloat(leftFlange) > 0) && <span>Left Inside: <strong style={{ color: '#fff' }}>{calculations.insideLeft.toFixed(3)} {unitLabel}</strong></span>}
                  {(parseFloat(rightFlange) > 0) && <span>Right Inside: <strong style={{ color: '#fff' }}>{calculations.insideRight.toFixed(3)} {unitLabel}</strong></span>}
                </div>
              </div>
            </div>

            {/* Quick Copy to Clipboard Button */}
            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => {
                  const summary = `PRECISION BENDING REPORT (${activeParams.specName})\n` +
                    `Flat Pattern Length: ${calculations.flatLength.toFixed(3)} ${unitLabel}\n` +
                    `Bend Deduction (BD): ${calculations.BD.toFixed(4)} ${unitLabel}\n` +
                    `Bend Allowance (BA): ${calculations.BA.toFixed(4)} ${unitLabel}\n` +
                    `Left Bend Line: ${calculations.leftBendLine.toFixed(3)} ${unitLabel} from edge\n` +
                    `Right Bend Line: ${calculations.rightBendLine.toFixed(3)} ${unitLabel} from edge`;
                  navigator.clipboard.writeText(summary);
                  alert('Bending summary copied to clipboard!');
                }}
                className="btn-precision"
                style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
              >
                📋 Copy Bending Report to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'diagram' && (
        <DiagramTab
          calculations={calculations}
          activeParams={activeParams}
          unit={unit}
          unitLabel={unitLabel}
          bendAngle={bendAngle}
          baseLength={baseLength}
          leftFlange={leftFlange}
          rightFlange={rightFlange}
          onBack={() => setActiveTab('calculator')}
        />
      )}

      {activeTab === 'specs_table' && (
        <SpecsTableTab
          unit={unit}
          searchMaterial={searchMaterial}
          onSearchChange={setSearchMaterial}
          onUseSpec={(spec) => {
            setSelectedMaterial(spec.material);
            setIsCustomSpec(false);
            const matSpecs = SENDCUTSEND_BENDING_SPECS.filter(s => s.material === spec.material);
            const subIdx = matSpecs.findIndex(s => s.thicknessInches === spec.thicknessInches);
            if (subIdx >= 0) setSelectedSpecIdx(subIdx);
            setActiveTab('calculator');
          }}
        />
      )}

      {activeTab === 'simulator' && (
        <SimulatorTab
          inputs={{ simAngle, simRadius, simThickness, simKFactor, simFlange1, simFlange2 }}
          simCalc={simCalc}
          onChange={(key, raw) => {
            if (key === 'simAngle') setSimAngle(parseInt(raw) || 90);
            else if (key === 'simRadius') setSimRadius(raw);
            else if (key === 'simThickness') setSimThickness(raw);
            else if (key === 'simKFactor') setSimKFactor(raw);
            else if (key === 'simFlange1') setSimFlange1(raw);
            else setSimFlange2(raw);
          }}
        />
      )}

      {/* Sticky South Footer for Module Navigation */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(10, 13, 20, 0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '2px solid rgba(56, 189, 248, 0.4)',
        boxShadow: '0 -6px 25px rgba(0, 0, 0, 0.7)',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        zIndex: 1000
      }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '5px' }}>MODULE TOPICS:</span>
        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          style={{
            background: activeTab === 'calculator' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'calculator' ? '#000' : 'var(--text-secondary)',
            border: activeTab === 'calculator' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
            padding: '7px 16px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'calculator' ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none'
          }}
        >
          <span>🧮</span> Interactive Calculator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('diagram')}
          style={{
            background: activeTab === 'diagram' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'diagram' ? '#000' : 'var(--text-secondary)',
            border: activeTab === 'diagram' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
            padding: '7px 16px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'diagram' ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none'
          }}
        >
          <span>📐</span> Visual Flat Pattern & Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('specs_table')}
          style={{
            background: activeTab === 'specs_table' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'specs_table' ? '#000' : 'var(--text-secondary)',
            border: activeTab === 'specs_table' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
            padding: '7px 16px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'specs_table' ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none'
          }}
        >
          <span>📋</span> Material Bending Specs (10 Alloys)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('simulator')}
          style={{
            background: activeTab === 'simulator' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'simulator' ? '#000' : 'var(--text-secondary)',
            border: activeTab === 'simulator' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
            padding: '7px 16px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'simulator' ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none'
          }}
        >
          <span>🎮</span> Live Bend Simulator & Formulas
        </button>
      </footer>
    </div>
  );
};
