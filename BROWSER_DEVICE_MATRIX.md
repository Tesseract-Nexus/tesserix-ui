# Browser and Device Matrix

Last updated: February 24, 2026

## Support Target

- Desktop: latest 2 versions of Chrome, Edge, Firefox, Safari
- Mobile: latest iOS Safari, latest Android Chrome

## Current Verification Snapshot

| Surface | Chrome | Edge | Firefox | Safari | iOS Safari | Android Chrome | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Unit tests (`vitest/jsdom`) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | PARTIAL | JS engine-level verification only.
| Storybook interaction tests | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | PARTIAL | Runs in CI/headless desktop.
| Visual regression (Chromatic) | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | PARTIAL | Requires token + review discipline.
| Manual smoke: auth/data/nav overlays | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | TODO | Formal runbook not completed yet.

## Remaining Work

- Add monthly manual run across full matrix for top 30 components.
- Capture screenshots and key findings per browser.
- Add mobile gesture checks for drawers, carousels, menus, and date pickers.

