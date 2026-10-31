// The seven formula cards at the foot of the simulator tab (image-1.png).

export interface BendFormula {
  title: string;
  /** Title, left border and badge text colour. */
  color: string;
  badge: string;
  badgeBg: string;
  formula: string;
  formulaFontSize: string;
  body: string;
}

export const BEND_FORMULAS: BendFormula[] = [
  {
    title: '1. K-Factor (K)',
    color: '#a855f7',
    badge: 'Ratio',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    formula: 'K = t / T',
    formulaFontSize: '1.1rem',
    body: 'The ratio representing the inward shift of the neutral axis (t) relative to total material thickness (T). Standard air bending in mild steel uses K ≈ 0.42 to 0.45.',
  },
  {
    title: '2. Y-Factor (Y)',
    color: '#ec4899',
    badge: 'CAD Factor',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    formula: 'Y = K × (π / 2)',
    formulaFontSize: '1.1rem',
    body: 'An alternative representation of neutral axis location utilized in CAD systems (PTC Creo, marine software). A K-Factor of 0.45 converts to a Y-Factor of 0.7068.',
  },
  {
    title: '3. Outside Setback (OSSB)',
    color: '#f59e0b',
    badge: 'Geometry',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    formula: 'OSSB = (R + T) × tan(θ / 2)',
    formulaFontSize: '1.0rem',
    body: 'The distance along the outside flange from the tangent bend start line to the sharp apex intersection vertex. Crucial for determining Bend Deduction.',
  },
  {
    title: '4. Bend Allowance (BA)',
    color: '#38bdf8',
    badge: 'Neutral Arc',
    badgeBg: 'rgba(56, 189, 248, 0.15)',
    formula: 'BA = (π / 180) × (R + K·T) × θ',
    formulaFontSize: '0.95rem',
    body: 'The true physical length of metal along the neutral axis through the curved bend zone. Because this layer neither stretches nor shrinks, its length is preserved!',
  },
  {
    title: '5. Developed Arc Length (DL)',
    color: '#00ff80',
    badge: 'ISO Standard',
    badgeBg: 'rgba(0, 255, 128, 0.15)',
    formula: 'DL ≡ BA',
    formulaFontSize: '1.1rem',
    body: 'Synonymous with Bend Allowance in European and international metrology specifications. Represents the exact arc circumference of the neutral layer.',
  },
  {
    title: '6. Bend Deduction (BD)',
    color: '#ef4444',
    badge: 'Subtraction',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    formula: 'BD = (2 × OSSB) - BA',
    formulaFontSize: '1.05rem',
    body: 'The exact length subtracted per bend from the sum of outside mold dimensions to correct for corner duplication and metal stretching.',
  },
  {
    title: '7. Flat Pattern Length (FL)',
    color: 'var(--accent)',
    badge: 'Final Blank',
    badgeBg: 'rgba(var(--apk-accent-rgb), 0.15)',
    formula: 'FL = L₁ + L₂ - BD',
    formulaFontSize: '1.05rem',
    body: 'The actionable flat sheet metal blank cut length required for laser cutting or punching. Guarantees precision formed parts after brake bending.',
  },
];
