import React from 'react';
import { CutterDiameterPicker } from './CutterDiameterPicker';
import { MaterialToolPicker } from './MaterialToolPicker';
import { SpeedMatrixTable } from './SpeedMatrixTable';
import { SpindleTelemetryCard } from './SpindleTelemetryCard';

type SpeedsMaterialsTabProps =
  React.ComponentProps<typeof MaterialToolPicker> &
  React.ComponentProps<typeof CutterDiameterPicker> &
  React.ComponentProps<typeof SpindleTelemetryCard> &
  React.ComponentProps<typeof SpeedMatrixTable>;

/** MAIN VIEW 3: SPEEDS & CUTTING MATERIALS CHART (Pages 34-35) */
export const SpeedsMaterialsTab: React.FC<SpeedsMaterialsTabProps> = (p) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

    {/* Top Section: Interactive Speeds & Coolant Calculator */}
    <div className="glass-panel" style={{ padding: '35px', borderTop: '3px solid #10b981' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            OFFICIAL GORTON CUTTING CHART (PAGES 34 & 35)
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>
            ⚡ Interactive Spindle Speed & Material Cutting Engine
          </h3>
        </div>
        <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.12)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          17 Factory Material Presets
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', alignItems: 'start' }}>
        <MaterialToolPicker
          selectedMatIdx={p.selectedMatIdx}
          setSelectedMatIdx={p.setSelectedMatIdx}
          toolMat={p.toolMat}
          setToolMat={p.setToolMat}
          cutMode={p.cutMode}
          setCutMode={p.setCutMode}
        />
        <CutterDiameterPicker speedCutterDia={p.speedCutterDia} setSpeedCutterDia={p.setSpeedCutterDia} />
        <SpindleTelemetryCard calculatedRpm={p.calculatedRpm} sfmRaw={p.sfmRaw} coolantRec={p.coolantRec} />
      </div>
    </div>

    <SpeedMatrixTable sfmNum={p.sfmNum} speedCutterDia={p.speedCutterDia} />
  </div>
);
