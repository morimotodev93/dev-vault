# Project Structure

This project is organized as a Next.js App Router application with route-local feature folders, shared UI components, and Prisma-based persistence.

## Root-Level Structure

```text
.
├─ docs/              # Project documentation
├─ prisma/            # Prisma schema and database migrations
├─ public/            # Static assets
├─ scripts/           # PowerShell utilities and scaffolding scripts
├─ src/               # Application source code
├─ package.json       # Scripts and dependencies
├─ pnpm-lock.yaml     # Dependency lockfile
├─ pnpm-workspace.yaml
├─ prisma.config.ts   # Prisma config
├─ tsconfig.json      # TypeScript configuration
├─ next.config.ts     # Next.js configuration
├─ eslint.config.mjs  # ESLint config
└─ README.md          # Project overview
```

## Source Directory

```text
src/
├─ app/
├─ components/
├─ constants/
├─ hooks/
├─ lib/
├─ styles/
├─ types/
├─ generated/
└─ ...
```

### src/app

The app directory contains the App Router pages and route-local feature code.

Current responsibilities include:

- home page composition
- snippet pages and forms
- collection pages and forms
- route-level logic and feature-specific behavior

Examples:

```text
src/app/page.tsx
src/app/layout.tsx
src/app/snippets/page.tsx
src/app/snippets/new/page.tsx
src/app/collections/page.tsx
src/app/collections/[id]/page.tsx
```

Feature folders also include route-local subdirectories such as:

```text
src/app/snippets/_actions/
src/app/snippets/_components/
src/app/collections/_actions/
src/app/collections/_components/
```

These folders keep server actions, UI, and route concerns close to the feature they serve.

### src/components

The component directory contains shared UI building blocks and app-shell components.

Current structure:

```text
src/components/
├─ common/
├─ Footer/
├─ Header/
├─ icon/
├─ primitives/
├─ ui/
└─ index.ts
```

#### common

Reusable UI patterns shared across multiple screens:

```text
src/components/common/
├─ EmptyState/
├─ Loading/
├─ Pagination/
├─ SearchInput/
├─ Tag/
├─ TagInput/
└─ index.ts
```

#### primitives

Low-level structural building blocks used throughout the app:

```text
src/components/primitives/
├─ Button/
├─ Container/
├─ Grid/
├─ Heading/
├─ Link/
├─ Spacer/
├─ Stack/
├─ Surface/
├─ Text/
└─ index.ts
```

#### ui

Reusable interface controls and higher-level inputs:

```text
src/components/ui/
├─ Checkbox/
├─ Input/
├─ LinkButton/
├─ Select/
├─ Switch/
├─ Textarea/
└─ index.ts
```

#### Header / Footer / icon

These are app-shell and utility assets rather than feature-specific components:

```text
src/components/Header/
src/components/Footer/
src/components/icon/
```

The icon folder is further grouped by usage, such as navigation, circle, and utility icons.

### src/constants

Shared constants and option sets live here.

Examples:

```text
src/constants/breakpoints.ts
src/constants/collection.ts
src/constants/snippet.ts
src/constants/Headernavigation.ts
src/constants/index.ts
```

### src/hooks

Reusable React hooks live in this folder.

Examples:

```text
src/hooks/useBreakPoint.ts
src/hooks/useMediaQuery.ts
```

### src/lib

Application-level utilities and config live here.

Examples:

```text
src/lib/prisma.ts
src/lib/fonts.ts
src/lib/fonts.cjk.ts
src/lib/navigation/
```

Responsibilities include:

- Prisma client setup
- font configuration
- navigation configuration
- shared helper and application logic

### src/styles

Global styling rules and shared design foundations live here.

```text
src/styles/
├─ foundation/
├─ layout/
├─ utility/
├─ global.css
├─ reset.css
└─ ...
```

### src/types

Shared TypeScript types and validation schemas live in this folder.

Examples:

```text
src/types/snippet.ts
src/types/collection.ts
src/types/navigation.ts
```

### src/generated

This directory contains Prisma-generated TypeScript client artifacts and should generally be treated as generated code.

### prisma

The database schema and migrations are stored here.

```text
prisma/
├─ schema.prisma
├─ migrations/
└─ migration_lock.toml
```

## Practical Rule

The project keeps two key patterns:

1. Feature-specific logic stays close to the relevant route or feature directory.
2. Shared UI stays in the global component directories when it is reusable beyond a single feature.

This keeps the app easy to understand without over-abstracting the structure.
