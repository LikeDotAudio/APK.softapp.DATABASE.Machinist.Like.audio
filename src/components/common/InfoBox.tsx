import React from 'react';

interface InfoBoxProps {
  title: React.ReactNode;
  /** Title colour. */
  color: string;
  /** Box border colour; defaults to the theme border. */
  border?: string;
  /** Optional CSS grid-column, e.g. '1 / -1' for a full-width box. */
  gridColumn?: string;
  /** The box body: a paragraph, or a mono formula block plus a caption. */
  children: React.ReactNode;
}

/** A titled reference box (manual notes, formula references). */
export const InfoBox: React.FC<InfoBoxProps> = ({ title, color, border = 'var(--border-color)', gridColumn, children }) => (
  <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', border: `1px solid ${border}`, gridColumn }}>
    <h3 style={{ fontSize: '1.15rem', color, marginBottom: '12px', fontWeight: 700 }}>
      {title}
    </h3>
    {children}
  </div>
);
