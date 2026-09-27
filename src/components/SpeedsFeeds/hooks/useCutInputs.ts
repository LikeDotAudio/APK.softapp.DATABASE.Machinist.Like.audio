import { useState } from 'react';
import type { UnitType } from '../../../context/UnitContext';
import { convertField } from '../../../lib/units';
import { useUnitChange } from '../../common/useUnitChange';
import { MATERIALS } from '../data/materials';
import type { CutInputs } from '../types';

/** The input fields, preset loading and the unit swap. */
export function useCutInputs(unit: UnitType) {
  const [selectedMat, setSelectedMat] = useState<number>(0);

  // Core Inputs
  const [toolDia, setToolDia] = useState<string>('0.500');
  const [flutes, setFlutes] = useState<number>(4);
  const [customSpeed, setCustomSpeed] = useState<string>('1000'); // SFM or m/min
  const [customFeed, setCustomFeed] = useState<string>('0.005');  // IPT or fz
  const [widthOfCut, setWidthOfCut] = useState<string>('0.125');  // Radial Stepover (Ae)
  const [depthOfCut, setDepthOfCut] = useState<string>('0.500');  // Axial Depth (Ap)
  const [cutLength, setCutLength] = useState<string>('10.0');     // Pass length for time estimate
  const [cornerRad, setCornerRad] = useState<string>('0.031');    // Tool Corner/Nose radius for Ra finish
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Chip Thinning specific inputs
  const [targetCpt, setTargetCpt] = useState<string>('0.005');

  const handleMaterialChange = (idx: number) => {
    setSelectedMat(idx);
    setIsCustom(false);
    const mat = MATERIALS[idx];
    if (unit === 'imperial') {
      setCustomSpeed(mat.sfm.toString());
      setCustomFeed(mat.ipt.toString());
      setTargetCpt(mat.ipt.toString());
    } else {
      setCustomSpeed(mat.vc.toString());
      setCustomFeed(mat.fz.toString());
      setTargetCpt(mat.fz.toString());
    }
  };

  // Rewrite the six length fields and reload the preset speed/feed when the unit flips.
  useUnitChange(unit, (oldUnit, newUnit) => {
    if (newUnit === 'metric' && oldUnit === 'imperial') {
      setToolDia(convertField(toolDia, true, 2));
      setWidthOfCut(convertField(widthOfCut, true, 2));
      setDepthOfCut(convertField(depthOfCut, true, 2));
      setCutLength(convertField(cutLength, true, 1));
      setCornerRad(convertField(cornerRad, true, 2));
      setTargetCpt(convertField(targetCpt, true, 3));
      const mat = MATERIALS[selectedMat];
      setCustomSpeed(mat.vc.toString());
      setCustomFeed(mat.fz.toString());
    } else if (newUnit === 'imperial' && oldUnit === 'metric') {
      setToolDia(convertField(toolDia, false, 3));
      setWidthOfCut(convertField(widthOfCut, false, 3));
      setDepthOfCut(convertField(depthOfCut, false, 3));
      setCutLength(convertField(cutLength, false, 2));
      setCornerRad(convertField(cornerRad, false, 4));
      setTargetCpt(convertField(targetCpt, false, 4));
      const mat = MATERIALS[selectedMat];
      setCustomSpeed(mat.sfm.toString());
      setCustomFeed(mat.ipt.toString());
    }
    setIsCustom(false);
  });

  const inputs: CutInputs = { toolDia, flutes, customSpeed, customFeed, widthOfCut, depthOfCut, cutLength, cornerRad, targetCpt };

  return {
    inputs, selectedMat, isCustom, setIsCustom, handleMaterialChange,
    setToolDia, setFlutes, setCustomSpeed, setCustomFeed, setWidthOfCut, setDepthOfCut, setCutLength, setCornerRad, setTargetCpt,
  };
}

export type CutInputState = ReturnType<typeof useCutInputs>;
