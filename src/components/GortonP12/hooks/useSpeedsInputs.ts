import { useState } from 'react';
import { GORTON_MATERIALS } from '../data/cuttingChart';
import { parseSfm, pickCuttingData, rpmFromSfm } from '../gorton.math';
import type { CutMode, ToolMat } from '../types';

/** Speeds & Materials Chart inputs and the derived SFM, coolant and RPM (Page 34 & 35). */
export function useSpeedsInputs() {
  const [selectedMatIdx, setSelectedMatIdx] = useState<number>(4); // Bessemer Screw Stock
  const [toolMat, setToolMat] = useState<ToolMat>('carbide');
  const [cutMode, setCutMode] = useState<CutMode>('wet');
  const [speedCutterDia, setSpeedCutterDia] = useState<string>('0.125');

  const currentMat = GORTON_MATERIALS[selectedMatIdx] || GORTON_MATERIALS[0];
  const { sfmRaw, coolantRec } = pickCuttingData(currentMat, toolMat, cutMode);
  const sfmNum = parseSfm(sfmRaw);
  const calculatedRpm = rpmFromSfm(sfmNum, speedCutterDia);

  return {
    selectedMatIdx, setSelectedMatIdx, toolMat, setToolMat, cutMode, setCutMode, speedCutterDia, setSpeedCutterDia,
    sfmRaw, coolantRec, sfmNum, calculatedRpm,
  };
}
