# Architecture — Machinist.Like.audio

A single-page React 19 + TypeScript 6 app built by Vite 8. No back end, no fetch, no storage: every number is computed in the browser from the inputs on screen.

## Use it
```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build -> dist/ (committed; rebuild and commit with every src/ change)
npm run check:dist # scripts/check-dist.mjs: the committed dist/ must equal a fresh build
npm run lint       # oxlint
npm run preview
```

## Entry points
| Opened as | What runs |
|---|---|
| `npm run dev` | root `index.html` → `/src/main.tsx` through Vite |
| `dist/index.html` (machinist.like.audio root, or `APK:Softapps/…/dist/`) | the built bundle; all URLs are relative (`base: './'` in `vite.config.ts`) |
| root `index.html` served as a plain file (the OS launcher, apk.audio, a node) | its inline script sees neither `/@vite/client` nor `./assets/…` and `location.replace`s to `dist/index.html` |

## Inside
- **Shell** — `src/main.tsx` mounts `App` inside `UnitProvider`. `src/App.tsx` owns the hub: `HUB_CATEGORIES` (line 85; nine categories plus *All*) and `HUB_TOOLS` (line 98; 28 tools, each `{ id, category, icon, title, description }`), the active tab in React state (not the URL, line 130), the hub category filter, a `SplashScreen` on load, and an install offer driven by `beforeinstallprompt`.
- **Categories** — Metrology, Inspection & GD&T · Holemaking & Layout · Threading & Fasteners · Lathe & Turning · Milling, Gearing & Machine Setup · Machining Math & Geometry · Metallurgy & Materials · Welding · Fabrication.
- **Tools** — one folder per tool under `src/components/`, each exporting its page from `index.ts`. The large ones are split into pure math, data, hooks and view parts under a thin page: `SheetMetalBending/` (`bend.math.ts`, `calculator/`, `data/`, `diagram/`, `hooks/`, `simulator/`, `specs/`), `SpeedsFeeds/` (`cutting.math.ts` → `solveCut`), `ScrewHeadIndex/` (`data/`, `hooks/`, `library/`, `browse/`, `detail/`, `glyphs/`).
- **Shared parts** — `src/components/common/`: `ToolHeader`, `ModuleTabBar`, `ToolFooterNote`, `FormulaSheet`, `InfoBox`, `SvgGridPattern`, and the `useUnitChange` hook.
- **Units** — `src/context/UnitContext.tsx` holds one `imperial`/`metric` value (default imperial), switched from the header; `src/lib/units.ts` holds `MM_PER_IN`, `toMm`, `toIn` and the field rewrites on a flip. Every tool reads the context except the Hardinge dividing head (divisions, no units); conversions call `toMm`/`toIn`.
- **Loading** — `App.tsx` imports the default Jo-block stack directly and every other tool with `React.lazy` behind one `Suspense`, so each tool is its own chunk.
- **Tests** — `npm test` (Vitest) runs `*.math.test.ts` and `src/lib/units.test.ts`.
- **Brand** — `src/main.tsx` imports `src/vendor/apk-contracts/apk-tokens.css` before `index.css`; `--accent` is `var(--apk-accent)`.
- **Install** — `public/manifest.json` (relative `start_url`/`scope`) makes it installable; there is no service worker, so it does not work offline.

## Reference pages
The long-form references the suites were built from sit beside this page: [Metalurgy.md](Metalurgy.md), [sheetmetal expanded.md](sheetmetal%20expanded.md), [welding Calc.md](welding%20Calc.md).
