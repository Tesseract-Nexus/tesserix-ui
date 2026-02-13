# Support Policy

This document defines what runtime environments and dependency versions are officially supported by `@tesseract-nexus/tesserix-ui`.

## Scope

Support applies to:
- published package builds
- documented component APIs
- Storybook interaction and accessibility test behavior

It does not guarantee behavior for undocumented internal APIs.

## Runtime Support Matrix

### React
- Supported: `^19.0.0` (peer dependency)

### Tailwind CSS
- Supported: `^4.1.0` (peer dependency)

### TypeScript (consumer apps)
- Recommended: `>=5.7`

### Browsers
- Chrome: latest 2 stable versions
- Edge: latest 2 stable versions
- Firefox: latest 2 stable versions
- Safari (macOS): latest 2 stable versions
- Safari (iOS/iPadOS): latest 2 stable versions

### Node.js (development and CI)
- Supported for this repo workflows: Node 20.x LTS

## Compatibility Guarantees

After `v1.0.0`:
- breaking API changes only ship in major releases
- deprecated APIs remain available for at least one minor release before removal

Before `v1.0.0`:
- rapid iteration is allowed, but breaking changes must still be clearly documented in changelog/release notes

## Accessibility Expectations

- Interactive components must preserve keyboard operability.
- Storybook a11y checks must pass in CI for changed stories.
- Critical accessibility regressions are treated as release blockers.

## Security and Bug Fixes

- Security issues and high-severity regressions are prioritized for the latest release line.
- Fixes are released in patch/minor versions based on impact.

## Policy Changes

Changes to this policy require:
- a pull request
- release note entry when behavior/guarantees change materially
