import React from 'react';

interface SpindleTelemetryCardProps {
  calculatedRpm: number;
  sfmRaw: string;
  coolantRec: string;
}

/** Box 3: Spindle Telemetry Dashboard Card — recommended RPM, chart SFM and coolant. */
export const SpindleTelemetryCard: React.FC<SpindleTelemetryCardProps> = ({ calculatedRpm, sfmRaw, coolantRec }) => (
  <div style={{
    background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
    padding: '24px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid rgba(16, 185, 129, 0.4)',
    boxShadow: '0 10px 30px -5px rgba(16, 185, 129, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '220px'
  }}>
    <div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
        RECOMMENDED SPINDLE SPEED
      </span>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 700, color: '#10b981', textShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
        {calculatedRpm > 0 ? calculatedRpm.toLocaleString() : 'N/A'} <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>RPM</span>
      </div>
    </div>

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      <div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Surface Velocity:</span>
        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#fff' }}>{sfmRaw || 'N/A'} SFM</strong>
      </div>
      <div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Recommended Coolant:</span>
        <strong style={{ fontSize: '0.95rem', color: '#38bdf8' }}>{coolantRec || 'Dry'}</strong>
      </div>
    </div>
  </div>
);
