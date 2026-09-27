import type { ActiveParams, BendResults } from '../types';

/** The text the "Copy Bending Report to Clipboard" button writes. */
export function buildBendReport(activeParams: ActiveParams, calculations: BendResults, unitLabel: string): string {
  return `PRECISION BENDING REPORT (${activeParams.specName})\n` +
    `Flat Pattern Length: ${calculations.flatLength.toFixed(3)} ${unitLabel}\n` +
    `Bend Deduction (BD): ${calculations.BD.toFixed(4)} ${unitLabel}\n` +
    `Bend Allowance (BA): ${calculations.BA.toFixed(4)} ${unitLabel}\n` +
    `Left Bend Line: ${calculations.leftBendLine.toFixed(3)} ${unitLabel} from edge\n` +
    `Right Bend Line: ${calculations.rightBendLine.toFixed(3)} ${unitLabel} from edge`;
}
