import React from 'react';

export interface SegmentOption<T extends string> {
  id: T;
  label: string;
  /** Per-option active colour; falls back to the row's `activeColor`. */
  color?: string;
  /** Per-option active fill for the outlined variant. */
  tint?: string;
}

interface SegmentedButtonsProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Style of the row container (grid or flex, gap). */
  containerStyle: React.CSSProperties;
  /**
   * 'filled': the active button is filled with the colour and prints black text.
   * 'outlined': the active button gets a 2px coloured border, a tint fill and white text.
   */
  variant: 'filled' | 'outlined';
  activeColor?: string;
  pad: string;
  radius: string;
  fontSize?: string;
  /** Stretch each button (`flex: 1`) in a flex row. */
  stretch?: boolean;
}

/** One "pick one of N" button row. The per-row props carry each row's exact pixels. */
export function SegmentedButtons<T extends string>({
  options, value, onChange, containerStyle, variant, activeColor, pad, radius, fontSize, stretch,
}: SegmentedButtonsProps<T>) {
  return (
    <div style={containerStyle}>
      {options.map(o => {
        const on = value === o.id;
        const color = o.color ?? activeColor;
        const style: React.CSSProperties = variant === 'filled'
          ? {
              flex: stretch ? 1 : undefined,
              padding: pad,
              borderRadius: radius,
              border: 'none',
              background: on ? color : 'var(--bg-tertiary)',
              color: on ? '#000' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize,
              cursor: 'pointer',
            }
          : {
              padding: pad,
              borderRadius: radius,
              border: on ? `2px solid ${color}` : '1px solid var(--border-color)',
              background: on ? o.tint : 'var(--bg-tertiary)',
              color: on ? '#fff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize,
              cursor: 'pointer',
              textAlign: 'center',
            };
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={style}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
