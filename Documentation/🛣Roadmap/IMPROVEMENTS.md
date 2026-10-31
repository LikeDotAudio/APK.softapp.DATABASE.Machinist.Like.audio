# 🛣 Improvements — DATABASE.Machinist.Like.audio (from the 2026-10-30 architecture audit)

What this repo should change to meet the standard, most valuable first. Source: [🔍Audits/ARCHITECTURE-AUDIT.md](../%F0%9F%94%8DAudits/ARCHITECTURE-AUDIT.md).
← [Roadmap](INDEX.md)

Delivered items are in [🌍Publishing/DELIVERY.md](../%F0%9F%8C%8DPublishing/DELIVERY.md#delivered-from-the-2026-10-30-audit). Still open:

| # | Improvement | Category | Effort (S/M/L) | Evidence |
|---|---|---|---|---|
| 1 | Replace the remaining inline accent literals in components (~130 `#f4902c`, ~130 `rgba(244, 144, 44, …)`, 49 files) with `var(--accent)` / `rgba(var(--apk-accent-rgb), …)`, checking each site where `var()` is not valid (SVG presentation attributes, colour props a component computes with). The stylesheet half is delivered. | Duplication Control | M | `grep -rn f4902c src` |
| 2 | Tag releases on deploy (`v1.0.0` …). **Needs owner** — agents do not publish tags. | Change management | S | `package.json` `1.0.0` |
