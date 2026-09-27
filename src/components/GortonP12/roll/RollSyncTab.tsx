import React from 'react';
import { ROLL_CARD, SPECIAL_REDUCTIONS_CARD, STYLUS_CARD } from '../data/manualNotes';
import { NoteCard } from './NoteCard';
import { StylusCutterSync } from './StylusCutterSync';

type RollSyncTabProps = React.ComponentProps<typeof StylusCutterSync>;

/** MAIN VIEW 2: TRACING STYLUS, ROLL ENGRAVING & SPECIAL REDUCTIONS */
export const RollSyncTab: React.FC<RollSyncTabProps> = (props) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '30px' }}>
    <StylusCutterSync {...props} />
    <NoteCard card={STYLUS_CARD} />
    <NoteCard card={ROLL_CARD} />
    <NoteCard card={SPECIAL_REDUCTIONS_CARD} />
  </div>
);
