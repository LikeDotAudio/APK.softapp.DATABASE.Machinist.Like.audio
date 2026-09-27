import React from 'react';

interface SvgGridPatternProps {
  /** The pattern id the drawing fills with (`url(#id)`). */
  id: string;
  /** Cell size in user units. */
  size: number;
  /** Line alpha on white, printed as `rgba(255, 255, 255, <opacity>)`. */
  opacity?: number;
  /** Full stroke colour; overrides `opacity` when a drawing already prints its own spelling. */
  stroke?: string;
}

/** The faint background grid `<pattern>` for SVG drawings. Render it inside a `<defs>`. */
export const SvgGridPattern: React.FC<SvgGridPatternProps> = ({ id, size, opacity = 0.05, stroke }) => (
  <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
    <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={stroke ?? `rgba(255, 255, 255, ${opacity})`} strokeWidth="1" />
  </pattern>
);
