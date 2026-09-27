import React from 'react';
import { BEND_FORMULAS } from '../data/bendFormulas';
import type { SimInputs, SimResults } from '../types';
import { BendVectorSvg } from './BendVectorSvg';
import { FormulaCard } from './FormulaCard';
import { SimulatorControls } from './SimulatorControls';
import { SimulatorReadouts } from './SimulatorReadouts';

interface SimulatorTabProps {
  inputs: SimInputs;
  simCalc: SimResults;
  onChange: (key: keyof SimInputs, raw: string) => void;
}

/** TAB 4: INTERACTIVE LIVE BEND SIMULATOR & FORMULAS */
export const SimulatorTab: React.FC<SimulatorTabProps> = ({ inputs, simCalc, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {/* Interactive Workspace: Control Panel & Live Digital Dashboard right at the top! */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
      <SimulatorControls inputs={inputs} onChange={onChange} />
      <SimulatorReadouts simCalc={simCalc} />
    </div>

    <BendVectorSvg simCalc={simCalc} />

    {/* BOTTOM SECTION: THE 7 FORMULA EXPLANATIONS FROM IMAGE-1.PNG */}
    <div className="glass-panel" style={{ padding: '30px', borderTop: '3px solid #a855f7' }}>
      <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>📚</span> Authoritative Breakdown of the 7 Bending Formulas (image-1.png)
      </h4>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '25px', lineHeight: 1.6 }}>
        In precision sheet metal engineering, these 7 core geometric relationships govern the exact transition between flat raw stock and formed 3D parts.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {BEND_FORMULAS.map(f => <FormulaCard key={f.title} formula={f} />)}
      </div>
    </div>
  </div>
);
