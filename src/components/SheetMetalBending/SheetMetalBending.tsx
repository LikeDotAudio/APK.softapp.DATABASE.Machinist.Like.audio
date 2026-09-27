import React, { useState } from 'react';
import { ModuleTabBar } from '../common/ModuleTabBar';
import type { ModuleTab } from '../common/ModuleTabBar';
import { CalculatorTab } from './calculator/CalculatorTab';
import { DiagramTab } from './diagram/DiagramTab';
import { useBendInputs } from './hooks/useBendInputs';
import { useBendSimulator } from './hooks/useBendSimulator';
import { SimulatorTab } from './simulator/SimulatorTab';
import { SpecsTableTab } from './specs/SpecsTableTab';
import type { SheetTab } from './types';

export { SENDCUTSEND_BENDING_SPECS } from './data/bendingSpecs';
export type { BendingSpec } from './types';

const SHEET_TABS: ModuleTab<SheetTab>[] = [
  { id: 'calculator', icon: '🧮', label: 'Interactive Calculator' },
  { id: 'diagram', icon: '📐', label: 'Visual Flat Pattern & Profile' },
  { id: 'specs_table', icon: '📋', label: 'Material Bending Specs (10 Alloys)' },
  { id: 'simulator', icon: '🎮', label: 'Live Bend Simulator & Formulas' },
];

export const SheetMetalBending: React.FC = () => {
  const b = useBendInputs();
  const sim = useBendSimulator();

  // Active UI Tab
  const [activeTab, setActiveTab] = useState<SheetTab>('calculator');

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '90px', color: 'var(--text-primary)' }}>
      {activeTab === 'calculator' && (
        <CalculatorTab b={b} onShowDiagram={() => setActiveTab('diagram')} />
      )}

      {activeTab === 'diagram' && (
        <DiagramTab
          calculations={b.calculations}
          activeParams={b.activeParams}
          unit={b.unit}
          unitLabel={b.unitLabel}
          bendAngle={b.bendAngle}
          baseLength={b.baseLength}
          leftFlange={b.leftFlange}
          rightFlange={b.rightFlange}
          onBack={() => setActiveTab('calculator')}
        />
      )}

      {activeTab === 'specs_table' && (
        <SpecsTableTab
          unit={b.unit}
          searchMaterial={b.searchMaterial}
          onSearchChange={b.setSearchMaterial}
          onUseSpec={(spec) => {
            b.selectSpec(spec);
            setActiveTab('calculator');
          }}
        />
      )}

      {activeTab === 'simulator' && (
        <SimulatorTab inputs={sim.inputs} simCalc={sim.simCalc} onChange={sim.setSimInput} />
      )}

      {/* Sticky South Footer for Module Navigation */}
      <ModuleTabBar
        tabs={SHEET_TABS}
        active={activeTab}
        onSelect={setActiveTab}
        accent="var(--accent-cyan)"
        glow="rgba(56, 189, 248, 0.5)"
        border="rgba(56, 189, 248, 0.4)"
        padX={16}
      />
    </div>
  );
};
