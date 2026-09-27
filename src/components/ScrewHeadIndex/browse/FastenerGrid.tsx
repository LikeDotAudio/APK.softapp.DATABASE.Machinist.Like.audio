import React from 'react';
import type { FastenerItem } from '../types';
import { FastenerTile } from './FastenerTile';
import { GroupFilterBar } from './GroupFilterBar';

type FastenerGridProps = React.ComponentProps<typeof GroupFilterBar> & {
  filtered: FastenerItem[];
  selectedId: string;
  setSelectedId: (id: string) => void;
};

/** Right: Library Grid — filter bar, the glyph tiles and the empty state. */
export const FastenerGrid: React.FC<FastenerGridProps> = ({ filtered, selectedId, setSelectedId, ...filterBar }) => (
  <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
    <GroupFilterBar {...filterBar} />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(118px, 1fr))', gap: '10px' }}>
      {filtered.map(f => (
        <FastenerTile key={f.id} f={f} isSel={f.id === selectedId} onSelect={setSelectedId} />
      ))}
      {filtered.length === 0 && (
        <div style={{ gridColumn: '1 / -1', padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          No fasteners match the current filter.
        </div>
      )}
    </div>
  </div>
);
