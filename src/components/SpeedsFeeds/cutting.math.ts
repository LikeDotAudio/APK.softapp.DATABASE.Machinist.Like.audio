// The cutting math, pure, no React. The body is the one the component ran in its render
// function, verbatim — including two known metric unit slips that this move deliberately keeps:
// chip-thinning power/torque read 1,000x high in metric (mm³/min treated as cm³/min), and the
// "Total Volume Removed" readout prints mm³ under a cm³ label (that one lives in the view).
import type { UnitType } from '../../context/UnitContext';
import type { CutInputs, CutResults, MaterialPreset, SpeedsTab } from './types';

export function solveCut(inputs: CutInputs, unit: UnitType, activeTab: SpeedsTab, matPreset: MaterialPreset): CutResults {
  const { toolDia, flutes, customSpeed, customFeed, widthOfCut, depthOfCut, cutLength, cornerRad, targetCpt } = inputs;

  const dia = Math.max(0.001, parseFloat(toolDia) || 0.001);
  const speedVal = parseFloat(customSpeed) || 0;
  const feedVal = parseFloat(customFeed) || 0;
  const woc = Math.min(dia, Math.max(0.0001, parseFloat(widthOfCut) || 0.001));
  const doc = Math.max(0.0001, parseFloat(depthOfCut) || 0.001);
  const length = Math.max(0.001, parseFloat(cutLength) || 1.0);
  const radius = Math.max(0.0001, parseFloat(cornerRad) || 0.031);
  const tCpt = Math.max(0.0001, parseFloat(targetCpt) || feedVal);

  let rpm = 0;
  let ipmOrMmMin = 0;
  let mrr = 0; // cu in/min or cm³/min

  if (unit === 'imperial') {
    // RPM = (SFM * 3.82) / Diameter
    rpm = (speedVal * 3.8197) / dia;
    // Feed rate = RPM * Flutes * IPT
    ipmOrMmMin = rpm * flutes * feedVal;
    // MRR = WOC * DOC * IPM
    mrr = woc * doc * ipmOrMmMin;
  } else {
    // RPM = (Vc * 1000) / (pi * Diameter)
    rpm = (speedVal * 1000) / (Math.PI * dia);
    // Feed rate (mm/min) = RPM * Flutes * fz
    ipmOrMmMin = rpm * flutes * feedVal;
    // MRR (cm³/min) = (WOC_mm * DOC_mm * Feed_mm_min) / 1000
    mrr = (woc * doc * ipmOrMmMin) / 1000;
  }

  // Machining Time (Minutes & Seconds)
  const totalMinutes = ipmOrMmMin > 0 ? length / ipmOrMmMin : 0;
  const cutMinutes = Math.floor(totalMinutes);
  const cutSeconds = Math.round((totalMinutes - cutMinutes) * 60);

  // Chip Thinning (High Efficiency Machining / Dynamic Milling) Calculations (Inspired by Garr Tool)
  // Engagement Factor (Ef) & Radial Stepover %
  const radialStepoverPercent = Math.min(100, Math.max(0.1, (woc / dia) * 100));
  const isChipThinningActive = radialStepoverPercent < 50.0;
  
  let chipThinningMultiplier = 1.0;
  let revisedCpt = tCpt;
  let revisedFeedRate = rpm * flutes * tCpt;

  if (isChipThinningActive && woc < (dia * 0.5)) {
    // Garr Tool Chip Thinning Formula:
    // Revised Programmed CPT = Target CPT * [ (0.5 * (Dia / WOC)) / sqrt((Dia / WOC) - 1) ]
    const ratio = dia / woc;
    const num = 0.5 * ratio;
    const den = Math.sqrt(Math.max(0.0001, ratio - 1));
    chipThinningMultiplier = den > 0 ? num / den : 1.0;
    revisedCpt = tCpt * chipThinningMultiplier;
    revisedFeedRate = rpm * flutes * revisedCpt;
  }

  // Spindle Power (HP / kW) & Torque Calculations (Kennametal & Industrial standard)
  const spindleEfficiency = 0.80; // Assuming 80% motor-to-spindle efficiency
  const effectiveMrr = activeTab === 'chip_thinning' ? (woc * doc * revisedFeedRate) : (unit === 'imperial' ? mrr : (woc * doc * ipmOrMmMin) / 1000);
  
  let horsepower = 0;
  let kilowatts = 0;
  let torqueInLb = 0;
  let torqueNm = 0;

  if (unit === 'imperial') {
    horsepower = (effectiveMrr * matPreset.kFactor) / spindleEfficiency;
    kilowatts = horsepower * 0.7457;
    torqueInLb = rpm > 0 ? (horsepower * 63025) / rpm : 0;
    torqueNm = torqueInLb * 0.112985;
  } else {
    // In metric, convert cm³/min MRR to in³/min for K-factor multiplication (1 cm³ = 0.0610237 in³)
    const effectiveMrrIn3 = effectiveMrr * 0.0610237;
    horsepower = (effectiveMrrIn3 * matPreset.kFactor) / spindleEfficiency;
    kilowatts = horsepower * 0.7457;
    torqueNm = rpm > 0 ? (kilowatts * 9549) / rpm : 0;
    torqueInLb = torqueNm / 0.112985;
  }

  // Theoretical Surface Roughness (Ra) Prediction based on Feed per Tooth & Corner Radius
  // Ra (µin) = (fz² / (32 * R)) * 1,000,000 (where fz and R are in inches)
  const effectiveFz = activeTab === 'chip_thinning' ? revisedCpt : feedVal;
  let raMicroInches = 0;
  let raMicrons = 0;
  if (unit === 'imperial') {
    raMicroInches = (Math.pow(effectiveFz, 2) / (32 * radius)) * 1000000;
    raMicrons = raMicroInches * 0.0254;
  } else {
    // fz and R in mm -> Ra in µm = (fz² / (32 * R)) * 1000
    raMicrons = (Math.pow(effectiveFz, 2) / (32 * radius)) * 1000;
    raMicroInches = raMicrons / 0.0254;
  }

  let finishQuality = 'Commercial Finish';
  if (raMicroInches < 16) finishQuality = 'Mirror / Precision Ground Quality';
  else if (raMicroInches < 32) finishQuality = 'Fine Precision Milled Finish';
  else if (raMicroInches < 63) finishQuality = 'Standard Commercial Finish';
  else finishQuality = 'Roughing Pass / Semi-Finish';

  return {
    dia, speedVal, feedVal, woc, doc, length, tCpt,
    rpm, ipmOrMmMin, mrr, cutMinutes, cutSeconds,
    radialStepoverPercent, isChipThinningActive, chipThinningMultiplier, revisedCpt, revisedFeedRate,
    horsepower, kilowatts, torqueInLb, torqueNm,
    raMicroInches, raMicrons, finishQuality,
  };
}
