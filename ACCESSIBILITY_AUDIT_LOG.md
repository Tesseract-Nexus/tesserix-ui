# Accessibility Audit Log

Last updated: February 24, 2026

## Scope
This log tracks accessibility audit status for high-usage components and records findings/actions.

## Audit Legend

- `PASS`: Keyboard + semantics + focus + basic screen reader checks passed.
- `PARTIAL`: Some checks passed, follow-up required.
- `BLOCKED`: Cannot verify yet due to missing scenario/tooling.
- `TODO`: Not yet audited.

## Top 30 Component Audit Queue

| Component | Keyboard | Semantics/ARIA | Focus | Screen Reader | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| button | ✅ | ✅ | ✅ | ✅ | PASS | Baseline primitive.
| input | ✅ | ✅ | ✅ | ✅ | PASS | Label association verified in stories/tests.
| textarea | ✅ | ✅ | ✅ | ✅ | PASS | Basic behavior covered.
| select | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Needs SR announcement pass in NVDA/VoiceOver.
| checkbox | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Grouped labeling audit pending.
| radio | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Grouped labeling audit pending.
| switch | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Role/state announcement spot-check pending.
| dialog | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Advanced SR flow in nested dialogs pending.
| drawer | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Verify announcements for open/close transitions.
| sheet | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Verify announcements for open/close transitions.
| popover | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Trigger/content announcement review pending.
| tooltip | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Verify SR handling for hover/focus parity.
| dropdown-menu | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Menu narration pass pending.
| context-menu | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Menu narration pass pending.
| tabs | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Tabpanel announcement cross-check pending.
| accordion | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Expanded/collapsed narration audit pending.
| toast | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Live region priority review pending.
| form | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Error message linkage deep audit pending.
| pagination | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Prev/next labeling consistency audit pending.
| table | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Header scope and SR table nav pass pending.
| data-table | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Selection/sort/filter announcements pending.
| data-grid | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Editable-cell SR flow pending.
| auth-layout | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Social button mode SR pass pending.
| navigation-menu | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Complex keyboard flows need formal report.
| menubar | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Complex keyboard flows need formal report.
| sidebar-nav | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Landmark strategy review pending.
| command-palette | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Search + results narration review pending.
| combobox | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Option-activedescendant announcement pending.
| autocomplete | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Option-activedescendant announcement pending.
| date-picker | ✅ | ✅ | ✅ | ⚠️ | PARTIAL | Calendar grid narration review pending.

## Findings and Actions

| Date | Component | Severity | Finding | Action | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-02-24 | auth-layout / AuthSocialButton | Low | Needed explicit support for icon-only/text-only/icon+text alignment and labels. | Added `display` + `iconPosition` API and `aria-label` fallback for icon-only mode. | Design System | Done |
| 2026-02-24 | global | Low | Several tests emit `act(...)` warnings in hooks/utilities stories/tests. | Schedule cleanup pass to remove test warnings and improve confidence in async UI behavior. | Design System | Open |

