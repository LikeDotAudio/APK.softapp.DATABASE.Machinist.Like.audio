import React from 'react';
import type { ActiveParams, BendResults, LengthUnit } from '../types';
import { FlatPatternStrip } from './FlatPatternStrip';
import { FormedProfile } from './FormedProfile';

interface DiagramTabProps {
  calculations: BendResults;
  activeParams: ActiveParams;
  unit: LengthUnit;
  unitLabel: string;
  bendAngle: number;
  baseLength: string;
  leftFlange: string;
  rightFlange: string;
  onBack: () => void;
}

/** TAB 2: VISUAL DIAGRAMS (FLAT PATTERN & 2D FORMED PROFILE) */
export const DiagramTab: React.FC<DiagramTabProps> = ({ calculations, activeParams, unit, unitLabel, bendAngle, baseLength, leftFlange, rightFlange, onBack }) => (
  <div className="glass-panel" style={{ padding: '30px', borderTop: '3px solid var(--accent)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        📐 Visual Flat Pattern Strip & Formed Profile Preview
      </h3>
      <button
        type="button"
        onClick={onBack}
        className="btn-secondary"
        style={{ padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer' }}
      >
        ← Back to Calculator Inputs
      </button>
    </div>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '25px' }}>
      Below is the scaled mathematical visualization of your sheet metal blank before and after press brake bending.
    </p>

    <FlatPatternStrip calculations={calculations} activeParams={activeParams} unitLabel={unitLabel} leftFlange={leftFlange} rightFlange={rightFlange} />

    <FormedProfile activeParams={activeParams} unit={unit} unitLabel={unitLabel} bendAngle={bendAngle} baseLength={baseLength} leftFlange={leftFlange} rightFlange={rightFlange} />
  </div>
);
