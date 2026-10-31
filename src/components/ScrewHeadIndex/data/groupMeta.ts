import type { Group, GroupFilter, GroupStyle } from '../types';

export const GROUP_META: Record<Group, GroupStyle> = {
  drive: { label: 'Drive Type', color: 'var(--accent)', bg: 'rgba(var(--apk-accent-rgb), 0.12)', border: 'rgba(var(--apk-accent-rgb), 0.4)' },
  head: { label: 'Head Shape', color: '#00ff80', bg: 'rgba(0, 255, 128, 0.1)', border: 'rgba(0, 255, 128, 0.35)' },
  screw: { label: 'Screw / Bolt Type', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.4)' },
  nut: { label: 'Nut Type', color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)' },
};

/** The filter bar's buttons, in order, with their labels. */
export const FILTER_BUTTONS: { id: GroupFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'drive', label: 'Drive Types' },
  { id: 'head', label: 'Head Shapes' },
  { id: 'screw', label: 'Screw Types' },
  { id: 'nut', label: 'Nut Types' },
];
