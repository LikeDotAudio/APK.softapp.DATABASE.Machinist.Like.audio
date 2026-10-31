// The Gorton manual's prose as data. `**text**` renders bold and a newline renders <br/>
// (see RichText.tsx).

export interface NoteItem {
  title: string;
  body: string;
  /** Left border colour. */
  color: string;
}

export interface NoteCardData {
  title: string;
  /** Top border and title colour. */
  color: string;
  intro: string;
  items: NoteItem[];
}

// Card 2: Tracing Stylus Selection & Grinding Rules (Pages 19-20)
export const STYLUS_CARD: NoteCardData = {
  title: '🖋️ Tracing Stylus Selection & Grinding (P. 19-20)',
  color: '#ec4899',
  intro: 'Two distinct stylus families are engineered for the P1-2 Pantomill. Matching the stylus geometry to the copy type groove is essential to prevent master damage and ensure clean lettering.',
  items: [
    { color: '#ec4899', title: '1. Style No. 3253 (Conical Point for 90° V-Grooves):', body: 'Used exclusively for sunk lettering from standard 90° V-groove copy. **Critical Maintenance:** Must be kept ground to a sharp 90° included angle on a Gorton Cutter Grinder using 2/10" collets. If dull or off-angle, it will rapidly deform brass copy characters!' },
    { color: '#f59e0b', title: '2. Style Sets 795-1 / 25-1 (Square Nose / Rollers):', body: 'Engineered for square-bottom groove copy and 3D relief (raised) designs. Use **Set 25-1 (with rollers)** when reduction ratios are large and stock removal is heavy. Use **Set 795-1 (without rollers)** for small ratios and fine finish passes into sharp internal corners.' },
    { color: '#00ff80', title: '3. Stylus Springing Rule (Page 20):', body: 'Clamp stylus in the long arm collet so no excessive straining of pantograph joints occurs. The slight mechanical springing when moving stylus between characters is normal and harmless.' },
  ],
};

// Card 3: Model 727 Roll Attachment Specifications & Formulas (Pages 26-27)
export const ROLL_CARD: NoteCardData = {
  title: '⚙️ Model 727 Roll Attachment Guide',
  color: '#f59e0b',
  intro: 'The Gorton 727 Roll Attachment replaces the standard slider head to engrave cylindrical workpieces (0.75" to 3.0" dia, up to 7" length) without requiring a curved forming guide.',
  items: [
    { color: 'var(--accent)', title: '1. Master Circumference Scaling Rule:', body: 'Flat master length = Cylinder Circumference (π × D) × Reduction Ratio (R). Example: 2" cylinder at 2:1 ratio requires 6.2832 × 2 = 12.5664" master template length.' },
    { color: '#f59e0b', title: '2. Steel Band & Roll Tensioning:', body: 'Rotation is synchronized via steel bands running over rollers. Release band tension lever before mounting work; return lever to lock position to automatically re-apply exact factory tension.' },
    { color: '#ef4444', title: '3. Caution on Slide Cleaning (Page 27):', body: 'Never use an air blast to clean chips from roll attachment ball bearing slides! Air pressure forces abrasive chips into precision bearings. Always use a soft brush.' },
  ],
};

// Card 4: Special Reductions & Corrective Screw "X" (Pages 15, 28-30)
export const SPECIAL_REDUCTIONS_CARD: NoteCardData = {
  title: '🎯 Special Reductions & Screw "X" (P. 15, 28)',
  color: 'var(--accent)',
  intro: 'When engraving non-standard odd ratios (from 2:1 to infinity) or correcting table alignment, follow official factory calibration rules from Pages 15, 28, and 29-30.',
  items: [
    { color: 'var(--accent)', title: '1. Magnifying Glass Alignment Rule (Page 15):', body: 'To obtain true reproduction through the pantograph bars, settings must be made with a magnifying glass so index lines on slider blocks align perfectly with bar calibrations.' },
    { color: '#38bdf8', title: '2. Corrective Screw "X" Parallelism (P. 15 Note & P. 28):', body: 'If parallelism between copy table and machine table deviates after setting bar reductions, adjust corrective screw **"X"** (Page 28). This mechanical alignment compensation does **not** alter pantograph bar calibrations or reproduction accuracy!' },
    { color: '#a855f7', title: '3. Trial Cut Verification (Page 15):', body: 'After setting a special reduction, verify by inserting a point in the spindle, raising work table until clearing by 1/64", and tracing copyholder T-slots. If point follows an arc or angle, recalculate and tap slider block until true.' },
  ],
};

export interface GuideBox {
  title: string;
  color: string;
  body: string;
}

// MAIN VIEW 5: MANUAL & SETUP GUIDE (Pages 11-25)
export const GUIDE_BOXES: GuideBox[] = [
  {
    title: '🛠️ Setting & Installing Pantograph Bars (Page 12)',
    color: 'var(--accent)',
    body: '1. Remove eye nut on top of slider head and push down forming guide bar to release the hinged cutter head and link.\n'
      + '2. Move slider head to the position indicating on the numbered scale the ratio of reduction to be used, then tighten acorn hex nut.\n'
      + '3. Place slider bar **"E"** in slider block **"F"** with index line to the front.\n'
      + '4. Insert slider bar **"G"** in slider block **"H"** with index line on milled flat to the front.\n'
      + '5. **Caution:** Parts are carefully hand-scraped and fitted; no force or hammering is ever necessary to slip bars into blocks!',
  },
  {
    title: '🛢️ Spindle & Machine Lubrication (Page 12-13)',
    color: '#00ff80',
    body: '• **Cutter Spindle:** Apply 2 to 4 drops of spindle oil (Socony Mobil Velocity #10 or Sun Oil Solnus #70) to each marked oil hole twice daily.\n'
      + '• **Feed Screws & Ways:** Maintain a slight film of clean oil (Socony Mobil Vactra #2 or Sun Oil SWL #80) on all bearing surfaces and table/knee screws.\n'
      + '• **Pantograph Bearings:** All linkage pivots and cutter head bearings are permanently double-sealed grease bearings and require **no lubrication**!',
  },
  {
    title: '🌀 Spindle Bore & Forming Guides (Page 21-23)',
    color: '#f59e0b',
    body: '• **Spindle Bore Adjustment:** Two set screws on housing adjust vertical floating fit. Spindle must move vertically freely without side play. Use a thin paper shim to verify both set screws make even contact.\n'
      + '• **Forming Guide Operation:** For curved engraving, forming guide contour must be exact opposite of workpiece (e.g. convex work requires concave guide). Coat guide with grease so former point slides without friction.',
  },
  {
    title: '⚡ P1-2 Heavy-Duty & 45,000 RPM Spindle (Page 6 & 24)',
    color: '#ec4899',
    body: '• **Combination Cutter Head:** The Heavy-Duty P1-2 features a split cutter head. By removing 4 cap screws at the lower end, the standard belt spindle and feed works can be swapped for the 45,000 RPM Super-Speed Electric Spindle in seconds.\n'
      + '• **Formula Compatibility:** All reduction formulas, constants, and tables for the standard P1-2 apply identically to the P1-2 Heavy Duty Model.',
  },
];
