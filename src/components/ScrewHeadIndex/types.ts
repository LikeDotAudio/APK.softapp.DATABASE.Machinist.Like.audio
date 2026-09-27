import type React from 'react';

export type Group = 'drive' | 'head' | 'screw' | 'nut';

export type GroupFilter = 'all' | Group;

export interface FastenerItem {
  id: string;
  name: string;
  group: Group;
  description: string;
  render: (large?: boolean) => React.ReactElement;
}

// Governing standards, measurement method and standard size ranges per drive/head
// (ISO / DIN / ANSI-ASME reference data)
export interface SpecInfo {
  standard?: string;
  measurement: string;
  sizes?: string[];
}

export interface RobertsonSize { swatch: string; color: string; no: string; screws: string; fraction: string; rangeIn: string; rangeMm: string }
export interface WrenchSize { size: string; wrenchMm: number }
export interface HexKeySize { size: string; keyMm: number }

export interface GroupStyle { label: string; color: string; bg: string; border: string }
