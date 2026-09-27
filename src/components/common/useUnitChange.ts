import { useEffect, useRef } from 'react';

/**
 * Run `onChange(from, to)` when `unit` really changes (not on mount). Keeps the previous unit in
 * one ref and the latest callback in another, so the callback always sees the current render's
 * state without the effect re-running on every input edit.
 */
export function useUnitChange<U>(unit: U, onChange: (from: U, to: U) => void): void {
  const prevUnitRef = useRef<U>(unit);
  const onChangeRef = useRef(onChange);

  // Declared first so it runs before the change check in the same commit.
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    if (prevUnitRef.current === unit) return;
    const from = prevUnitRef.current;
    prevUnitRef.current = unit;
    onChangeRef.current(from, unit);
  }, [unit]);
}
