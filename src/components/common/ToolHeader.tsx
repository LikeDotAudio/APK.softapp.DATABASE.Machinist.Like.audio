import React from 'react';

interface ToolHeaderProps {
  icon: string;
  title: string;
  badge: string;
  /** Badge text colour. */
  badgeColor: string;
  /** Badge tint as an "r, g, b" triple; the fill is 0.15 alpha and the border 0.3. */
  badgeRgb: string;
  subtitle: string;
}

/** Ultra-compact inline header: zero vertical waste. Icon, title, badge on the left, subtitle on the right. */
export const ToolHeader: React.FC<ToolHeaderProps> = ({ icon, title, badge, badgeColor, badgeRgb, subtitle }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
      <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{title}</h1>
      <span style={{ fontSize: '0.75rem', background: `rgba(${badgeRgb}, 0.15)`, color: badgeColor, padding: '2px 10px', borderRadius: '12px', fontWeight: 700, border: `1px solid rgba(${badgeRgb}, 0.3)` }}>{badge}</span>
    </div>
    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
      {subtitle}
    </div>
  </div>
);
