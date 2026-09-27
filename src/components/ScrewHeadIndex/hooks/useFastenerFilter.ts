import { useMemo, useState } from 'react';
import { FASTENER_LIBRARY } from '../library';
import type { GroupFilter } from '../types';

/** Page state: group filter, search text, the selected glyph, the filtered list and group counts. */
export function useFastenerFilter() {
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

  const counts = useMemo(() => ({
    drive: FASTENER_LIBRARY.filter(f => f.group === 'drive').length,
    head: FASTENER_LIBRARY.filter(f => f.group === 'head').length,
    screw: FASTENER_LIBRARY.filter(f => f.group === 'screw').length,
    nut: FASTENER_LIBRARY.filter(f => f.group === 'nut').length,
  }), []);

  return { groupFilter, setGroupFilter, searchQuery, setSearchQuery, selectedId, setSelectedId, filtered, sel, counts };
}
