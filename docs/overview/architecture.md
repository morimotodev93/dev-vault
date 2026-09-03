# Architecture Overview

Dev Vault is a lightweight knowledge-management application for storing, organizing, and curating development snippets, notes, and reusable code examples.

The app is built with Next.js App Router, Prisma persistence, and a simple feature-oriented structure that keeps route logic and shared UI separate.

## Goals

- Provide a clean and fast way to save and browse reusable code snippets.
- Keep the architecture simple, explicit, and easy to extend.
- Support both snippets and curated collection workflows.
- Separate route logic, reusable UI, validation, and data access responsibilities.
- Maintain type-safety with TypeScript and Zod-based validation.

## Current Tech Stack

- Next.js with App Router
- React
- TypeScript
- Prisma ORM
- SQLite for local development
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
├─ migrations/   # Migration history
└─ migration_lock.toml
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

## Data Layer

The app uses Prisma as the primary persistence layer.

Current responsibilities:

- Snippet records and metadata
- Collection records
- Collection-to-Snippet relationship records via `CollectionSnippet`
- validation before writes
- direct server-side CRUD logic in app feature actions

## Design Principles

The current architecture follows a simple set of principles:

- keep route-local behavior close to the feature
- keep shared UI generic and reusable
- validate before writing to the database
- prefer explicit CRUD logic over abstraction layers
- keep the system small enough to extend incrementally
