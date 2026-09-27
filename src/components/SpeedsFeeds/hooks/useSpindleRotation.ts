import { useEffect, useRef, useState } from 'react';

/** The spinning-cutter animation: a requestAnimationFrame rotation angle and its pause toggle. */
export function useSpindleRotation() {
  // SVG Animation state
  const [rotation, setRotation] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const animRef = useRef<number | null>(null);

  // Animation Loop for Endmill Rotation
  useEffect(() => {
    if (!isAnimating) return;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      // Rotate based on RPM (scaled for smooth visualization)
      setRotation(r => (r + (dt * 0.3)) % 360);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAnimating]);

  return { rotation, isAnimating, setIsAnimating };
}
