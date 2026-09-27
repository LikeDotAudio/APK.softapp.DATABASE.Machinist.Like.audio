import React from 'react';

interface ToolFooterNoteProps {
  heading: React.ReactNode;
  /** Heading colour. */
  color: string;
  marginTop: string;
  children: React.ReactNode;
}

/** Footer: tool description (kept out of the header per site convention). */
export const ToolFooterNote: React.FC<ToolFooterNoteProps> = ({ heading, color, marginTop, children }) => (
  <div className="glass-panel" style={{ marginTop, padding: '16px 22px' }}>
    <div style={{ fontSize: '0.72rem', color, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
      {heading}
    </div>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>
      {children}
    </p>
  </div>
);
