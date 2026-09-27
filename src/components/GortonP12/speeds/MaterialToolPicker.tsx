import React from 'react';
import { GORTON_MATERIALS, MATERIAL_GROUPS } from '../data/cuttingChart';
import { SegmentedButtons } from '../SegmentedButtons';
import type { CutMode, ToolMat } from '../types';

interface MaterialToolPickerProps {
  selectedMatIdx: number;
  setSelectedMatIdx: (idx: number) => void;
  toolMat: ToolMat;
  setToolMat: (m: ToolMat) => void;
  cutMode: CutMode;
  setCutMode: (m: CutMode) => void;
}

/** Box 1: Material & Tool Selection */
export const MaterialToolPicker: React.FC<MaterialToolPickerProps> = ({ selectedMatIdx, setSelectedMatIdx, toolMat, setToolMat, cutMode, setCutMode }) => (
  <div style={{ background: 'var(--bg-secondary)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
      1. Select Workpiece Material:
    </label>
    <select
      value={selectedMatIdx}
      onChange={(e) => setSelectedMatIdx(Number(e.target.value))}
      className="input-precision"
      style={{ width: '100%', marginBottom: '18px', padding: '12px', fontSize: '0.95rem', fontWeight: 600 }}
    >
      {MATERIAL_GROUPS.map(g => (
        <optgroup key={g.category} label={g.label}>
          {GORTON_MATERIALS.map((m, idx) => m.category === g.category && (
            g.withTensile
              ? <option key={idx} value={idx}>{m.name} ({m.tensile} TS)</option>
              : <option key={idx} value={idx}>{m.name}</option>
          ))}
        </optgroup>
      ))}
    </select>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Cutter Material:
        </label>
        <SegmentedButtons
          options={[
            { id: 'carbide', label: 'Carbide' },
            { id: 'hss', label: 'H.S.S.' },
          ]}
          value={toolMat}
          onChange={setToolMat}
          containerStyle={{ display: 'flex', gap: '6px' }}
          variant="filled"
          activeColor="#10b981"
          pad="8px"
          radius="4px"
          fontSize="0.8rem"
          stretch
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Coolant Mode:
        </label>
        <SegmentedButtons
          options={[
            { id: 'wet', label: 'Wet', color: '#38bdf8' },
            { id: 'dry', label: 'Dry', color: '#f59e0b' },
          ]}
          value={cutMode}
          onChange={setCutMode}
          containerStyle={{ display: 'flex', gap: '6px' }}
          variant="filled"
          pad="8px"
          radius="4px"
          fontSize="0.8rem"
          stretch
        />
      </div>
    </div>

  </div>
);
