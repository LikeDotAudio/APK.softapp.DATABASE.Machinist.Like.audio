import React from 'react';

export interface ModuleTab<T extends string> {
  id: T;
  /** When given, rendered as its own `<span>` ahead of the label text; otherwise the label is one `<span>`. */
  icon?: string;
  label: string;
  /** Optional trailing element, e.g. an "ACTIVE" pill. */
  badge?: React.ReactNode;
}

interface ModuleTabBarProps<T extends string> {
  tabs: ModuleTab<T>[];
  active: T;
  onSelect: (id: T) => void;
  /** Active button fill, active border and the "MODULE TOPICS:" label colour. */
  accent: string;
  /** Active button glow colour. */
  glow: string;
  /** Top border colour of the bar. */
  border: string;
  /** Button horizontal padding in px. */
  padX: number;
}

/** The fixed "MODULE TOPICS" footer bar that switches a tool's tabs. */
export function ModuleTabBar<T extends string>({ tabs, active, onSelect, accent, glow, border, padX }: ModuleTabBarProps<T>) {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(10, 13, 20, 0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: `2px solid ${border}`,
      boxShadow: '0 -6px 25px rgba(0, 0, 0, 0.7)',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      zIndex: 1000
    }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '1px', marginRight: '5px' }}>MODULE TOPICS:</span>
      {tabs.map(tab => {
        const on = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            style={{
              background: on ? accent : 'rgba(255, 255, 255, 0.05)',
              color: on ? '#000' : 'var(--text-secondary)',
              border: on ? `1px solid ${accent}` : '1px solid var(--border-color)',
              padding: `7px ${padX}px`,
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: on ? `0 0 12px ${glow}` : 'none'
            }}
          >
            {tab.icon !== undefined ? <><span>{tab.icon}</span> {tab.label}</> : <span>{tab.label}</span>}
            {tab.badge}
          </button>
        );
      })}
    </footer>
  );
}
