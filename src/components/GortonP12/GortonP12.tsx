import React, { useState } from 'react';
import { useUnit } from '../../context/UnitContext';
import { ModuleTabBar } from '../common/ModuleTabBar';
import type { ModuleTab } from '../common/ModuleTabBar';
import { ToolFooterNote } from '../common/ToolFooterNote';
import { ToolHeader } from '../common/ToolHeader';
import { CalculatorTab } from './calculator/CalculatorTab';
import { ManualGuideTab } from './guide/ManualGuideTab';
import { useReductionInputs } from './hooks/useReductionInputs';
import { useSpeedsInputs } from './hooks/useSpeedsInputs';
import { useStylusSync } from './hooks/useStylusSync';
import { RollSyncTab } from './roll/RollSyncTab';
import { SpeedsMaterialsTab } from './speeds/SpeedsMaterialsTab';
import { ReductionTableTab } from './table/ReductionTableTab';
import type { GortonTab } from './types';

const GORTON_TABS: ModuleTab<GortonTab>[] = [
  { id: 'calculator', label: '⚙️ Bar Setting' },
  { id: 'roll_sync', label: '⭕ Tracing & Roll Engraving' },
  { id: 'speeds_materials', label: '⚡ Speeds Chart' },
  { id: 'table', label: '📊 Reduction Table' },
  { id: 'guide', label: '📖 Manual Guide' },
];

export const GortonP12: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GortonTab>('calculator');
  const { unit } = useUnit();

  const r = useReductionInputs();
  const sync = useStylusSync(r.ratio);
  const speeds = useSpeedsInputs();

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '90px', color: 'var(--text-primary)' }}>
      <ToolHeader
        icon="📜"
        title="Gorton P1-2 Pantomill Suite"
        badge="Reduction & Setup"
        badgeColor="#f59e0b"
        badgeRgb="245, 158, 11"
        subtitle="Pantograph ratio settings, tracing stylus, speeds & roll engraving"
      />

      {activeTab === 'calculator' && <CalculatorTab r={r} unit={unit} />}

      {activeTab === 'roll_sync' && <RollSyncTab {...sync} />}

      {activeTab === 'speeds_materials' && <SpeedsMaterialsTab {...speeds} />}

      {activeTab === 'table' && (
        <ReductionTableTab
          ratio={r.ratio}
          onLoadRatio={(ratioVal) => { r.setRatioVal(ratioVal); setActiveTab('calculator'); }}
        />
      )}

      {activeTab === 'guide' && <ManualGuideTab onReturn={() => setActiveTab('calculator')} />}

      <ToolFooterNote heading="📜 Gorton Manual 2701-A Verified | Model P1-2 / P1-2 Heavy Duty" color="#f59e0b" marginTop="30px">
        Precision pantograph bar setting calculator, tracing stylus grinding rules, special reduction alignments, official material cutting speeds (RPM/SFM), and Model 727 roll attachment math.
      </ToolFooterNote>

      {/* Sticky South Footer for Module Navigation */}
      <ModuleTabBar
        tabs={GORTON_TABS}
        active={activeTab}
        onSelect={setActiveTab}
        accent="#f59e0b"
        glow="rgba(245, 158, 11, 0.5)"
        border="rgba(245, 158, 11, 0.4)"
        padX={14}
      />
    </div>
  );
};
