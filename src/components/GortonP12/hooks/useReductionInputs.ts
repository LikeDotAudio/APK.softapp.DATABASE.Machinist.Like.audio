import { useState } from 'react';
import { parseRatio, rebalance, rollMasterLength } from '../gorton.math';
import type { CalcTarget, RangeMode } from '../types';

/** Bar-setting calculator inputs: range, ratio/copy/work with the three-way balancer, roll mode. */
export function useReductionInputs() {
  const [rangeMode, setRangeMode] = useState<RangeMode>('standard');

  // Calculator inputs
  const [ratioVal, setRatioVal] = useState<string>('5.0');
  const [copyLength, setCopyLength] = useState<string>('10.0');
  const [workLength, setWorkLength] = useState<string>('2.0');
  const [calcTarget, setCalcTarget] = useState<CalcTarget>('ratio');

  // Roll Attachment inputs
  const [rollDia, setRollDia] = useState<string>('2.000');
  const [isRollMode, setIsRollMode] = useState<boolean>(false);

  // Parse ratio
  const ratio = parseRatio(ratioVal);

  // Handle dimension recalculations
  const handleDimensionChange = (field: CalcTarget, value: string) => {
    const next = rebalance(field, value, calcTarget, { ratioVal, copyLength, workLength });
    if (next.ratioVal !== undefined) setRatioVal(next.ratioVal);
    if (next.copyLength !== undefined) setCopyLength(next.copyLength);
    if (next.workLength !== undefined) setWorkLength(next.workLength);
  };

  /** Switch formula range, pulling the ratio into the new range's side of 2:1. */
  const selectRange = (mode: RangeMode) => {
    if (mode === 'standard') { setRangeMode('standard'); if (ratio < 2.0) setRatioVal('2.0'); }
    else { setRangeMode('low_ratio'); if (ratio > 2.0) setRatioVal('1.8'); }
  };

  // Roll Attachment Circumference calculation (Page 27)
  const masterRollLength = rollMasterLength(rollDia, ratio);

  return {
    rangeMode, selectRange,
    ratioVal, setRatioVal, copyLength, workLength, calcTarget, setCalcTarget, handleDimensionChange,
    rollDia, setRollDia, isRollMode, setIsRollMode, masterRollLength,
    ratio,
  };
}

export type ReductionInputs = ReturnType<typeof useReductionInputs>;
