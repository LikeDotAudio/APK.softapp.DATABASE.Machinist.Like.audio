import React from 'react';
import { FILTER_BUTTONS, GROUP_META } from '../data/groupMeta';
import type { GroupFilter } from '../types';

interface GroupFilterBarProps {
  groupFilter: GroupFilter;
  setGroupFilter: (g: GroupFilter) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

/** The five group filter buttons and the search box. */
export const GroupFilterBar: React.FC<GroupFilterBarProps> = ({ groupFilter, setGroupFilter, searchQuery, setSearchQuery }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
      {FILTER_BUTTONS.map(({ id: gp, label }) => {
        const active = groupFilter === gp;
        const color = gp === 'all' ? '#fff' : GROUP_META[gp].color;
        return (
          <button
            key={gp}
            onClick={() => setGroupFilter(gp)}
            style={{
              padding: '7px 14px', border: 'none', borderRadius: '6px',
              background: active ? (gp === 'all' ? 'rgba(255,255,255,0.15)' : GROUP_META[gp].bg) : 'transparent',
              color: active ? color : 'var(--text-secondary)',
              fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: active && gp !== 'all' ? `inset 0 0 0 1px ${GROUP_META[gp].border}` : 'none'
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
    <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
      <input
        type="text"
        placeholder="Search fasteners (e.g., torx, countersunk, carriage)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-precision"
        style={{ width: '100%', paddingLeft: '34px' }}
      />
      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--text-muted)' }}>🔍</span>
    </div>
  </div>
);
