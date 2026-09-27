import React from 'react';
import { InfoBox } from '../../common/InfoBox';
import { GUIDE_BOXES } from '../data/manualNotes';
import { RichText } from '../RichText';

/** MAIN VIEW 5: MANUAL & SETUP GUIDE (Pages 11-25) */
export const ManualGuideTab: React.FC<{ onReturn: () => void }> = ({ onReturn }) => (
  <div className="glass-panel" style={{ padding: '40px', background: 'var(--bg-primary)' }}>
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f59e0b', marginBottom: '10px', borderBottom: '2px solid rgba(245, 158, 11, 0.3)', paddingBottom: '12px' }}>
        📖 Gorton P1-2 Maintenance & Setup Reference
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.05rem', lineHeight: 1.6 }}>
        Key toolroom procedures extracted directly from Gorton Manual 2701-A for machine leveling, pantograph bar installation, lubrication schedules, and spindle maintenance.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '25px' }}>
        {GUIDE_BOXES.map(box => (
          <InfoBox key={box.title} title={box.title} color={box.color}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              <RichText text={box.body} />
            </p>
          </InfoBox>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '35px' }}>
        <button
          onClick={onReturn}
          style={{
            padding: '12px 28px',
            background: '#f59e0b',
            color: '#000',
            border: 'none',
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          ← Return to Bar Setting Calculator
        </button>
      </div>
    </div>
  </div>
);
