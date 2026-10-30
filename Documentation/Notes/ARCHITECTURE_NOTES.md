# Architecture Notes — Machinist.Like.audio

- **Shell** — `src/main.tsx` mounts `App` inside `UnitProvider`. `src/App.tsx` owns the hub
  (`HUB_CATEGORIES`, `HUB_TOOLS`), the active tab (React state, not the URL), the splash screen
  and the install offer.
- **Tools** — one folder per tool under `src/components/`, each exporting its page component
  from `index.ts`. The large ones are split into pure math, data, hooks and view parts under a
  thin page: `SheetMetalBending/` (`bend.math.ts`, `calculator/`, `data/`, `diagram/`, `hooks/`,
  `simulator/`, `specs/`), `SpeedsFeeds/` (`cutting.math.ts` → `solveCut`), `ScrewHeadIndex/`
  (`data/`, `hooks/`, `library/`, `browse/`, `detail/`, `glyphs/`).
- **Shared parts** — `src/components/common/`: `ToolHeader`, `ModuleTabBar`, `ToolFooterNote`,
  `FormulaSheet`, `InfoBox`, `SvgGridPattern`, and the `useUnitChange` hook.
- **Units** — `src/context/UnitContext.tsx` (one `imperial`/`metric` value for the app) and
  `src/lib/units.ts` (25.4 and the field rewrites on a unit flip).
- **Build** — Vite 8 + React 19 + TypeScript 6; `npm run build` is `tsc -b && vite build`.
