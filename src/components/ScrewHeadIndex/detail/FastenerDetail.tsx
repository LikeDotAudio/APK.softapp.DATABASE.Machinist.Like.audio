import React from 'react';
import { GROUP_META } from '../data/groupMeta';
import { HEX_WRENCH_SIZES, SOCKET_HEX_KEYS, showsHexKeys, showsRobertson, showsWrenchSizes } from '../data/sizeCharts';
import { SPEC_INFO } from '../data/specInfo';
import type { FastenerItem } from '../types';
import { RobertsonTable } from './RobertsonTable';
import { SizeChipList } from './SizeChipList';
import { SpecInfoPanel } from './SpecInfoPanel';

const WRENCH_CHIPS = HEX_WRENCH_SIZES.map(k => ({ size: k.size, mm: k.wrenchMm }));
const KEY_CHIPS = SOCKET_HEX_KEYS.map(k => ({ size: k.size, mm: k.keyMm }));

/** Left: Selected Fastener Detail — name, badge, big glyph, description and the charts that apply. */
export const FastenerDetail: React.FC<{ sel: FastenerItem }> = ({ sel }) => {
  const selMeta = GROUP_META[sel.group];
  const spec = SPEC_INFO[sel.id];
  return (
    <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 30, 48, 0.8) 100%)', position: 'sticky', top: '90px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>{sel.name}</h3>
        <span style={{ padding: '3px 10px', borderRadius: '14px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', color: selMeta.color, background: selMeta.bg, border: `1px solid ${selMeta.border}`, whiteSpace: 'nowrap' }}>
          {GROUP_META[sel.group].label.toUpperCase()}
        </span>
      </div>

      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: `2px solid ${selMeta.border}`, padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: sel.group === 'drive' ? '180px' : '150px', height: sel.group === 'screw' ? '260px' : '180px' }}>
          {sel.render(true)}
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
        {sel.description}
      </p>

      {/* Standards, measurement method & standard sizes for the selected item */}
      {spec && <SpecInfoPanel spec={spec} />}

      {/* Robertson square recess dimension table with driver color codes */}
      {showsRobertson(sel.id) && <RobertsonTable />}

      {/* Hex bolt / nut wrench sizes */}
      {showsWrenchSizes(sel) && (
        <SizeChipList heading="HEX WRENCH SIZES (ACROSS FLATS)" color="#fbbf24" background="rgba(245, 158, 11, 0.06)" border="rgba(245, 158, 11, 0.25)" items={WRENCH_CHIPS} />
      )}

      {/* Socket cap hex key sizes */}
      {showsHexKeys(sel.id) && (
        <SizeChipList heading="SOCKET CAP — HEX KEY SIZES" color="var(--accent-cyan)" background="rgba(244, 144, 44, 0.06)" border="rgba(244, 144, 44, 0.25)" items={KEY_CHIPS} />
      )}
    </div>
  );
};
