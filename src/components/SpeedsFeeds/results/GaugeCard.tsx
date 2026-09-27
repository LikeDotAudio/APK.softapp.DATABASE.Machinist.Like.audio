import React from 'react';

interface GaugeCardProps {
  title: string;
  value: string;
  caption: string;
  /** Value colour. */
  color: string;
  border: string;
  boxShadow: string;
  textShadow: string;
  /** Positioned for a corner tag (the feed card always is, tag or not). */
  relative?: boolean;
  /** Corner tag, e.g. "+40% HEM". */
  tag?: React.ReactNode;
}

/** One big-number gauge card. */
export const GaugeCard: React.FC<GaugeCardProps> = ({ title, value, caption, color, border, boxShadow, textShadow, relative, tag }) => (
  <div style={{
    background: 'var(--bg-primary)',
    padding: '18px 14px',
    borderRadius: 'var(--radius-md)',
    border,
    textAlign: 'center',
    boxShadow,
    position: relative ? 'relative' : undefined
  }}>
    {tag}
    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
      {title}
    </span>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.1rem', fontWeight: 700, color, textShadow }}>
      {value}
    </div>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
      {caption}
    </span>
  </div>
);
