# Delivery — Machinist.Like.audio

## Build and test
`npm run build` = `tsc -b && vite build` → `dist/` (checked 2026-10-30: exits 0, one chunk-size warning). `npm run lint` (oxlint) exits 0 with warnings. There are no unit tests.

## Where it lands
| Where | How | URL |
|---|---|---|
| **machinist.like.audio** | `.github/workflows/deploy.yml` on every push to `main` (and on demand): Node 20, `npm ci \|\| npm install`, `npm run build`, then `SamKirkland/FTP-Deploy-Action@v4.4.0` uploads `dist/` to `./` with the `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD` secrets. `.apk.scripts/deploy_all.py` at the APK.audio root re-runs it. | https://machinist.like.audio/ |
| **apk.audio** | the root repo's `.github/workflows/ci.yml` uploads the Softapps tree over FTPS (`WEB.Frontend-Assets/.apk.scripts/deploy.py`) after a submodule bump; the committed `dist/` goes with it. | `https://apk.audio/APK:Softapps/DATABASE/DATABASE.Machinist.Like.audio/index.html` (hands over to `dist/index.html`) |
| **A node** | copied with the Softapps tree into WEB.Frontend-Assets and Storage-Portal (`:8080/Softapps/…`); the OS walker lists the root `index.html`. After an edit: `up-stack.sh WEB.Frontend-Assets` and `up-stack.sh DATABASE.server.SQL`. | `http://<node>:8080/Softapps/DATABASE/DATABASE.Machinist.Like.audio/index.html` |

## Not automated
- Rebuilding and committing `dist/` after a `src/` change — the apk.audio and node copies serve whatever `dist/` was committed (the machinist.like.audio deploy builds its own).
- The submodule bump into the APK.audio root, and the node image rebuilds.
- Lint and type-check run only inside `npm run build`; nothing gates a push.
