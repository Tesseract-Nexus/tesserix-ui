# Release Policy

This document defines versioning, changelog, and release process for `@tesseract-nexus/tesserix-ui`.

## Versioning Model

The project follows Semantic Versioning (`MAJOR.MINOR.PATCH`).

## Versioning Rules

### Before `v1.0.0`
- minor releases may include breaking changes
- patch releases should be backward-compatible fixes only
- all breaking changes must be explicitly called out in release notes

### From `v1.0.0` onward
- `MAJOR`: breaking API or behavior changes
- `MINOR`: backward-compatible feature additions
- `PATCH`: backward-compatible bug fixes, docs, and non-breaking improvements

## Deprecation Policy

From `v1.0.0` onward:
- new deprecations must include migration guidance
- deprecated APIs remain for at least one minor release before removal in a major release

## Changelog and Changesets

- user-facing changes require a changeset
- release notes must include:
  - added
  - changed
  - fixed
  - breaking changes (if any)

## Release Gates

A release candidate must satisfy:
- `npm run lint`
- `npm run type-check`
- `npm run test:run`
- `npm run test:storybook`
- `npm run test:storybook:coverage:gate`
- Chromatic build passes (or is approved per team process)

## Publish Flow

Primary flow:
1. create changesets for user-facing changes
2. merge to `main`
3. changesets workflow opens/updates version PR
4. merge version PR to publish package

Manual fallback:
- run build and publish commands with proper registry auth

## Post-Release Checklist

- verify package install from registry
- verify theme exports resolve correctly
- verify Storybook docs reflect released APIs
