import React, { useState, useMemo } from 'react';

// ---------------------------------------------------------------------------
// Screw Head, Drive & Fastener Type SVG Library
// Schematic renderings of common drive recesses (top view), head shapes
// (side profile) and full fastener types, plus socket-cap hex key sizes.
// ---------------------------------------------------------------------------

import { FASTENER_LIBRARY } from './library';
import { SPEC_INFO } from './data/specInfo';
import { HEX_WRENCH_SIZES, ROBERTSON_SIZES, SOCKET_HEX_KEYS } from './data/sizeCharts';
import { GROUP_META } from './data/groupMeta';
import type { Group, GroupFilter } from './types';

export { FASTENER_LIBRARY } from './library';
export { SPEC_INFO } from './data/specInfo';
export type { SpecInfo } from './types';
export { HEX_WRENCH_SIZES, ROBERTSON_SIZES, SOCKET_HEX_KEYS } from './data/sizeCharts';

export const ScrewHeadIndex: React.FC = () => {
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('screw-sockethead');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FASTENER_LIBRARY.filter(f =>
      (groupFilter === 'all' || f.group === groupFilter) &&
      (!q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q))
    );
  }, [groupFilter, searchQuery]);

  const sel = useMemo(() => FASTENER_LIBRARY.find(f => f.id === selectedId) || FASTENER_LIBRARY[0], [selectedId]);
  const selMeta = GROUP_META[sel.group];
  const showKeys = sel.id === 'screw-sockethead' || sel.id === 'head-socket' || sel.id === 'drive-hex' || sel.id === 'head-button' || sel.id === 'screw-set';
  const showWrench = sel.group === 'nut' || ['head-hex', 'head-hexwasher', 'screw-hexbolt', 'screw-lag', 'screw-selfdrill'].includes(sel.id);

  const counts = useMemo(() => ({
    drive: FASTENER_LIBRARY.filter(f => f.group === 'drive').length,
    head: FASTENER_LIBRARY.filter(f => f.group === 'head').length,
    screw: FASTENER_LIBRARY.filter(f => f.group === 'screw').length,
    nut: FASTENER_LIBRARY.filter(f => f.group === 'nut').length,
  }), []);

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '10px 0' }}>
      {/* Compact Title Bar */}
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0 }}>
          🪛 Screw Head & Drive Index <span style={{ color: 'var(--accent-cyan)', fontWeight: 400 }}>// SVG Fastener Library</span>
        </h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(Object.keys(GROUP_META) as Group[]).map(gp => (
            <div key={gp} style={{ padding: '4px 12px', borderRadius: '8px', background: GROUP_META[gp].bg, border: `1px solid ${GROUP_META[gp].border}`, fontSize: '0.78rem', color: GROUP_META[gp].color }}>
              <strong>{counts[gp]}</strong> {GROUP_META[gp].label.toLowerCase()}s
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) 1fr', gap: '25px', alignItems: 'start' }}>

        {/* Left: Selected Fastener Detail */}
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
          {SPEC_INFO[sel.id] && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '12px 14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SPEC_INFO[sel.id].standard && (
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '2px' }}>
                    GOVERNING STANDARD
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>
                    {SPEC_INFO[sel.id].standard}
                  </span>
                </div>
              )}
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '2px' }}>
                  HOW IT'S MEASURED
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  {SPEC_INFO[sel.id].measurement}
                </p>
              </div>
              {SPEC_INFO[sel.id].sizes && (
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '6px' }}>
                    STANDARD SIZES
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {SPEC_INFO[sel.id].sizes!.map(s => (
                      <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '3px 8px', color: 'var(--text-primary)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Robertson square recess dimension table with driver color codes */}
          {(sel.id === 'drive-square' || sel.id === 'drive-8point' || sel.id === 'drive-phillips-square' || sel.id === 'drive-square-slot') && (
            <div style={{ background: 'rgba(22, 163, 74, 0.05)', border: '1px solid rgba(22, 163, 74, 0.3)', padding: '12px 14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
                SQUARE RECESS DIMENSIONS & DRIVER COLOR CODE
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-muted)', textAlign: 'left' }}>
                      <th style={{ padding: '4px 8px' }}>Color</th>
                      <th style={{ padding: '4px 8px' }}>No</th>
                      <th style={{ padding: '4px 8px' }}>Screw Sizes</th>
                      <th style={{ padding: '4px 8px' }}>Fraction</th>
                      <th style={{ padding: '4px 8px' }}>Range (in)</th>
                      <th style={{ padding: '4px 8px' }}>Range (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROBERTSON_SIZES.map(r => (
                      <tr key={r.no} style={{ borderTop: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '5px 8px', whiteSpace: 'nowrap' }}>
                          <span style={{ display: 'inline-block', width: '11px', height: '11px', borderRadius: '2px', background: r.swatch, border: '1px solid rgba(255,255,255,0.35)', marginRight: '6px', verticalAlign: 'middle' }} />
                          <span style={{ color: '#fff' }}>{r.color}</span>
                        </td>
                        <td style={{ padding: '5px 8px', color: '#16a34a', fontWeight: 700 }}>{r.no}</td>
                        <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{r.screws}</td>
                        <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{r.fraction}</td>
                        <td style={{ padding: '5px 8px', color: '#fff' }}>{r.rangeIn}</td>
                        <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{r.rangeMm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Hex bolt / nut wrench sizes */}
          {showWrench && (
            <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '12px 14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
                HEX WRENCH SIZES (ACROSS FLATS)
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {HEX_WRENCH_SIZES.map(k => (
                  <span key={k.size} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 8px' }}>
                    <strong style={{ color: '#fff' }}>{k.size}</strong>
                    <span style={{ color: '#fbbf24' }}> → {k.wrenchMm} mm</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Socket cap hex key sizes */}
          {showKeys && (
            <div style={{ background: 'rgba(244, 144, 44, 0.06)', border: '1px solid rgba(244, 144, 44, 0.25)', padding: '12px 14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
                SOCKET CAP — HEX KEY SIZES
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {SOCKET_HEX_KEYS.map(k => (
                  <span key={k.size} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 8px' }}>
                    <strong style={{ color: '#fff' }}>{k.size}</strong>
                    <span style={{ color: 'var(--accent-cyan)' }}> → {k.keyMm} mm</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Library Grid */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
              {(['all', 'drive', 'head', 'screw', 'nut'] as GroupFilter[]).map(gp => {
                const active = groupFilter === gp;
                const color = gp === 'all' ? '#fff' : GROUP_META[gp].color;
                return (
                  <button
                    key={gp}
                    onClick={() => setGroupFilter(gp)}
                    style={{
                      padding: '7px 14px', border: 'none', borderRadius: '6px',
                      background: active ? (gp === 'all' ? 'rgba(255,255,255,0.15)' : GROUP_META[gp].bg) : 'transparent',
                      color: active ? color : 'var(--text-secondary)',
                      fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s ease',
                      boxShadow: active && gp !== 'all' ? `inset 0 0 0 1px ${GROUP_META[gp].border}` : 'none'
                    }}
                  >
                    {gp === 'all' ? 'All' : gp === 'drive' ? 'Drive Types' : gp === 'head' ? 'Head Shapes' : gp === 'screw' ? 'Screw Types' : 'Nut Types'}
                  </button>
                );
              })}
            </div>
            <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
              <input
                type="text"
                placeholder="Search fasteners (e.g., torx, countersunk, carriage)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-precision"
                style={{ width: '100%', paddingLeft: '34px' }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--text-muted)' }}>🔍</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(118px, 1fr))', gap: '10px' }}>
            {filtered.map(f => {
              const meta = GROUP_META[f.group];
              const isSel = f.id === selectedId;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedId(f.id)}
                  style={{
                    background: isSel ? meta.bg : 'var(--bg-primary)',
                    border: '1px solid',
                    borderColor: isSel ? meta.color : 'var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 8px 8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.borderColor = meta.border; }}
                  onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  <div style={{ width: f.group === 'drive' ? '58px' : '52px', height: f.group === 'screw' ? '84px' : '58px' }}>
                    {f.render()}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isSel ? meta.color : 'var(--text-primary)', lineHeight: 1.25 }}>
                    {f.name}
                  </span>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No fasteners match the current filter.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer: tool description (kept out of the header per site convention) */}
      <div className="glass-panel" style={{ marginTop: '25px', padding: '16px 22px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
          FASTENER IDENTIFICATION REFERENCE // SVG LIBRARY
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
          Schematic SVG library of <strong style={{ color: GROUP_META.drive.color }}>drive recesses</strong> (top view),{' '}
          <strong style={{ color: GROUP_META.head.color }}>head shapes</strong> (side profile),{' '}
          <strong style={{ color: GROUP_META.screw.color }}>screw &amp; bolt types</strong> (full body) and{' '}
          <strong style={{ color: GROUP_META.nut.color }}>nut types</strong> for identifying fasteners on the bench.
          Select any glyph for an enlarged rendering and usage notes. Socket-drive items include the metric hex key chart
          (M3 → 2.5 mm through M16 → 14 mm); hex heads and nuts include the wrench-across-flats chart (M4 → 7 mm through M30 → 46 mm).
        </p>
      </div>
    </div>
  );
};

export default ScrewHeadIndex;
