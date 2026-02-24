# Performance Budget

Last updated: February 24, 2026

## Build Artifact Budget

- Library bundle gzip budget: `<= 70 KB`
- Current snapshot (2026-02-24): `67.95 KB` (`npm run check:bundle-size`)

## Guardrails

- Any PR increasing gzip size by > 5% requires explicit justification.
- Any PR crossing 70 KB must be blocked until reduced or budget is intentionally raised.
- Prefer additive exports over large transitive dependencies.

## Monitoring

- CI gate: `npm run check:bundle-size`
- Optional local report: `npm run perf:report`

## Follow-ups

- Add trend history by persisting bundle-size snapshots per release.
- Track Storybook preview build time trend and bundle hotspots.

