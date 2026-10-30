// Part of the APK.audio project — http://APK.audio — made by Anthony Kuzub
// MIT Licence. Free, for everyone, for ever. Full text in LICENSE at the root.
//
// check-dist.mjs — is the committed dist/ the build of src/ as it stands?
//
// dist/ is committed because apk.audio and a node serve this softapp straight
// out of the repo (APK:Softapps/DATABASE/DATABASE.Machinist.Like.audio/dist/),
// while machinist.like.audio builds its own copy in CI. A src/ edit committed
// without `npm run build` left those two copies serving different apps and
// nothing said so. This builds into a scratch folder and compares it, file by
// file and byte by byte, with dist/. Exit 1 names every file that differs.
//
//   npm run check:dist
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const fresh = mkdtempSync(join(tmpdir(), 'machinist-dist-'));

const walk = (dir) => readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
});

try {
    const bin = (name) => join(root, 'node_modules', '.bin', name);
    execFileSync(bin('tsc'), ['-b'], { cwd: root, stdio: 'inherit' });
    execFileSync(bin('vite'), ['build', '--outDir', fresh, '--emptyOutDir', '--logLevel', 'warn'],
        { cwd: root, stdio: 'inherit' });

    const have = new Set(walk(dist).map((p) => relative(dist, p)));
    const want = new Set(walk(fresh).map((p) => relative(fresh, p)));
    const problems = [];
    for (const f of want) {
        if (!have.has(f)) problems.push(`missing from dist/: ${f}`);
        else if (!readFileSync(join(dist, f)).equals(readFileSync(join(fresh, f)))) problems.push(`differs: dist/${f}`);
    }
    for (const f of have) if (!want.has(f)) problems.push(`stale, no longer built: dist/${f}`);

    if (problems.length) {
        console.error(`dist/ does not match src/ (${problems.length}):\n  ${problems.join('\n  ')}`);
        console.error('Run `npm run build` and commit dist/ with the source change.');
        process.exit(1);
    }
    console.log(`dist/ matches src/ (${want.size} files)`);
} finally {
    rmSync(fresh, { recursive: true, force: true });
}
