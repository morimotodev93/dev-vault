# Development Standards

This document describes the core development conventions used in Dev Vault.

It covers language, architecture, component organization, styling, validation, and quality checks.

## Language

Documentation and user-facing project descriptions should be written in English to support global usage.

Japanese comments may exist in early implementation files, but long-term documentation and public-facing text should prefer English.

## TypeScript

Use TypeScript for application code.

Guidelines:

- Prefer explicit types at module boundaries.
- Use inferred types for local implementation details when clear.
- Keep shared types in `src/types`.
- Use Zod schemas for user input validation.
- Export reusable types from their owning module.

## React and Next.js

The project uses Next.js App Router.

Guidelines:

- Keep route-level composition inside `src/app`.
- Keep reusable UI outside route files.
- Prefer server components by default.
- Use client components only when interactivity requires them.
- Keep metadata close to layouts or pages when possible.

## Components

Reusable components should be small, focused, and easy to understand.

### Component Organization

The project uses the following component hierarchy under src/components:

```text
src/components/
├─ primitives/   # low-level reusable building blocks
├─ common/       # shared UI patterns used across multiple views
├─ ui/           # higher-level controls and composed interfaces
└─ icon/         # icon components grouped by purpose
```

### Guidelines

- Keep primitive components free from feature-specific business logic.
- Place shared, reusable UI patterns in common when they are used across multiple screens.
- Place composed controls or richer interface elements in ui.
- Keep each component focused on a single responsibility.
- Prefer composition over large, multi-purpose components.
- Use CSS Modules for component-specific styling when appropriate.

### Component Usage

Use components in the following way:

- Use primitives for small building blocks such as Button, Text, Heading, Stack, or Container.
- Use common for reusable patterns such as EmptyState, Loading, Pagination, SearchInput, or Tag.
- Use ui for more complete controls such as Input, Select, or Textarea.
- Keep route-level composition in src/app and avoid putting page-specific UI logic directly inside route files.

### Directory Mapping

Use the following mapping as a practical reference:

| Directory                 | Purpose                                         | Typical contents                                       |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| src/components/primitives | Low-level reusable building blocks              | Button, Text, Heading, Stack, Container, Link, Surface |
| src/components/common     | Shared UI patterns used across multiple screens | EmptyState, Loading, Pagination, SearchInput, Tag      |
| src/components/ui         | Higher-level controls and composed interfaces   | Input, Select, Textarea                                |
| src/components/icon       | Icons grouped by category                       | circle, navigation, util                               |

### Component File Structure

A component should usually follow this structure:

```text
ComponentName/
├─ ComponentName.tsx
├─ ComponentName.module.css
└─ index.ts
```

This keeps the component self-contained and easy to import.

Styling
The project uses global CSS foundations and utilities.

## Current style structure:

```text
src/styles/
├─ foundation/
├─ layout/
├─ utility/
├─ global.css
└─ reset.css
```

Guidelines:

Keep design tokens in foundation files.

Keep reusable spacing, layout, typography, and state utilities in utility files.

Keep page-specific or component-specific styles close to the component when appropriate.

Avoid hard-coded values when a token exists.

## Naming

General naming conventions:

Components: PascalCase

Hooks: useCamelCase

Types and interfaces: PascalCase

Constants: UPPER_SNAKE_CASE or descriptive camelCase depending on scope

Files containing components: match the component name when practical

## Validation

Use Zod for validating user-submitted data.

The current snippet form schema lives in:

`src/types/snippet.ts`

Validation should happen before data reaches Prisma.

Formatting and Linting
The project includes ESLint and Prettier dependencies.

Recommended checks:

```shell
pnpm lint
pnpm prettier --check .
Formatting and linting rules should be enforced before merging production changes.
```

---

## Testing / Checks

```shell
✅ `pwd && rg --files -g 'AGENTS.md' -g 'docs/**' -g 'package.json' -g 'src/**' -g 'prisma/**' | sed -n '1,120p'` — inspected repository structure and existing documentation files.

✅ `find .. -name AGENTS.md -print | sed -n '1,80p'; ...; sed -n '1,220p' prisma/schema.prisma` — checked for local agent instructions, reviewed current docs, package dependencies, and Prisma schema.

✅ `sed -n '1,220p' src/app/page.tsx; ...; sed -n '1,220p' src/lib/prisma.ts` — inspected representative application files, layout, home component, navigation/types, Zod schema, and Prisma client setup.
```

⚠️ No tests/build/lint were run because this task was handled as read-only documentation QA/static inspection, and the session inst
