# Principles — Machinist.Like.audio

Each principle with the code that keeps it. Ecosystem rules: the APK.audio root's `Documentation/🏛Philosophy/` (cited by path).

| Principle | Kept by |
|---|---|
| **One unit setting, not one per panel.** Metric/imperial is app state, read by every tool that has units. | `src/context/UnitContext.tsx` `useUnit()`; 64 `useUnit` call sites under `src/`; the Screw Head library's `detail/SizeChipList.tsx` and `detail/RobertsonTable.tsx` |
| **25.4 lives in one file.** | `src/lib/units.ts:4` `MM_PER_IN`, `toMm`, `toIn` |
| **Show the formula.** Tools carry their working beside the answer. | `src/components/common/FormulaSheet`, `ToolFooterNote`; the Speeds & Feeds formulas view |
| **Thin shells over pure math.** Large tools split types, data, pure solvers and hooks under a thin page. | `SheetMetalBending/bend.math.ts`; `SpeedsFeeds/cutting.math.ts:8` `solveCut()`; `ScrewHeadIndex/{data,hooks,library}` |
| **Nothing leaves the browser.** No `fetch`, no `localStorage`, no bus. | `grep -rln "fetch(\|localStorage\|mqtt" src` → nothing (2026-10-30) |
| **One build, every address.** Relative URLs, so the same `dist/` draws at a site root and under a sub-path; a plain-file open of the source hands over to the build. | `vite.config.ts` `base: './'`; `public/manifest.json`; the inline script in `index.html` |
| **Say only what the code does.** Category blurbs name what the tools hold (e.g. metallurgy lists forging/annealing/solidus/liquidus/casting ranges, no heat-colour chart). Root: `Doctrine/readme.Refusal over fabrication.md`. | `src/App.tsx:85` `HUB_CATEGORIES` |

## Where it falls short
- One ~900 kB JS chunk; nothing is code-split (Vite warns).
- `dist/` is committed by hand; `npm run check:dist` (`scripts/check-dist.mjs`) holds it to `src/`, run by the deploy workflow, not by a commit hook.
- `oxlint` warns (`react-hooks/exhaustive-deps` in `Knurling.tsx`, `ThreadingChangeGears.tsx`; `only-export-components` in data-exporting components).
- Installable but no service worker, so no offline mode.
