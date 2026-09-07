# Project Structure

This project is organized as a Next.js App Router application with route-local feature folders, shared UI components, and Prisma-based PostgreSQL persistence.

The structure favors explicit feature organization and practical reuse over broad abstraction.

## Root-Level Structure

```text
.
├─ docs/                 # Project documentation
├─ prisma/               # Prisma schema and database migrations
├─ public/               # Static assets
├─ scripts/              # PowerShell utilities and scaffolding scripts
├─ src/                  # Application source code
├─ package.json          # Scripts and dependencies
├─ pnpm-lock.yaml        # Dependency lockfile
├─ pnpm-workspace.yaml
├─ prisma.config.ts      # Prisma configuration
├─ tsconfig.json         # TypeScript configuration
├─ next.config.ts        # Next.js configuration
├─ eslint.config.mjs     # ESLint configuration
└─ README.md             # Project overview
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
- project introduction page
- snippet pages and forms
- collection pages and forms
- route-level logic
- feature-specific behavior

Current routes include:

```text
src/app/
├─ page.tsx
├─ about/
│  └─ page.tsx
├─ snippets/
│  ├─ page.tsx
│  ├─ new/
│  ├─ [id]/
│  └─ _actions/
└─ collections/
   ├─ page.tsx
   ├─ new/
   ├─ [id]/
   └─ _actions/
```

Feature folders also include route-local components:

```text
src/app/snippets/_components/
src/app/snippets/_actions/

src/app/collections/_components/
src/app/collections/_actions/
```

These folders keep server actions, feature-specific UI, and route concerns close to the feature they serve.

Route-local folders prefixed with `_` are not treated as application routes by the Next.js App Router.

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

These files contain shared configuration and option definitions rather than feature implementation logic.

### src/hooks

Reusable React hooks live in this folder.

Examples:

```text
src/hooks/useBreakPoint.ts
src/hooks/useMediaQuery.ts
```

Hooks are kept here when they provide behavior that can be reused across multiple features.

### src/lib

Application-level utilities and configuration live here.

Examples:

```text
src/lib/prisma.ts
src/lib/fonts.ts
src/lib/fonts.cjk.ts
src/lib/navigation/
```

Responsibilities include:

- Prisma client setup
- database connection configuration
- font configuration
- navigation configuration
- shared application utilities

The Prisma client is configured for PostgreSQL through the PostgreSQL adapter.

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

Zod schemas are kept alongside the related TypeScript types when they define the validation rules for that domain.

### src/generated

This directory contains Prisma-generated TypeScript client artifacts.

Generated files should generally be treated as generated code rather than hand-maintained application source.

## prisma

The database schema and migration history are stored here.

```text
prisma/
├─ schema.prisma
├─ migrations/
│  └─ 20260905000000_init_postgresql/
└─ migrations-sqlite/
    ├─ 20260804003226_init/
    ├─ 20260825004007_add_collections/
    └─ migration_lock.toml
```

The active migration history under `prisma/migrations/` represents the PostgreSQL database.

The previous SQLite migration history is retained separately under `prisma/migrations-sqlite/` as archived migration history and is not part of the active PostgreSQL migration path.

The Prisma CLI configuration is defined at the project root:

```text
prisma.config.ts
```

The application uses PostgreSQL for persistence, with Prisma Postgres providing the production database environment.

## Database and Deployment Structure

The application uses the following high-level persistence flow:

```text
Next.js App Router
        │
        ▼
  Server-side logic
        │
        ▼
   Prisma Client
        │
        ▼
   PostgreSQL
        │
        ▼
 Prisma Postgres
```

Production deployment is handled through Vercel.

Database connection responsibilities are separated between application runtime access and Prisma migration operations.

## Practical Rule

The project keeps two key patterns:

1. Feature-specific logic stays close to the relevant route or feature directory.
2. Shared UI stays in the global component directories when it is reusable beyond a single feature.

Additional principles:

- Keep database access on the server.
- Keep validation close to the related domain types.
- Keep generated artifacts separate from hand-maintained source.
- Prefer explicit structure over unnecessary abstraction.
- Extract shared components when actual reuse justifies them.

This keeps the app easy to understand without over-abstracting the structure.
