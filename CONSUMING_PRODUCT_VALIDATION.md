# Consuming Product Validation

Last updated: February 24, 2026

## Validated consumer workflow

A consumer-style workflow has been validated using only public exports from `src/index.ts`.

- Auth sign-in workflow composition (layout, social providers, inputs, submit action)
- Dashboard layout workflow composition (header actions + content rails)

## Evidence

- Test: `src/readiness/consumer-workflow.test.tsx`
- The test imports from `../index` (public package surface), not component-internal paths.
- This validates real integration behavior from a consumer perspective.
