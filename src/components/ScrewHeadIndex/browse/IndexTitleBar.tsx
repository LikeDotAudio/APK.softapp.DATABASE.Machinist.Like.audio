import React from 'react';
import { GROUP_META } from '../data/groupMeta';
import type { Group } from '../types';

/** Compact Title Bar: the page title and the four group counters. */
export const IndexTitleBar: React.FC<{ counts: Record<Group, number> }> = ({ counts }) => (
  <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0 }}>
      🪛 Screw Head & Drive Index <span style={{ color: 'var(--accent-cyan)', fontWeight: 400 }}>// SVG Fastener Library</span>
    </h2>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {(Object.keys(GROUP_META) as Group[]).map(gp => (
        <div key={gp} style={{ padding: '4px 12px', borderRadius: '8px', background: GROUP_META[gp].bg, border: `1px solid ${GROUP_META[gp].border}`, fontSize: '0.78rem', color: GROUP_META[gp].color }}>
          <strong>{counts[gp]}</strong> {GROUP_META[gp].label.toLowerCase()}s
        </div>
      ))}
    </div>
  </div>
);
