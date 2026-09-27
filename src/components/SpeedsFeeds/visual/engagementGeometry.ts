// Pixel geometry of the cutter, the stock and the contact arc for the engagement drawing.

export function engagementGeometry(dia: number, woc: number) {
  const svgSize = 340;
  const center = svgSize / 2;
  const maxRadiusPx = 110; // Pixels representing tool radius
  const scale = (maxRadiusPx * 2) / dia;
  const wocPx = woc * scale;

  // Workpiece box boundary coordinates
  const blockRightX = center + maxRadiusPx;
  const blockLeftX = blockRightX - wocPx;
  const blockTopY = 30;
  const blockHeight = svgSize - 60;

  // Calculate arc intersection angle for visualization
  const cosVal = Math.max(-1, Math.min(1, (maxRadiusPx - wocPx) / maxRadiusPx));
  const contactAngleRad = Math.acos(cosVal);
  const contactAngleDeg = contactAngleRad * (180 / Math.PI);

  return { svgSize, center, maxRadiusPx, scale, wocPx, blockRightX, blockLeftX, blockTopY, blockHeight, contactAngleRad, contactAngleDeg };
}

export type EngagementGeometry = ReturnType<typeof engagementGeometry>;
