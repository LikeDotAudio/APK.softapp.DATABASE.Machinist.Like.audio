import { useState } from 'react';
import { syncRollerCutter } from '../gorton.math';
import type { SyncTarget } from '../types';

/** Stylus & Cutter Synchronizer inputs and results (Page 20). */
export function useStylusSync(ratio: number) {
  const [cutterDia, setCutterDia] = useState<string>('0.125');
  const [rollerDia, setRollerDia] = useState<string>('0.625');
  const [syncTarget, setSyncTarget] = useState<SyncTarget>('roller');

  const { calculatedRoller, calculatedCutter } = syncRollerCutter(cutterDia, rollerDia, ratio);

  return { ratio, cutterDia, setCutterDia, rollerDia, setRollerDia, syncTarget, setSyncTarget, calculatedRoller, calculatedCutter };
}
