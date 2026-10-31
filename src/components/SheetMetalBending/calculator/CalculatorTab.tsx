import React from 'react';
import type { BendInputs } from '../hooks/useBendInputs';
import { FlatPatternResults } from './FlatPatternResults';
import { FormedDimensionsPanel } from './FormedDimensionsPanel';
import { MaterialSpecPanel } from './MaterialSpecPanel';

interface CalculatorTabProps {
  b: BendInputs;
  onShowDiagram: () => void;
}

/** TAB 1: INTERACTIVE CALCULATOR — inputs on one side, results (ordered first) on the other. */
export const CalculatorTab: React.FC<CalculatorTabProps> = ({ b, onShowDiagram }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '25px' }}>

    {/* LEFT PANEL: INPUT PARAMETERS */}
    <div className="glass-panel" style={{ padding: '25px', borderTop: '3px solid var(--accent)' }}>
      <MaterialSpecPanel b={b} />

      <FormedDimensionsPanel b={b} />
    </div>

    {/* RIGHT PANEL (Ordered Left): MATHEMATICAL RESULTS & FLAT PATTERN OUTPUT */}
    <FlatPatternResults b={b} onShowDiagram={onShowDiagram} />
  </div>
);
