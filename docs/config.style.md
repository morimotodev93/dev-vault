# Configuration and Style Guide

This document describes configuration and style conventions used in Dev Vault.

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

Reusable components should be small and focused.

Recommended component grouping:

```text
src/components/
├─ primitives/
├─ icon/
├─ common/
└─ layout/
```

## Guidelines:

Primitive components should not depend on feature-specific business logic.

Feature-specific components should be colocated with their feature when the feature layer is introduced.

Each component should have a clear responsibility.

CSS Modules can be used for component-specific styling.

Styling
The project uses global CSS foundations and utilities.

## Current style structure:

src/styles/
├─ foundation/
├─ layout/
├─ utility/
├─ global.css
└─ reset.css
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

`src/types/snippets.ts`

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
