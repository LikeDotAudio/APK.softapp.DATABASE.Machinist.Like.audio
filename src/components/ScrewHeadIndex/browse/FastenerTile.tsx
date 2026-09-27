import React from 'react';
import { GROUP_META } from '../data/groupMeta';
import type { FastenerItem } from '../types';

interface FastenerTileProps {
  f: FastenerItem;
  isSel: boolean;
  onSelect: (id: string) => void;
}

/** One glyph tile in the library grid. */
export const FastenerTile: React.FC<FastenerTileProps> = ({ f, isSel, onSelect }) => {
  const meta = GROUP_META[f.group];
  return (
    <div
      onClick={() => onSelect(f.id)}
      style={{
        background: isSel ? meta.bg : 'var(--bg-primary)',
        border: '1px solid',
        borderColor: isSel ? meta.color : 'var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 8px 8px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.15s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px'
      }}
      onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.borderColor = meta.border; }}
      onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.borderColor = 'var(--border-color)'; }}
    >
      <div style={{ width: f.group === 'drive' ? '58px' : '52px', height: f.group === 'screw' ? '84px' : '58px' }}>
        {f.render()}
      </div>
      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isSel ? meta.color : 'var(--text-primary)', lineHeight: 1.25 }}>
        {f.name}
      </span>
    </div>
  );
};
