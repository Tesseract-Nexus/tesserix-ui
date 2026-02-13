# Story Coverage Plan

This file tracks Storybook coverage quality for each component and defines the minimum story set required before a component is considered complete.

## Coverage Model

Each component should have, where applicable:

- `Default`
- `Variants`
- `Sizes`
- `States` (disabled, error, loading, empty, selected)
- `Controlled + Uncontrolled`
- `Responsive` (for layout components)
- `Accessibility scenario`
- `Interaction play test`

## Phase Plan

1. Tier 1: Core interactive components
2. Tier 2: Overlay and data-heavy components
3. Tier 3: Layout and presentational components
4. Hardening pass: remove flaky stories, enforce deterministic play assertions

## Tier 1 (In Progress)

- [x] `button`: add `asChild` usage + state matrix coverage
- [x] `input`: add validation and controlled state stories
- [x] `tabs`: add disabled behavior coverage with keyboard/click assertions
- [x] `dialog`: add controlled open/close behavior story

## Tier 2 (Next)

- [x] `select`
- [x] `combobox`
- [x] `command`
- [x] `dropdown-menu`
- [x] `context-menu`
- [x] `popover`
- [x] `sheet`
- [x] `toast`
- [x] `tooltip`
- [x] `pagination`
- [x] `data-table`

## Tier 3

- [ ] Layout components (`app-shell`, `dashboard-layout`, `auth-layout`, `sidebar-nav`, `top-nav`)
- [ ] Marketing/layout blocks (`hero-section`, `feature-grid`, `bento-grid`, `section`, `page-header`)
- [ ] Remaining visual/utility components

## Definition of Done (Per Component)

- [ ] Story file contains minimum model coverage relevant to that component.
- [ ] At least one deterministic `play` test exists.
- [ ] Storybook Vitest project passes locally.
- [ ] No Chromatic interaction failure for that component.
- [ ] No serious a11y violations in the story set.
