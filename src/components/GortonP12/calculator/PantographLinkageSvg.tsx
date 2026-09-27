import React from 'react';
import { SvgGridPattern } from '../../common/SvgGridPattern';
import type { PantographGeometry } from '../gorton.math';

interface PantographLinkageSvgProps {
  ratio: number;
  geo: PantographGeometry;
}

/** KINEMATIC PANTOGRAPH LINKAGE VISUALIZER — the linkage drawing, its overlays and legend. */
export const PantographLinkageSvg: React.FC<PantographLinkageSvgProps> = ({ ratio, geo }) => {
  const { svgW, svgH, anchorX, anchorY, lowerBlockX, lowerBlockY, upperBlockX, upperBlockY, stylusX, stylusY, spindleX, spindleY } = geo;
  return (
    <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)', border: '1px solid rgba(255,255,255,0.08)', order: -1 }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            TOP-DOWN LINKAGE TELEMETRY
          </span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
            Kinematic Ratio Geometry ({ratio.toFixed(1)}:1)
          </h4>
        </div>
        <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.4)', fontWeight: 700 }}>
          LIVE CALIBRATED
        </span>
      </div>

      {/* SVG Canvas */}
      <div style={{ position: 'relative', width: `${svgW}px`, height: `${svgH}px`, background: '#090d16', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)' }}>
        <svg width={svgW} height={svgH}>
          <defs>
            <SvgGridPattern id="pantoGrid" size={20} opacity={0.03} />
          </defs>
          
          <rect width={svgW} height={svgH} fill="url(#pantoGrid)" />

          {/* Copy Table Outline (Right Side) */}
          <rect x={stylusX - 50} y={stylusY - 40} width="110" height="80" fill="rgba(255,255,255,0.02)" stroke="#475569" strokeDasharray="4 2" rx="4" />
          <text x={stylusX} y={stylusY + 55} fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="bold">COPY / MASTER TABLE</text>

          {/* Work Table Outline (Left Side under Spindle) */}
          <rect x={spindleX - 45} y={spindleY - 35} width="90" height="70" fill="rgba(244, 144, 44, 0.04)" stroke="#f4902c" strokeDasharray="4 2" rx="4" />
          <text x={spindleX} y={spindleY + 50} fill="#f4902c" fontSize="10" textAnchor="middle" fontWeight="bold">WORK TABLE (ENGRAVING)</text>

          {/* LINKAGE BARS */}
          {/* 1. Tracer Arm (Long Arm from Pivot to Stylus) */}
          <line x1={anchorX} y1={anchorY} x2={stylusX} y2={stylusY} stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
          <line x1={anchorX} y1={anchorY} x2={stylusX} y2={stylusY} stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

          {/* 2. Lower Slider Bar (From Lower Block to Spindle Link) */}
          <line x1={lowerBlockX} y1={lowerBlockY} x2={spindleX} y2={spindleY} stroke="#f4902c" strokeWidth="7" strokeLinecap="round" />
          <line x1={lowerBlockX} y1={lowerBlockY} x2={spindleX} y2={spindleY} stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />

          {/* 3. Upper Slider Bar (Parallel support) */}
          <line x1={upperBlockX} y1={upperBlockY} x2={spindleX - 20} y2={spindleY - 40} stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />

          {/* 4. Cutter Head Link (Vertical connecting link) */}
          <line x1={spindleX - 20} y1={spindleY - 40} x2={spindleX} y2={spindleY} stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />

          {/* PIVOT JOINTS / BLOCKS */}
          {/* Anchor Column Base */}
          <circle cx={anchorX} cy={anchorY} r="10" fill="#1e293b" stroke="#fff" strokeWidth="2" />
          <circle cx={anchorX} cy={anchorY} r="4" fill="#fff" />
          <text x={anchorX - 15} y={anchorY - 12} fill="#cbd5e1" fontSize="11" fontWeight="bold">Column Pivot</text>

          {/* Lower Slider Block (Graduation setting point!) */}
          <rect x={lowerBlockX - 12} y={lowerBlockY - 12} width="24" height="24" fill="#f4902c" stroke="#000" strokeWidth="2" rx="4" />
          <text x={lowerBlockX + 18} y={lowerBlockY + 4} fill="#f4902c" fontSize="11" fontWeight="bold">Lower Block ("F")</text>

          {/* Upper Slider Block */}
          <rect x={upperBlockX - 10} y={upperBlockY - 10} width="20" height="20" fill="#f59e0b" stroke="#000" strokeWidth="2" rx="4" />
          <text x={upperBlockX + 15} y={upperBlockY + 4} fill="#f59e0b" fontSize="11" fontWeight="bold">Upper Block ("H")</text>

          {/* Tracer Stylus Point (Right) */}
          <circle cx={stylusX} cy={stylusY} r="8" fill="#ec4899" stroke="#fff" strokeWidth="2" />
          <circle cx={stylusX} cy={stylusY} r="3" fill="#fff" />
          <text x={stylusX} y={stylusY - 14} fill="#ec4899" fontSize="11" textAnchor="middle" fontWeight="bold">Stylus (3253 / 795-1)</text>

          {/* Cutter Spindle Point (Left over work) */}
          <circle cx={spindleX} cy={spindleY} r="9" fill="#00ff80" stroke="#fff" strokeWidth="2.5" />
          <circle cx={spindleX} cy={spindleY} r="3" fill="#000" />
          <text x={spindleX} y={spindleY - 16} fill="#00ff80" fontSize="11" textAnchor="middle" fontWeight="bold">Cutter Spindle (1/4" / 5/16")</text>
        </svg>

        {/* Telemetry Footer Overlay */}
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.9)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
          <span>Ratio: </span><strong style={{ color: '#f4902c' }}>{ratio.toFixed(2)} : 1</strong>
        </div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(15, 23, 42, 0.9)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
          <span>Scale Notch: </span><strong style={{ color: '#f59e0b' }}>Fig "{Math.round(ratio)}"</strong>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '25px', marginTop: '14px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', background: '#f4902c', borderRadius: '2px', display: 'inline-block' }}></span>
          <span>Lower Bar ("E" / "F")</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px', display: 'inline-block' }}></span>
          <span>Upper Bar ("G" / "H")</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', background: '#00ff80', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>Cutter Spindle</span>
        </div>
      </div>

    </div>
  );
};
