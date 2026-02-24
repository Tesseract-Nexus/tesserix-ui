# Controlled and Uncontrolled Patterns

Last updated: February 24, 2026

This guide documents components with controlled/uncontrolled behavior and the recommended usage pattern.

## Controlled/Uncontrolled Components

- `DataTable`
  - Controlled: `selectedRowIds`, `onSelectedRowIdsChange`
  - Uncontrolled: omit `selectedRowIds`, component keeps internal selection state
- `DataGrid`
  - Controlled: `selectedRowIds`, `onSelectedRowIdsChange`
  - Uncontrolled: omit selection props
- `FilterPanel`
  - Controlled: `value`, `onValueChange`
  - Uncontrolled: omit `value`
- `FilterBuilder`
  - Controlled: `value`, `onValueChange`
  - Uncontrolled: omit `value`
- `PropertyPanel`
  - Controlled draft source: pass `value` and handle `onValueChange`
- `CronBuilder`
  - Controlled: `value`, `onValueChange`
  - Uncontrolled: omit `value`
- `PermissionsMatrix`
  - Controlled: `value`, `onValueChange`
  - Uncontrolled: omit `value`
- `Drawer` / `Dialog` / `Sheet` / `Modal`
  - Controlled open state is recommended in app flows
  - Uncontrolled mode is acceptable for simple cases

## Guidance

- Prefer controlled mode when state is shared across multiple UI regions.
- Prefer uncontrolled mode for self-contained screens and simple forms.
- Do not mix controlled and uncontrolled props for the same state source.

