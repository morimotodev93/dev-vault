# Architecture Overview

Dev Vault is a lightweight knowledge-management application for storing, organizing, and curating development snippets, notes, and reusable code examples.

The app is built with Next.js App Router, Prisma persistence, and a simple feature-oriented structure that keeps route logic and shared UI separate.

The application uses PostgreSQL for persistence and is deployed to Vercel with Prisma Postgres.

## Goals

- Provide a clean and fast way to save and browse reusable code snippets.
- Keep the architecture simple, explicit, and easy to extend.
- Support both snippets and curated collection workflows.
- Separate route logic, reusable UI, validation, and data access responsibilities.
- Maintain type-safety with TypeScript and Zod-based validation.
- Keep the production architecture lightweight and suitable for incremental development.

## Current Tech Stack

- Next.js with App Router
- React
- TypeScript
- Prisma ORM
- PostgreSQL
- Prisma Postgres
- Vercel
- Zod for validation
- CSS Modules and global CSS utilities
- pnpm for package management

## High-Level Architecture

```text
src/
├─ app/          # Route pages, layouts, feature folders, and route-local logic
├─ components/   # Reusable UI primitives, common patterns, headers, footers, icons
├─ constants/    # Shared values and option definitions
├─ hooks/        # Reusable React hooks
├─ lib/          # Prisma client, shared helpers, fonts, navigation config
├─ styles/       # Global CSS foundations, layout utilities, and reset styles
├─ types/        # TypeScript types and Zod schemas
└─ generated/    # Prisma-generated client artifacts

prisma/
├─ schema.prisma # Database schema and models
├─ migrations/   # Active PostgreSQL migration history
└─ migrations-sqlite/ # Archived SQLite migration history

prisma.config.ts # Prisma CLI and migration configuration
```

## Feature Architecture

The project currently organizes core business features at the route level.

Examples:

```text
src/app/snippets/
├─ _actions/
├─ _components/
├─ [id]/
├─ new/
└─ page.tsx

src/app/collections/
├─ _actions/
├─ _components/
├─ [id]/
├─ new/
└─ page.tsx
```

This keeps the following responsibilities close together:

- route-level UI composition
- feature-specific UI and form handling
- server actions for writes and updates
- feature-related query and utility logic
- related reusable subcomponents

Route-local folders such as `_actions/` and `_components/` are used to keep feature-specific implementation details out of the shared UI layer.

## Shared UI Layer

The shared UI layer is intentionally small and practical.

```text
src/components/
├─ primitives/   # low-level layout and typography building blocks
├─ ui/           # reusable input and control components
├─ common/       # shared patterns such as SearchInput, Pagination, TagInput
├─ Header/       # shell navigation
├─ Footer/       # page footer
├─ icon/         # reusable icon assets
```

This separation makes it easier to keep generic UI reusable without mixing in feature-specific behavior.

Shared components are extracted based on actual reuse rather than speculative abstraction.

## Data Layer

The app uses Prisma as the primary persistence layer with PostgreSQL as the database.

Current responsibilities include:

- Snippet records and metadata
- Collection records and metadata
- Collection-to-Snippet relationship records via `CollectionSnippet`
- validation before writes
- direct server-side CRUD logic in app feature actions
- database access through the shared Prisma client

### Database Structure

The primary models are:

```text
Snippet
   │
   │
   └── CollectionSnippet ─── Collection
```

`CollectionSnippet` is a dedicated join model that stores collection-specific relationship data such as:

- `path`
- `position`

This allows a Snippet to remain an independent record while providing collection-specific context and ordering.

### Database Configuration

The application uses separate connection purposes:

- `DATABASE_URL` for application runtime access
- `DIRECT_URL` for Prisma migration and administrative operations

The Prisma client uses the runtime database connection through the PostgreSQL adapter.

## Deployment Architecture

The application is deployed to Vercel.

```text
User
  │
  ▼
Vercel
  │
  ├─ Next.js application
  │
  └─ Prisma Client
        │
        ▼
   Prisma Postgres
        │
        ▼
    PostgreSQL
```

The production database was migrated from the original SQLite database, and the migrated records were verified after migration.

Prisma Client generation is performed during installation so that the generated client is available during the Vercel build.

## Design Principles

The current architecture follows a simple set of principles:

- keep route-local behavior close to the feature
- keep shared UI generic and reusable
- validate before writing to the database
- prefer explicit CRUD logic over abstraction layers
- use a dedicated relationship model when relationship-specific data is required
- keep database access on the server
- keep the system small enough to extend incrementally
- base abstractions on actual implementation needs rather than speculative reuse

Large-scale architectural changes are not currently a priority.
