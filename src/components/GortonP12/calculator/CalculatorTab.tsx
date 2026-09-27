import React from 'react';
import type { UnitType } from '../../../context/UnitContext';
import { pantographGeometry, solveBarSettings } from '../gorton.math';
import type { ReductionInputs } from '../hooks/useReductionInputs';
import { BarSettingCards } from './BarSettingCards';
import { PantographLinkageSvg } from './PantographLinkageSvg';
import { RatioInputsPanel } from './RatioInputsPanel';

interface CalculatorTabProps {
  r: ReductionInputs;
  unit: UnitType;
}

/** MAIN VIEW 1: BAR SETTING CALCULATOR */
export const CalculatorTab: React.FC<CalculatorTabProps> = ({ r, unit }) => {
  const bars = solveBarSettings(r.ratio, r.rangeMode);
  const geo = pantographGeometry(r.ratio);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '30px', alignItems: 'start' }}>

      {/* Left Column: Reduction Ratio & Parameters */}
      <RatioInputsPanel r={r} unit={unit} />

      {/* Right Column (Ordered Left): Exact Bar Setting Results & Kinematic Visualizer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', order: -1 }}>
        <BarSettingCards ratio={r.ratio} unit={unit} bars={bars} />

        {/* KINEMATIC PANTOGRAPH LINKAGE VISUALIZER (TOP-LEFT PRIORITY) */}
        <PantographLinkageSvg ratio={r.ratio} geo={geo} />
      </div>

    </div>
  );
};
