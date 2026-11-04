// Part of the APK.audio project — http://APK.audio — made by Anthony Kuzub
// MIT Licence. Free, for everyone, for ever. Full text in LICENSE at the root.
// THE ONE TABLE (ROAD-3494): ApkTable's options drive the vendored apk-table
// (in a stub DOM, apk-table-shim.cjs), and every table in src/ is one of them,
// under its own id.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { apkOptions, type ApkTableProps } from '../src/components/common/ApkTable';
import { SPEED_MATRIX } from '../src/components/GortonP12/data/speedMatrix';

const require = createRequire(import.meta.url);
const { loadApkTable, rowsOf } = require('./apk-table-shim.cjs');
const SRC = join(__dirname, '..', 'src');

const walk = (dir: string): string[] => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? (n === 'vendor' ? [] : walk(p)) : [p];
});

describe('ApkTable', () => {
  it('registers under its id and draws value / text / node cells', () => {
    const { window, document } = loadApkTable(join(SRC, 'vendor/apk-table/apk-table.js'));
    (globalThis as unknown as { document: unknown }).document = document;
    type Row = typeof SPEED_MATRIX[number];
    const clicked: number[] = [];
    const props: ApkTableProps<Row> = {
      id: 'machinist-gorton-speed-matrix',
      rows: SPEED_MATRIX.slice(0, 2),
      onRowClick: (r) => clicked.push(r.sfm),
      columns: [
        { key: 'sfm', label: 'SFM', text: (r) => `${r.sfm} SFM`, style: () => ({ color: '#fff' }) },
        { key: 'd4', label: '1/4"' },
      ],
    };
    const t = window.APKTable.create(document.createElement('div'), apkOptions({ current: props }));
    expect(window.APKTable.get('machinist-gorton-speed-matrix')).toBe(t);
    expect(rowsOf(t)).toEqual(SPEED_MATRIX.slice(0, 2).map((r) => [`${r.sfm} SFM`, String(r.d4)]));
    const tr = t.el.querySelector('tbody').children[1];
    tr.onclick({ target: tr });
    expect(clicked).toEqual([SPEED_MATRIX[1].sfm]);
    delete (globalThis as unknown as { document?: unknown }).document;
  });

  it('no component draws a <table> itself; every ApkTable id is unique', () => {
    const files = walk(SRC).filter((f) => /\.(tsx|ts)$/.test(f) && !f.endsWith('.test.ts'));
    const ids: string[] = [];
    for (const f of files) {
      const s = readFileSync(f, 'utf8');
      expect(s, f).not.toMatch(/<table|createElement\(['"]table/);
      for (const m of s.matchAll(/<(?:ApkTable|GageStackTable)[^>]*?\bid="([^"]+)"/g)) ids.push(m[1]);
    }
    expect(ids.length).toBeGreaterThanOrEqual(12);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
