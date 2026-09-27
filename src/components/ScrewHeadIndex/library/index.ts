import { DRIVE_GLYPHS } from './drives';
import { HEAD_GLYPHS } from './heads';
import { NUT_GLYPHS } from './nuts';
import { SCREW_GLYPHS } from './screws';
import type { FastenerItem } from '../types';

// --- Library ---------------------------------------------------------------
// Drives, heads, screws, nuts — in this order: the grid order and FASTENER_LIBRARY[0] depend on it.
export const FASTENER_LIBRARY: FastenerItem[] = [...DRIVE_GLYPHS, ...HEAD_GLYPHS, ...SCREW_GLYPHS, ...NUT_GLYPHS];
