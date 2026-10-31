import React from 'react';
import { ToolFooterNote } from '../common/ToolFooterNote';
import { FastenerGrid } from './browse/FastenerGrid';
import { IndexTitleBar } from './browse/IndexTitleBar';
import { GROUP_META } from './data/groupMeta';
import { FastenerDetail } from './detail/FastenerDetail';
import { useFastenerFilter } from './hooks/useFastenerFilter';

// ---------------------------------------------------------------------------
// Screw Head, Drive & Fastener Type SVG Library
// Schematic renderings of common drive recesses (top view), head shapes
// (side profile) and full fastener types, plus socket-cap hex key sizes.
// ---------------------------------------------------------------------------

export const ScrewHeadIndex: React.FC = () => {
  const { groupFilter, setGroupFilter, searchQuery, setSearchQuery, selectedId, setSelectedId, filtered, sel, counts } = useFastenerFilter();

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '10px 0' }}>
      <IndexTitleBar counts={counts} />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) 1fr', gap: '25px', alignItems: 'start' }}>
        <FastenerDetail sel={sel} />

        <FastenerGrid
          groupFilter={groupFilter}
          setGroupFilter={setGroupFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filtered={filtered}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>

      <ToolFooterNote heading="FASTENER IDENTIFICATION REFERENCE // SVG LIBRARY" color="var(--accent)" marginTop="25px">
        Schematic SVG library of <strong style={{ color: GROUP_META.drive.color }}>drive recesses</strong> (top view),{' '}
        <strong style={{ color: GROUP_META.head.color }}>head shapes</strong> (side profile),{' '}
        <strong style={{ color: GROUP_META.screw.color }}>screw &amp; bolt types</strong> (full body) and{' '}
        <strong style={{ color: GROUP_META.nut.color }}>nut types</strong> for identifying fasteners on the bench.
        Select any glyph for an enlarged rendering and usage notes. Socket-drive items include the metric hex key chart
        (M3 → 2.5 mm through M16 → 14 mm); hex heads and nuts include the wrench-across-flats chart (M4 → 7 mm through M30 → 46 mm).
      </ToolFooterNote>
    </div>
  );
};

export default ScrewHeadIndex;
