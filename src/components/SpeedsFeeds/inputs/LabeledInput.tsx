import React from 'react';

interface LabeledInputProps {
  label: React.ReactNode;
  /** Label colour; defaults to the secondary text colour. */
  labelColor?: string;
  value: string | number;
  step?: string;
  min?: number;
  max?: number;
  onChange: (raw: string) => void;
  inputStyle: React.CSSProperties;
  /** Muted line under the input. */
  hint?: React.ReactNode;
}

/** One cell of an input row: uppercase label, number input, optional hint. */
export const LabeledInput: React.FC<LabeledInputProps> = ({ label, labelColor = 'var(--text-secondary)', value, step, min, max, onChange, inputStyle, hint }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.85rem', color: labelColor, textTransform: 'uppercase' }}>
      {label}
    </label>
    <input
      type="number"
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      className="input-precision"
      style={inputStyle}
    />
    {hint !== undefined && (
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
        {hint}
      </span>
    )}
  </div>
);
