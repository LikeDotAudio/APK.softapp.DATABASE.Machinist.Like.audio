# Machinist // Like.Audio

**Machinist.like.audio** is a single-page React app of shop-floor calculators and references for
toolroom machinists, fabricators and welders: metrology setups, holemaking, threading, gearing,
speeds and feeds, sheet-metal development, metallurgy and welding. It runs entirely in the
browser — no back end, no network requests of its own, nothing stored — and is published at
machinist.like.audio.

## The tools

The hub (`src/App.tsx`, `HUB_TOOLS`) lists **28 tools** under seven category filters
(`HUB_CATEGORIES`); the welding entry is itself six calculators.

| Category | Tools |
|---|---|
| 📐 Metrology & GD&T | Jo Block & Height Gauge (81-pc imperial / 87-pc metric sets) · Sine Bar & Sine Vise Angle · True Position (GD&T, MMC/LMC bonus, PASS/FAIL) · Fits & Tolerances (ISO/ANSI) · Surface Finish Conversion (Ra, RMS, Rz, CLA, ISO N) · Hardness & Tensile Conversion (HRC/HRB, HBW, HV) |
| ⚡ Machining & Milling | Gorton P1-2 Pantomill · Speeds & Feeds · Bolt Circle Layout · Bolt Circle Reverse-Engineering · Drill Point & Countersink Depth (118°/135°) · CNC Thread Milling Generator (G02/G03 G-code) |
| 🔩 Threading & Gears | Hardinge Dividing Head · Tap, Drill & Die Reference · Lathe Threading Change Gears · Interactive Drill Size Index · Interactive Tap & Thread Index (ISO metric, UNC/UNF) · Geometric Die Head Chasers · Spur Gear Calculator (Hardinge cutter M1–M8) · Screw Head & Drive Library |
| 🔥 Metallurgy & Materials | Material Weight & Stock Calc · Metallurgy & Thermal Suite (21 alloys) |
| 🧑‍🏭 Welding & Fabrication | Welding & Fabrication Suite — heat input, deposition, preheat & CE, weld volume, cost analysis, duty cycle |
| 🏗️ Sheet Metal Forming | Knurling Blank Diameter · Sheet Metal Bending Simulator |
| 🧭 Math & Geometry | Right Triangle Trig Solver · Polar ⇄ Rectangular Converter · Taper Angle & Standard Tapers (Morse, B&S, R8, CAT/BT) |

The three larger suites are worth describing in full.

## Sheet Metal Forming & Bending
These modules calculate flat pattern cut lengths, bend allowances, and deductions for sheet metal fabrication.
*   **Bend Allowance (BA):** Calculates the arc length of the bend along the material's neutral axis using the formula: $$BA = \frac{\pi \cdot (R + K \cdot T) \cdot A}{180}$$.
*   **Bend Deduction (BD):** Computes the material to subtract from outside dimensions to find the flat pattern length using the formula: $$BD = 2 \cdot (R + T) \cdot \tan\left(\frac{A}{2}\right) - BA$$.
*   **Flat Pattern Length (FL):** Calculates the total length of the raw sheet metal blank required before bending.
*   **K-Factor and Y-Factor:** Computes the neutral axis displacement ratio ($K$) and its radian modifier variation ($Y$).
*   **Outside Setback (OSSB):** Finds the distance from the bend tangent point to the apex of the outside corner.
*   **Developed Length (DL):** Computes the flattened arc length of curved sections.

---

## Metallurgy & Thermal Processing
`src/components/Metallurgy/Metallurgy.tsx` is a property table and two calculators over **21 alloys**
filtered as ferrous, aluminum, copper/brass, and specialty (titanium, zinc die-cast, lead).
*   **Alloy properties:** for each alloy, density, thermal expansion coefficient, forging range, annealing/normalizing range, solidus, liquidus and casting pour range, in °F and °C, with shop notes (e.g. gray cast iron: "do not forge").
*   **Stock Volume and Weight:** starting stock for round, square, hex, tubing and tapered bars. For example, the volume of a cylinder is determined by: $$V = \frac{\pi \times d^2 \times h}{4}$$.
*   **Thermal Expansion Calculator:** linear growth across a temperature difference, for shrink-fitting collars, sleeves and bearings.

There is no heat-colour chart and no precious-metal data in the code; `Documentation/🧩Manual and Artifacts/Metalurgy.md` covers both as reference text.

---

## Welding Calculators
This master fabrication suite contains six independent computational modules for welding professionals.
*   **Heat Input / Arc Energy Calculator:** Measures the electrical energy transferred into the base metal using the formula: $$HI = \frac{A \times V \times 60}{S \times 1000}$$.
*   **Deposition Rate Calculator:** Quantifies the mass of filler metal melted and deposited per hour of continuous arc time.
*   **Preheat Temperature & Carbon Equivalent (CE) Calculator:** Evaluates alloy hardenability to prevent Hydrogen-Induced Cold Cracking using the IIW method: $$CE_{\text{IIW}} = \%C + \frac{\%Mn}{6} + \frac{\%Cr + \%Mo + \%V}{5} + \frac{\%Ni + \%Cu}{15}$$.
*   **Weld Volume & Consumables Calculator:** Estimates consumable filler metal weight by determining the cross-sectional area of single-V and double-V butt joints.
*   **Welding Cost Analysis Calculator:** Combines labor rates, wire consumption, gas flow, and overhead to provide a Cost Per Foot and Total Job Bid Cost.
*   **Machine Duty Cycle & Thermal Derating Calculator:** Computes the safe operating percentage of a machine when operating at a desired amperage using the NEMA / IEC formula: $$N_{\text{new}} = \left(\frac{I_{\text{rated}}}{I_{\text{desired}}}\right)^2 \times N_{\text{rated}}$$.


