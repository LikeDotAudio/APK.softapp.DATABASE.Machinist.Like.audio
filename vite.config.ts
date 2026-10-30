import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base './' — dist/index.html asks for ./assets/…, so the same build works at the root of
// machinist.like.audio AND one level down, at APK:Softapps/DATABASE/DATABASE.Machinist.Like.audio/dist/
// on apk.audio and on a node. With the default '/', only the site-root copy drew anything.
export default defineConfig({
  base: './',
  plugins: [react()],
})
