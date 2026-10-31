# Known Issues — Machinist.Like.audio

Measured 2026-10-30.

- **Committed `dist/` is still rebuilt by hand.** `npm run check:dist` now catches drift, and the deploy workflow runs it before building, so a stale `dist/` fails the machinist.like.audio deploy; nothing runs it before a commit.
- **Lint warnings.** `oxlint` reports `react-hooks/exhaustive-deps` in `Knurling.tsx` and `ThreadingChangeGears.tsx`, and `only-export-components` in components that also export data.
- **No offline mode.** The app is installable (`public/manifest.json`) but registers no service worker.

Fixed 2026-10-30: one chunk per tool (27 lazy chunks, ~250 kB main); unit tests of the math (`npm test`); the bundle now runs from a sub-path (`base: './'`); the launcher's source page hands over to `dist/`; the Screw Head & Drive Library reads the unit setting; the misspelt `HardingeDivigingHead` alias is gone; the hub follows the requested category regroup.
