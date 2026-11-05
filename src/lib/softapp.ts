// Part of the APK.audio project — http://APK.audio — made by Anthony Kuzub
// MIT Licence. Free, for everyone, for ever. Full text in LICENSE at the root.
//
// THE SDK SEAM — window.APKSoftapp (public/vendor/apk-softapp, a classic script
// index.html loads before this bundle). Absent (a test, a stripped copy), every
// call here is a no-op and the app behaves as it did.

type Problemish = unknown
interface SoftappSdk {
  describe(d: Record<string, unknown>): unknown
  explain(err: unknown, opts?: Record<string, unknown>): { code: string; detail?: string }
  problem(code: string, opts?: Record<string, unknown>): unknown
  showProblem(p: Problemish, opts?: Record<string, unknown>): unknown
}

const sdk = (): SoftappSdk | undefined => (globalThis as unknown as { APKSoftapp?: SoftappSdk }).APKSoftapp

/** Copy text; a refused clipboard says why and how to get it anyway, instead of failing silently. */
export function copyText(text: string, subject: string): Promise<boolean> {
  const fail = (err: unknown) => {
    const S = sdk()
    if (S) {
      // explain() names the code; problem() is what carries our own first step.
      const e = S.explain(err, { subject })
      S.showProblem(S.problem(e.code, { detail: e.detail, subject, fix: ['Select the figures on screen and copy them with Ctrl+C instead.'] }))
    }
    return false
  }
  try {
    if (!navigator.clipboard) return Promise.resolve(fail(Object.assign(new Error('This page has no clipboard access (it needs https or localhost).'), { name: 'NotAllowedError' })))
    return navigator.clipboard.writeText(text).then(() => true, fail)
  } catch (err) {
    return Promise.resolve(fail(err))
  }
}

export function describeApp(): void {
  sdk()?.describe({
    name: 'Machinist',
    does: '28 shop calculators behind one shell: Jo-block stacks, dividing head, speeds and feeds, bolt circles, sine bars, taps and dies, fits, hardness, welding and sheet metal.',
    inputs: [
      { name: 'Dimensions, counts and materials', from: 'the fields of the open tool (typed; nothing is fetched)' },
      { name: 'Units', from: 'the Imperial / Metric switch in the header — one setting for every tool but the dividing head' },
    ],
    outputs: [
      { name: 'Results', to: 'drawn in the tool: stacks, coordinates, tables, diagrams' },
      { name: 'Copied summaries', to: 'the clipboard (Copy buttons on Jo blocks, bolt circle, spur gears, flat pattern)', kind: 'clipboard' },
      { name: 'Installed app', to: 'Install button: the browser adds it as an app (PWA)' },
    ],
    controls: [
      { name: 'Hub categories', how: 'the category chips on the home page filter the tool cards' },
      { name: 'Open a tool', how: 'click its card or its tab; the logo returns to the hub' },
      { name: 'Imperial / Metric', how: 'header switch' },
      { name: 'Copy', how: 'the copy buttons in a tool' },
    ],
    problems: ['permission_denied', 'bad_input'],
  })
}
