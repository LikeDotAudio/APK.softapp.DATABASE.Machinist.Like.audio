// The formulas-reference view's five boxes as data.

export interface FormulaLine {
  /** Bold lead-in, e.g. "Imperial (RPM):". */
  label?: string;
  /** Text after the label (keeps its leading space). */
  text?: string;
  /** Draw a thin rule above this line. */
  divider?: boolean;
  /** Indented, tinted continuation line. */
  indent?: boolean;
}

export interface FormulaGroup {
  title: string;
  color: string;
  lines: FormulaLine[];
  note: string;
}

export interface FormulaBox {
  title: string;
  color: string;
  /** Box border colour when it is not the theme border. */
  border?: string;
  /** Span the whole grid row. */
  fullWidth?: boolean;
  /** Font size of the mono block. */
  monoFontSize: string;
  /** One mono block of lines ... */
  lines?: FormulaLine[];
  /** ... or a grid of titled groups. */
  groups?: FormulaGroup[];
  caption: string;
}

export const FORMULA_BOXES: FormulaBox[] = [
  {
    title: '⚡ Spindle Speed & Surface Velocity',
    color: 'var(--accent)',
    monoFontSize: '0.9rem',
    lines: [
      { label: 'Imperial (RPM):', text: ' (SFM × 3.82) ÷ Diameter' },
      { label: 'Metric (RPM):', text: ' (Vc × 1000) ÷ (π × Diameter)' },
      { label: 'SFM:', text: ' 0.262 × Diameter × RPM', divider: true },
      { label: 'Vc (M/Min):', text: ' (π × Diameter × RPM) ÷ 1000' },
    ],
    caption: 'Where Diameter is cutter diameter (milling) or workpiece diameter (turning).',
  },
  {
    title: '🟢 Table Feed Rate & Chip Load (IPT / Fz)',
    color: '#00ff80',
    monoFontSize: '0.9rem',
    lines: [
      { label: 'Feed (IPM / mm/min):', text: ' RPM × Flutes × Feed per Tooth' },
      { label: 'Chip Load (IPT / Fz):', text: ' Feed Rate ÷ (RPM × Flutes)' },
      { label: 'Rev Feed (IPR / mm/rev):', text: ' Feed per Tooth × Flutes' },
    ],
    caption: 'Maintain recommended chip load to prevent work hardening and flute packing.',
  },
  {
    title: '🌀 Trochoidal Chip Thinning Compensation',
    color: '#c084fc',
    border: 'rgba(168, 85, 247, 0.4)',
    monoFontSize: '0.85rem',
    lines: [
      { label: 'Required when:', text: ' Radial Stepover (Ae) < 50% Dia' },
      { label: 'Engagement Multiplier:' },
      { text: '[0.5 × (Dia ÷ Ae)] ÷ √[(Dia ÷ Ae) - 1]', indent: true },
      { label: 'Revised Programmed IPT:', text: ' Target IPT × Multiplier', divider: true },
    ],
    caption: 'Compensates for reduced average chip thickness in high-speed dynamic milling passes.',
  },
  {
    title: '⏱️ Metal Removal Rate (MRR) & Machining Time',
    color: '#38bdf8',
    monoFontSize: '0.9rem',
    lines: [
      { label: 'Milling MRR (in³/min):', text: ' WOC × DOC × IPM' },
      { label: 'Metric MRR (cm³/min):', text: ' (WOC × DOC × mm/min) ÷ 1000' },
      { label: 'Milling Time (Minutes):', text: ' Cut Length ÷ Table Feed Rate', divider: true },
    ],
    caption: 'Used for estimating spindle power requirements and job quoting.',
  },
  {
    title: '⚡ Spindle Horsepower, Torque & Surface Finish (Ra) Prediction',
    color: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.4)',
    fullWidth: true,
    monoFontSize: '0.9rem',
    groups: [
      {
        title: 'Spindle Power (HP & kW):',
        color: 'var(--accent)',
        lines: [
          { label: 'HP:', text: ' (MRR [in³/min] × K-Factor) ÷ Efficiency (0.80)' },
          { label: 'kW:', text: ' HP × 0.7457' },
        ],
        note: '*K-Factor is unit power constant (e.g. 0.25 for Al, 0.70 for Steel, 1.10 for Ti).',
      },
      {
        title: 'Spindle Torque:',
        color: '#ec4899',
        lines: [
          { label: 'Torque (in-lbf):', text: ' (HP × 63,025) ÷ RPM' },
          { label: 'Torque (N·m):', text: ' (kW × 9,549) ÷ RPM' },
        ],
        note: '*Critical for low-RPM roughing and large diameter drill/tap torque limits.',
      },
      {
        title: 'Surface Roughness (Ra):',
        color: '#4ade80',
        lines: [
          { label: 'Ra (µin):', text: ' (fz² ÷ (32 × Radius)) × 1,000,000' },
          { label: 'Ra (µm):', text: ' (fz² ÷ (32 × Radius)) × 1,000' },
        ],
        note: '*Where fz is feed per tooth and Radius is tool corner/nose radius.',
      },
    ],
    caption: 'Inspired by industrial tooling references (Kennametal & Garr Tool) to ensure safe machine spindle loads and precision finish tolerances.',
  },
];
