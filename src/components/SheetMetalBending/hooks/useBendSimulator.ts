import { useMemo, useState } from 'react';
import { solveSimulator } from '../bend.math';
import type { SimInputs, SimResults } from '../types';

export interface BendSimulator {
  inputs: SimInputs;
  simCalc: SimResults;
  setSimInput: (key: keyof SimInputs, raw: string) => void;
}

/** The six Live Bend Simulator inputs and their derived results. */
export function useBendSimulator(): BendSimulator {
  const [simAngle, setSimAngle] = useState<number>(90);
  const [simRadius, setSimRadius] = useState<string>('0.125');
  const [simThickness, setSimThickness] = useState<string>('0.100');
  const [simKFactor, setSimKFactor] = useState<string>('0.42');
  const [simFlange1, setSimFlange1] = useState<string>('4.000');
  const [simFlange2, setSimFlange2] = useState<string>('4.000');

  // Simulator Math Engine (60 FPS Reactive Solvers)
  const simCalc = useMemo(
    () => solveSimulator({ simAngle, simRadius, simThickness, simKFactor, simFlange1, simFlange2 }),
    [simAngle, simRadius, simThickness, simKFactor, simFlange1, simFlange2],
  );

  const setSimInput = (key: keyof SimInputs, raw: string) => {
    if (key === 'simAngle') setSimAngle(parseInt(raw) || 90);
    else if (key === 'simRadius') setSimRadius(raw);
    else if (key === 'simThickness') setSimThickness(raw);
    else if (key === 'simKFactor') setSimKFactor(raw);
    else if (key === 'simFlange1') setSimFlange1(raw);
    else setSimFlange2(raw);
  };

  return {
    inputs: { simAngle, simRadius, simThickness, simKFactor, simFlange1, simFlange2 },
    simCalc,
    setSimInput,
  };
}
