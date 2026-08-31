# Scaffolding

This project includes a small PowerShell scaffold for creating a new component quickly.

The generator is a convenience tool, not a strict requirement. The project prefers creating components in the most appropriate location, depending on whether they are shared or feature-specific.

## Component Generator

The current script creates a simple component directory with a TSX file, a CSS module, and an index export.

Generated structure:

```text
src/components/
└─ ComponentName/
   ├─ ComponentName.tsx
   ├─ ComponentName.module.css
   └─ index.ts
```

The actual script file is:

- [scripts/new-component.ps1](../../scripts/new-component.ps1)

### Usage

```powershell
.\scripts\new-component.ps1 -Name Button
```

This creates the folder under the default path:

```text
src/components/
```

### Custom path

You can also point the generator at a different directory.

```powershell
.\scripts\new-component.ps1 `
  -Name QuickActions `
  -Path src/app/home
```

This will create:

```text
src/app/home/QuickActions/
├─ QuickActions.tsx
├─ QuickActions.module.css
└─ index.ts
```

## Generated output

The script produces a minimal starter component:

```tsx
export function Button() {
  return <div>Button</div>;
}
```

and a basic CSS module:

```css
.button {
}
```

This is intentionally minimal and should be expanded as the component grows.

## Project conventions for placement

The generator is most useful for creating a reusable or standalone component in a known shared folder.

In this project, prefer the following placement rules:

### Use a shared component directory when:

- the component is reusable across multiple pages or features
- it is a generic UI primitive, input control, or app-shell helper
- it belongs in `src/components/primitives`, `src/components/ui`, or `src/components/common`

### Use a feature folder when:

- the component is tied to a specific route or workflow
- it depends on feature-specific data or business logic
- it is likely to remain local to one feature area

Examples:

```text
src/app/snippets/_components/
src/app/collections/_components/
```

## Customization guidance

The scaffold is a development shortcut, not a hard architectural rule.

Developers should adjust the generated structure when a component needs:

- additional subcomponents
- a different naming pattern
- a custom folder layout
- feature-specific composition instead of a generic shared component

Use the scaffold to start quickly, then refactor toward the project conventions once the implementation becomes clear.

## Rule of thumb

Start with the smallest appropriate scope:

- global shared component: `src/components/...`
- feature-specific UI: `src/app/<feature>/_components/...`
- route-specific logic: colocated in the feature's `_actions` or page-level code

Do not place a feature-specific component in `src/components` just because it is easy to generate there.
