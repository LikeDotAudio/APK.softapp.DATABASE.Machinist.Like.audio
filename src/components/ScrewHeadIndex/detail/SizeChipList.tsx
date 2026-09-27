import React from 'react';

interface SizeChipListProps {
  heading: string;
  /** Heading and value colour. */
  color: string;
  background: string;
  border: string;
  items: { size: string; mm: number }[];
}

/** One size chart as a row of chips: "<size> → <mm> mm". */
export const SizeChipList: React.FC<SizeChipListProps> = ({ heading, color, background, border, items }) => (
  <div style={{ background, border: `1px solid ${border}`, padding: '12px 14px', borderRadius: '8px' }}>
    <div style={{ fontSize: '0.72rem', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
      {heading}
    </div>
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {items.map(k => (
        <span key={k.size} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 8px' }}>
          <strong style={{ color: '#fff' }}>{k.size}</strong>
          <span style={{ color }}> → {k.mm} mm</span>
        </span>
      ))}
    </div>
  </div>
);
