import React from 'react';

interface ReadoutCardProps {
  title: string;
  value: string;
  caption: string;
  /** Value colour. */
  color: string;
  background: string;
  border: string;
}

/** One live metrology readout card on the simulator tab. */
export const ReadoutCard: React.FC<ReadoutCardProps> = ({ title, value, caption, color, background, border }) => (
  <div style={{ background, padding: '14px', borderRadius: '8px', border: `1px solid ${border}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 600 }}>
      {title}
    </div>
    <div style={{ fontSize: '1.6rem', fontWeight: 800, color, fontFamily: 'monospace' }}>
      {value}
    </div>
    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
      {caption}
    </div>
  </div>
);
