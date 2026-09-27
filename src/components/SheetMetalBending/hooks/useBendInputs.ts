import { useMemo, useState } from 'react';
import { useUnit } from '../../../context/UnitContext';
import { convertField } from '../../../lib/units';
import { useUnitChange } from '../../common/useUnitChange';
import { resolveActiveParams, solveFlatPattern } from '../bend.math';
import { SENDCUTSEND_BENDING_SPECS } from '../data/bendingSpecs';
import type { BendingSpec, LengthUnit } from '../types';

/** All calculator / diagram / spec-table state and the flat-pattern results derived from it. */
export function useBendInputs() {
  // Global Unit context
  const { unit: globalUnit } = useUnit();
  const unit: LengthUnit = globalUnit === 'imperial' ? 'in' : 'mm';

  // Material and Spec selection
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Mild Steel');
  const [selectedSpecIdx, setSelectedSpecIdx] = useState<number>(5); // 0.119" Mild Steel default
  const [isCustomSpec, setIsCustomSpec] = useState<boolean>(false);

  // Custom spec state
  const [customThickness, setCustomThickness] = useState<string>('0.119');
  const [customKFactor, setCustomKFactor] = useState<string>('0.38');
  const [customRadius, setCustomRadius] = useState<string>('0.063');

  // Part Geometry Inputs (Outside Dimensions)
  const [baseLength, setBaseLength] = useState<string>('10.000');
  const [leftFlange, setLeftFlange] = useState<string>('4.000');
  const [rightFlange, setRightFlange] = useState<string>('4.000');
  const [bendAngle, setBendAngle] = useState<number>(90);

  // Spec table search box
  const [searchMaterial, setSearchMaterial] = useState<string>('');

  // Rewrite the five length inputs when the global inch/mm toggle flips.
  useUnitChange(unit, (oldUnit, newUnit) => {
    if (newUnit === 'mm' && oldUnit === 'in') {
      setBaseLength(convertField(baseLength, true, 2));
      setLeftFlange(convertField(leftFlange, true, 2));
      setRightFlange(convertField(rightFlange, true, 2));
      setCustomThickness(convertField(customThickness, true, 3));
      setCustomRadius(convertField(customRadius, true, 3));
    } else if (newUnit === 'in' && oldUnit === 'mm') {
      setBaseLength(convertField(baseLength, false, 3));
      setLeftFlange(convertField(leftFlange, false, 3));
      setRightFlange(convertField(rightFlange, false, 3));
      setCustomThickness(convertField(customThickness, false, 3));
      setCustomRadius(convertField(customRadius, false, 3));
    }
  });

  // Filter specs for current material
  const availableSpecs = useMemo(() => {
    return SENDCUTSEND_BENDING_SPECS.filter(s => s.material === selectedMaterial);
  }, [selectedMaterial]);

  // Active Bending Parameters
  const activeParams = useMemo(
    () => resolveActiveParams({ isCustomSpec, availableSpecs, selectedSpecIdx, unit, customThickness, customRadius, customKFactor }),
    [isCustomSpec, availableSpecs, selectedSpecIdx, unit, customThickness, customRadius, customKFactor],
  );

  // Mathematical Bending Solver
  const calculations = useMemo(
    () => solveFlatPattern({ activeParams, bendAngle, baseLength, leftFlange, rightFlange, unit }),
    [activeParams, bendAngle, baseLength, leftFlange, rightFlange, unit],
  );

  // Handle Material switch
  const handleMaterialChange = (mat: string) => {
    setSelectedMaterial(mat);
    setIsCustomSpec(false);
    setSelectedSpecIdx(0);
  };

  /** Select a spec-table row's material and gauge. */
  const selectSpec = (spec: BendingSpec) => {
    setSelectedMaterial(spec.material);
    setIsCustomSpec(false);
    const matSpecs = SENDCUTSEND_BENDING_SPECS.filter(s => s.material === spec.material);
    const subIdx = matSpecs.findIndex(s => s.thicknessInches === spec.thicknessInches);
    if (subIdx >= 0) setSelectedSpecIdx(subIdx);
  };

  const unitLabel = unit === 'in' ? 'in' : 'mm';

  return {
    unit, unitLabel,
    selectedMaterial, selectedSpecIdx, setSelectedSpecIdx, isCustomSpec, setIsCustomSpec,
    customThickness, setCustomThickness, customKFactor, setCustomKFactor, customRadius, setCustomRadius,
    baseLength, setBaseLength, leftFlange, setLeftFlange, rightFlange, setRightFlange, bendAngle, setBendAngle,
    searchMaterial, setSearchMaterial,
    availableSpecs, activeParams, calculations,
    handleMaterialChange, selectSpec,
  };
}

export type BendInputs = ReturnType<typeof useBendInputs>;
