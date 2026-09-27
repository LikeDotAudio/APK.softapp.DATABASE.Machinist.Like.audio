import React, { useState } from 'react';
import { useUnit } from '../../context/UnitContext';
import { ModuleTabBar } from '../common/ModuleTabBar';
import type { ModuleTab } from '../common/ModuleTabBar';
import { ToolHeader } from '../common/ToolHeader';
import { solveCut } from './cutting.math';
import { MATERIALS } from './data/materials';
import { FormulasTab } from './formulas/FormulasTab';
import { useCutInputs } from './hooks/useCutInputs';
import { useSpindleRotation } from './hooks/useSpindleRotation';
import { CutParametersPanel } from './inputs/CutParametersPanel';
import { ResultsPanel } from './results/ResultsPanel';
import type { SpeedsTab } from './types';
import { CutterEngagementPanel } from './visual/CutterEngagementPanel';
import { engagementGeometry } from './visual/engagementGeometry';

export const SpeedsFeeds: React.FC = () => {
  const { unit } = useUnit();
  const [activeTab, setActiveTab] = useState<SpeedsTab>('speeds_feeds');
  const c = useCutInputs(unit);
  const spin = useSpindleRotation();

  const r = solveCut(c.inputs, unit, activeTab, MATERIALS[c.selectedMat] || MATERIALS[0]);
  const geo = engagementGeometry(r.dia, r.woc);

  const tabs: ModuleTab<SpeedsTab>[] = [
    { id: 'speeds_feeds', label: '⚙️ Standard Speeds & Feeds' },
    {
      id: 'chip_thinning',
      label: '🌀 HEM Chip Thinning',
      badge: r.isChipThinningActive && (
        <span style={{ background: '#22c55e', color: '#000', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>ACTIVE</span>
      ),
    },
    { id: 'formulas', label: '📐 Formulas Reference' },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '90px', color: 'var(--text-primary)' }}>
      <ToolHeader
        icon="⚡"
        title="Speeds & Feeds & Chip Thinning Suite"
        badge="HEM Enabled"
        badgeColor="var(--accent-cyan)"
        badgeRgb="244, 144, 44"
        subtitle="Spindle RPM, table feed rates & dynamic milling telemetry"
      />

      {/* Main Content Grid */}
      {activeTab !== 'formulas' ? (
        <div>
          {/* TOP SECTION: 1. VISUAL & 2. VARIABLES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '12px', marginBottom: '12px', alignItems: 'start' }}>
            <CutterEngagementPanel
              geo={geo}
              rotation={spin.rotation}
              isAnimating={spin.isAnimating}
              setIsAnimating={spin.setIsAnimating}
              flutes={c.inputs.flutes}
              widthOfCut={c.inputs.widthOfCut}
              unit={unit}
              rpm={r.rpm}
              isChipThinningActive={r.isChipThinningActive}
              radialStepoverPercent={r.radialStepoverPercent}
            />
            <CutParametersPanel c={c} unit={unit} activeTab={activeTab} radialStepoverPercent={r.radialStepoverPercent} doc={r.doc} dia={r.dia} />
          </div>

          {/* BOTTOM SECTION: 3. EXPLANATION & RESULTS */}
          <ResultsPanel r={r} unit={unit} activeTab={activeTab} materialName={MATERIALS[c.selectedMat].name} contactAngleDeg={geo.contactAngleDeg} />
        </div>
      ) : (
        <FormulasTab onReturn={() => setActiveTab('speeds_feeds')} />
      )}

      {/* Sticky South Footer for Module Navigation */}
      <ModuleTabBar
        tabs={tabs}
        active={activeTab}
        onSelect={setActiveTab}
        accent="var(--accent-cyan)"
        glow="rgba(244, 144, 44, 0.5)"
        border="rgba(244, 144, 44, 0.4)"
        padX={16}
      />
    </div>
  );
};
