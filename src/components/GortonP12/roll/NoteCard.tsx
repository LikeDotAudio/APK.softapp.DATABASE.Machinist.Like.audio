import React from 'react';
import type { NoteCardData } from '../data/manualNotes';
import { RichText } from '../RichText';

/** A titled glass card of manual notes, each note a bordered block with a bold heading. */
export const NoteCard: React.FC<{ card: NoteCardData }> = ({ card }) => (
  <div className="glass-panel" style={{ padding: '35px', borderTop: `3px solid ${card.color}`, background: 'var(--bg-primary)' }}>
    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: card.color, marginBottom: '12px' }}>
      {card.title}
    </h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
      {card.intro}
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
      {card.items.map(item => (
        <div key={item.title} style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '6px', borderLeft: `4px solid ${item.color}` }}>
          <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>{item.title}</strong>
          <RichText text={item.body} />
        </div>
      ))}
    </div>
  </div>
);
