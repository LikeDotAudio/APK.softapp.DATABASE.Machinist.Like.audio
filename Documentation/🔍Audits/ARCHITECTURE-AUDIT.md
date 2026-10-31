# 🔍 Architecture audit — DATABASE.Machinist.Like.audio (2026-10-30)

Audited against the APK.audio multi-repo architecture standard: coupling, boundaries, duplication, contracts.
← [Audits](INDEX.md) · Improvements: [🛣Roadmap/IMPROVEMENTS.md](../%F0%9F%9B%A3Roadmap/IMPROVEMENTS.md)

## Bounded context
machinist.like.audio: 28 shop calculators (dividing head, speeds & feeds, bolt circles, sheet-metal bending, Gorton P1-2 pantograph, fits, hardness, …) behind one React 19 + Vite + TypeScript shell with a shared `UnitContext`; ~150 source files; committed `dist/` served by APK:Softapps and FTPS-deployed by CI. Sampled: `package.json`, `vite.config.ts`, `src/App.tsx`, `src/lib/units.ts`, `src/context/`, component trees for GortonP12, SheetMetalBending, SpeedsFeeds, Knurling, TapDrillDie, `scripts/check-dist.mjs`, the deploy workflow.

## Context map
| Talks to | How (topic / endpoint / file / import) | Relationship |
|---|---|---|
| APK:OS Launch Pad (WEB.OsApi walker, WEB.Frontend-Assets snapshot) | `display.json` manifest | Published Language (manifest) — Conformist |
| WEB.Frontend-Assets (web-static image) | the whole Softapps tree is `COPY`d into the image by the parent | Customer–Supplier (by design: Softapps are baked into one image) |
| machinist.like.audio (FTPS host) | `.github/workflows/deploy.yml` → `SamKirkland/FTP-Deploy-Action@v4.4.0` | Customer–Supplier (deploy target) |
| Google/npm toolchain | react, react-dom, vite, typescript, oxlint | Conformist |

## Scorecard
| Category | Score (0–3) | Finding |
|---|---|---|
| Coupling & Cohesion | 3 | No sibling paths, no bus, no shared state; runs at its own domain and one level down in APK:Softapps (`base: './'`). |
| Boundary Integrity | 3 | Only React as a runtime dependency; domain math sits in `*.math.ts` and `data/` files separate from components. |
| Duplication Control | 2 | Conversions go through `src/lib/units.ts` and the stylesheet takes the accent from the brand token (delivered); inline accent literals remain in component styles and SVG attributes. |
| Testing & Contracts | 3 | Vitest table tests of every `*.math.ts` and `units.ts`, plus oxlint, run before `check:dist` in the deploy workflow (delivered). |
| Change management | 2 | `check:dist` guards the two copies; `version: 1.0.0`; one chunk per tool (delivered). No release tag — needs owner. |
Score key: 3 meets the standard · 2 minor gaps · 1 significant gaps · 0 absent / violated.

## Findings
1. GOOD — one unit setting for the whole app: [src/context/UnitContext.tsx](../../src/context/UnitContext.tsx) read by ~30 components, with helpers in [src/lib/units.ts](../../src/lib/units.ts).
2. GOOD — [scripts/check-dist.mjs](../../scripts/check-dist.mjs) rebuilds into a temp dir and byte-compares with the committed `dist/`, and [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) runs it before deploying, so the APK:Softapps copy and the public site cannot silently diverge.
3. **Inline accent literals.** About 130 `#f4902c` and 130 `rgba(244, 144, 44, …)` literals remain in component style objects and SVG `fill`/`stroke`/`stopColor` attributes (49 files). The stylesheet now reads the token; moving these needs a per-site check that `var()` is valid where each is used (SVG presentation attributes, colour props passed to components).
4. **No release tag.** `package.json` is `1.0.0`; tagging a deploy is the owner's to publish.

Delivered items were removed from this page; see [🌍Publishing/DELIVERY.md](../%F0%9F%8C%8DPublishing/DELIVERY.md#delivered-from-the-2026-10-30-audit).
