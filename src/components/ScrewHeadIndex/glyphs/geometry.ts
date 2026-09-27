// Point strings for regular polygons and stars (SVG `points`), no JSX.

export const polyPoints = (cx: number, cy: number, n: number, r: number, rotDeg = -90) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((rotDeg + (i * 360) / n) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

export const starPoints = (cx: number, cy: number, lobes: number, rOuter: number, rInner: number, rotDeg = -90) =>
  Array.from({ length: lobes * 2 }, (_, i) => {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = ((rotDeg + (i * 360) / (lobes * 2)) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
