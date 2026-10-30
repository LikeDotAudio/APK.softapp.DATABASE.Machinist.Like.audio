# Known Issues — Machinist.Like.audio

Measured 2026-10-30.

- **The bundle only runs at a site root.** `vite.config.ts` sets no `base`, so `dist/index.html`
  requests `/assets/…`, `/favicon.svg` and `/manifest.json` absolutely.
- **The launcher opens the source page.** The APK.audio Softapps reader picks the root
  `index.html`, which loads `/src/main.tsx` and needs the Vite dev server; the built page is
  `dist/index.html`.
- **One ~900 kB JS chunk.** `vite build` warns that it exceeds 500 kB; nothing is code-split.
- **Lint warnings.** `oxlint` reports `react-hooks/exhaustive-deps` in `Knurling.tsx` and
  `ThreadingChangeGears.tsx`, and `only-export-components` in components that also export data.
- **Screw Head & Drive Library ignores the unit setting** — it does not read `UnitContext`.
- **No offline mode.** The app is installable (`public/manifest.json`) but registers no service
  worker.
