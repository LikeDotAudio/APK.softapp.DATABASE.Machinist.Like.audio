# Delivery — Machinist.Like.audio

## Build and test
`npm test` = `vitest run`: table tests of `bend.math.ts`, `cutting.math.ts`, `gorton.math.ts` and `src/lib/units.ts` against textbook values (43 tests). `npm run lint` = `oxlint src` (warnings only). `npm run build` = `tsc -b && vite build` → `dist/`, one chunk per tool (27 lazy chunks + a ~250 kB main chunk). `npm run check:dist` builds into a scratch folder and fails if any file differs from the committed `dist/` (`scripts/check-dist.mjs`). The deploy workflow runs test → lint → check:dist → build. Version: `package.json` `1.0.0`.

## Where it lands
| Where | How | URL |
|---|---|---|
| **machinist.like.audio** | `.github/workflows/deploy.yml` on every push to `main` (and on demand): Node 20, `npm ci \|\| npm install`, `npm test`, `npm run lint`, `npm run check:dist` (a stale committed `dist/` fails the deploy), `npm run build`, then `SamKirkland/FTP-Deploy-Action@v4.4.0` uploads `dist/` to `./` with the `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD` secrets. `.apk.scripts/deploy_all.py` at the APK.audio root re-runs it. | https://machinist.like.audio/ |
| **apk.audio** | the root repo's `.github/workflows/ci.yml` uploads the Softapps tree over FTPS (`WEB.Frontend-Assets/.apk.scripts/deploy.py`) after a submodule bump; the committed `dist/` goes with it. | `https://apk.audio/APK:Softapps/DATABASE/DATABASE.Machinist.Like.audio/index.html` (hands over to `dist/index.html`) |
| **A node** | copied with the Softapps tree into WEB.Frontend-Assets and Storage-Portal (`:8080/Softapps/…`); the OS walker lists the root `index.html`. After an edit: `up-stack.sh WEB.Frontend-Assets` and `up-stack.sh DATABASE.server.SQL`. | `http://<node>:8080/Softapps/DATABASE/DATABASE.Machinist.Like.audio/index.html` |

## Not automated
- Rebuilding and committing `dist/` after a `src/` change — the apk.audio and node copies serve whatever `dist/` was committed (the machinist.like.audio deploy builds its own, and refuses to run while `npm run check:dist` fails).
- The submodule bump into the APK.audio root, and the node image rebuilds.
- Tests, lint and type-check gate the machinist.like.audio deploy, not a push; run `npm test && npm run lint && npm run check:dist` before committing.
- Tagging a release: Needs owner (agents do not publish tags).

## Delivered from the 2026-10-30 audit

- **Vitest table tests + lint before deploy** — `vitest` 5 added; `src/components/{SheetMetalBending/bend,SpeedsFeeds/cutting,GortonP12/gorton}.math.test.ts` and `src/lib/units.test.ts` check bend allowance/setback/deduction, SFM↔RPM (inch and metric), chip thinning (2/√3 at 25 % stepover), Ra, Gorton bar settings (2:1 → 0), rebalance, roll/roller sync. `deploy.yml` runs `npm test` and `npm run lint` before `check:dist`. Verified: `npm test` 43 passed; `npm run lint` 0 errors.
- **No inline 25.4 in the tools** — 104 `* 25.4` / `/ 25.4` sites in 17 components now call `toMm`/`toIn`/`MM_PER_IN` from `src/lib/units.ts` (left: data tables and prose). Same IEEE operations, so the numbers do not change. Verified: `tsc -b` clean, tests pass.
- **Accent from the brand token** — `src/index.css` takes `--accent`, `--border-focus`, `--text-accent`, glows and shadows from `var(--apk-accent)` / `rgba(var(--apk-accent-rgb), …)` in `src/vendor/apk-contracts/apk-tokens.css`, a held copy of `contracts/generated/web` (drift-checked by `.apk.scripts/vendor_contract_web.py --check`: ok). `--accent-cyan` is renamed `--accent` (283 uses), which also fixes `App.css`, which already read the undefined `--accent`.
- **Scaffold assets deleted** — `src/assets/hero.png`, `react.svg`, `vite.svg` (unreferenced).
- **Versioned and code-split** — `package.json` `1.0.0`; every tool except the default Jo-block stack is `React.lazy` behind one `Suspense`, so the ~900 kB single chunk is now a ~250 kB main chunk plus 27 per-tool chunks. Verified: `npm run build`, `npm run check:dist` ("dist/ matches src/"), headless Chrome renders the default tab from `dist/`.
