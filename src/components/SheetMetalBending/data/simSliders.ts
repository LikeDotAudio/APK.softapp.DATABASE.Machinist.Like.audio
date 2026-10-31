// The six "Live Deformation Control Levers" on the simulator tab.
import type { SimInputs } from '../types';

export interface SimSlider {
  key: keyof SimInputs;
  label: string;
  /** Colour of the live value next to the label. */
  valueColor: string;
  /** Printed right after the value (`"` for inches, empty for the angle's own `°` and the K-factor). */
  suffix: string;
  rangeText: string;
  min: string;
  max: string;
  step: string;
  accent: string;
}

export const SIM_SLIDERS: SimSlider[] = [
  { key: 'simAngle', label: 'Bend Angle (θ): ', valueColor: 'var(--accent)', suffix: '°', rangeText: '1° (Flat) to 179° (Sharp Fold)', min: '1', max: '179', step: '1', accent: 'var(--accent)' },
  { key: 'simRadius', label: 'Inside Radius (R): ', valueColor: '#00ff80', suffix: '"', rangeText: '0.010" to 1.000"', min: '0.010', max: '1.000', step: '0.005', accent: '#00ff80' },
  { key: 'simThickness', label: 'Material Thickness (T): ', valueColor: '#f59e0b', suffix: '"', rangeText: '0.020" to 0.500"', min: '0.020', max: '0.500', step: '0.005', accent: '#f59e0b' },
  { key: 'simKFactor', label: 'K-Factor (K): ', valueColor: '#a855f7', suffix: '', rangeText: '0.25 (Soft) to 0.50 (Coining)', min: '0.25', max: '0.50', step: '0.01', accent: '#a855f7' },
  { key: 'simFlange1', label: 'Flange 1 Length (L₁): ', valueColor: 'var(--text-primary)', suffix: '"', rangeText: '1.00" to 12.00"', min: '1.00', max: '12.00', step: '0.25', accent: '#38bdf8' },
  { key: 'simFlange2', label: 'Flange 2 Length (L₂): ', valueColor: 'var(--text-primary)', suffix: '"', rangeText: '1.00" to 12.00"', min: '1.00', max: '12.00', step: '0.25', accent: '#38bdf8' },
];