## Units

`src/context/UnitContext.tsx` holds one `imperial`/`metric` setting for the whole app (default
imperial), switched from the header. Every tool reads it through `useUnit()` or
`components/common/useUnitChange.ts` except the Hardinge dividing head (divisions, no units) and
the Screw Head & Drive Library, which does not read it. `src/lib/units.ts` is the only place the
25.4 factor and the field rewrites on a unit flip live.

## Shell

- `src/main.tsx` mounts `App` inside `UnitProvider`; `App.tsx` holds the active tab in React
  state (not in the URL), the hub category filter, a `SplashScreen` on load, and an install
  offer driven by `beforeinstallprompt` (with a manual guide where the browser gives no prompt).
  `public/manifest.json` makes it installable; there is no service worker, so it does not work
  offline.
- Shared panel parts live in `src/components/common/` (`ToolHeader`, `ModuleTabBar`,
  `ToolFooterNote`, `FormulaSheet`, `InfoBox`, `SvgGridPattern`).
- `src/components/HardingeDivigingHead/` is a misspelt alias that only re-exports
  `HardingeDividingHead`.

## Build, lint, run

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build  ->  dist/
npm run lint       # oxlint
npm run preview
```

Checked 2026-10-30: `tsc -b` exits 0; `vite build` exits 0 with one ~900 kB JS chunk and Vite's
chunk-size warning; `oxlint` exits 0 with warnings (`react-hooks/exhaustive-deps` in
`Knurling.tsx` and `ThreadingChangeGears.tsx`, `only-export-components` in several data-exporting
components).

`vite.config.ts` sets no `base`, so the built `dist/index.html` asks for `/assets/…`,
`/favicon.svg` and `/manifest.json` from the web root: the bundle works at the root of a site,
not from a sub-path. `dist/` is gitignored.

## Publishing

`.github/workflows/deploy.yml` (“Deploy to FTPS Server”) runs on every push to `main` and on
demand: Node 20, `npm ci || npm install`, `npm run build`, then uploads `dist/` over FTPS with
`SamKirkland/FTP-Deploy-Action@v4.4.0` using the `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`
secrets, to `./` on the server.

## In APK.audio

A submodule at `PODS/POD.THIN/Softapps/DATABASE/DATABASE.Machinist.Like.audio`. `display.json`
declares it to the launcher (`walk_project()` in `PODS/POD.THIN/WEB.OsApi/SRC/server.py`); the
reader finds `index.html` at the root and files it at pipeline stage 10 from
`subGroup: "10 · Device Under Test"`. That root `index.html` is the Vite source page — it loads
`/src/main.tsx` — so opened from the launcher without the Vite dev server it draws nothing; the
runnable page is `dist/index.html`, which `app` names. `app: dist/index.html` and `topic`
are not read by that reader, and nothing publishes on `APK.audio/Gui/Display/Machinist`; the app
holds no bus connection.

## Documentation

`Documentation/🧩Manual and Artifacts/` holds the long-form references the suites were built from
(`Metalurgy.md`, `sheetmetal expanded.md`, `welding Calc.md`) and `Edits.md`, a requested
re-grouping of the hub categories that the code does not follow yet. Plans live in the APK.audio
roadmap — see `Documentation/🛣Roadmap/ROADMAP.md`.

## Philosophy

- **One unit setting, not one per panel.** Metric/imperial is app state in `UnitContext`, and
  conversion arithmetic is in one file (`src/context/UnitContext.tsx`, `src/lib/units.ts`).
- **Show the formula.** Tools carry their working beside the answer — `FormulaSheet`,
  `ToolFooterNote`, the Speeds & Feeds formulas view (`src/components/common/`,
  `src/components/SpeedsFeeds/`).
- **Thin shells over pure math.** The large tools are split into types, data, pure solvers and
  hooks under a thin page component — `SheetMetalBending/bend.math.ts`, `SpeedsFeeds`'s
  `solveCut`, `ScrewHeadIndex/{data,hooks,library}` (PLAN-3358.01, PLAN-3359.01 in the git log).
- **Nothing leaves the browser.** No fetch, no storage, no bus: every number is computed locally
  from the inputs on screen (`src/`, no `fetch`/`localStorage`/MQTT).

<!-- wiki:smoke -->
**Smoke test** — ✅ PASS 2/2 since 2026-10-30 12:51 EDT — [results](Documentation/%F0%9F%A7%A9Manual%20and%20Artifacts/SMOKE.md)
<!-- /wiki:smoke -->
