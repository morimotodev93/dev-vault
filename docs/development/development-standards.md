# Development Standards

This document captures the current development conventions used by Dev Vault.

It reflects the project as it exists today and should be treated as a practical guide for future work.

## 1. Project structure

The codebase is organized around the App Router and route-local feature folders.

```text
src/
├─ app/
│  ├─ snippets/
│  │  ├─ _actions/
│  │  ├─ _components/
│  │  ├─ [id]/
│  │  ├─ new/
│  │  └─ page.tsx
│  ├─ collections/
│  │  ├─ _actions/
│  │  ├─ _components/
│  │  ├─ [id]/
│  │  ├─ new/
│  │  └─ page.tsx
│  └─ ...
├─ components/
│  ├─ primitives/
│  ├─ ui/
│  ├─ common/
│  ├─ Header/
│  ├─ Footer/
│  └─ icon/
├─ lib/
├─ types/
├─ constants/
├─ hooks/
├─ styles/
└─ generated/
```

The general rule is:

- feature-specific code stays close to the relevant route or feature folder
- reusable UI goes into the shared component directories
- generated Prisma code stays untouched

## 2. Server and client boundaries

This project follows the App Router default: server components are preferred unless interactivity is required.

Use server components for:

- page rendering
- data fetching
- business logic that runs on the server
- Prisma reads and writes

Use client components for:

- local interaction states
- forms with browser events
- controlled inputs
- confirmation actions and UI-driven behavior

Examples of current client components include:

- Search input controls
- Tag input forms
- selection and sort interaction widgets
- remove/confirm buttons for collection items

A file should begin with `"use client"` only when browser-specific behavior is required.

## 3. Server actions

Server actions are the default mutation pattern in this project.

Current conventions:

- put mutation logic in feature-local `_actions` folders
- begin the file with `"use server"`
- validate incoming data before Prisma writes
- revalidate the relevant route after successful updates
- keep mutation code concise and feature-specific

Examples:

- `src/app/snippets/_actions/createSnippet.ts`
- `src/app/collections/_actions/createCollection.ts`
- `src/app/collections/_actions/deleteCollectionSnippet.ts`

## 4. Validation

Validation is centralized through Zod schemas in `src/types`.

Current pattern:

- define the schema in a feature-specific type file
- validate before database writes
- use the schema for client and server form handling
- keep validation messages user-facing and specific

Examples:

- `src/types/snippet.ts`
- `src/types/collection.ts`

This keeps validation consistent and avoids scattered ad hoc checks.

## 5. Prisma usage

Prisma is the persistence layer for the app.

Use the existing conventions:

- access Prisma via `@/lib/prisma`
- keep read and write logic close to the feature that uses it
- use `include` when a route needs related records in one query
- use `orderBy` for deterministic list ordering
- prefer explicit data selection when only some fields are needed

The project does not add a custom repository layer or service abstraction for everyday CRUD; Prisma calls remain direct and readable in the app code.

## 6. Component organization

The project uses a layered component structure.

### Shared component directories

```text
src/components/
├─ primitives/
├─ ui/
├─ common/
├─ Header/
├─ Footer/
├─ icon/
```

Use these directories for reusable UI with a clear generic purpose.

Examples from the current app:

- `primitives`: Stack, Container, Grid, Text, Heading, Link
- `ui`: Input, Select, Textarea, Checkbox, Switch, LinkButton
- `common`: SearchInput, EmptyState, Pagination, Tag, TagInput
- `Header` / `Footer`: app shell layout
- `icon`: shared icon assets for app and navigation UI

### Feature components

Feature-specific components stay near their route or feature.

Examples:

```text
src/app/snippets/_components/
src/app/collections/_components/
```

Prefer feature-local components when:

- the component depends on route-specific data
- the component is only used in one feature flow
- the UI is not meant to be reused broadly

## 7. CSS and styling

The app uses CSS Modules for component-level styling and global style foundations under `src/styles`.

Current style structure:

```text
src/styles/
├─ foundation/
├─ layout/
├─ utility/
├─ global.css
├─ reset.css
└─ ...
```

Current guidance:

- use design tokens and foundation styles when available
- use component CSS Modules for local structure and variants
- keep style rules close to the component that owns them
- avoid hard-coded values when a shared style token already exists

## 8. Naming conventions

The projected naming conventions are intentionally simple and consistent.

- Components: PascalCase
- Hooks: `useXxx`
- Type names and interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE when global, or descriptive camelCase when local
- Component files: match the component name when practical
- CSS Module classes: camelCase for structure and kebab-case for variants or state names

Example:

```css
.mainHeading {
}

.size-sm {
}

.is-active {
}
```

## 9. Queries, filters, search, and pagination

The current app uses URL-driven state for list flows.

Common pattern:

- search parameters are stored in the query string
- filter values are read from the URL
- sorting and pagination are derived from the same parameter source
- page logic stays readable and deterministic

This makes the list behavior easier to share and reload while keeping the app state explicit.

## 10. Working style for new features

When adding new code, follow these priorities:

1. Keep logic close to the feature that owns it.
2. Use server actions for writes and mutations.
3. Use Zod to validate user input before persisting data.
4. Keep shared UI generic and reusable.
5. Keep feature-specific UI local to the route when possible.
6. Prefer composition over large monolithic components.
7. Match the existing naming and file structure patterns exactly.

## 11. Quality bar

The project values small, maintainable changes over large layered abstractions.

Before merging a change, prefer:

- clear naming
- typed data boundaries
- simple validation
- local feature ownership
- consistent use of shared UI patterns

The goal is to keep the codebase easy to understand and easy to extend without introducing unnecessary framework or architectural complexity.
