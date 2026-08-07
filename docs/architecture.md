# Architecture Overview

Dev Vault is a lightweight knowledge-management application for storing and organizing development snippets, notes, and reusable code examples.

The current implementation is a Next.js application using the App Router, Prisma-based persistence, and a small component-oriented structure designed for future expansion.

## Goals

- Provide a clean interface for saving and browsing code snippets.
- Keep the architecture simple, understandable, and easy to extend.
- Support future multilingual and global usage.
- Separate UI, shared utilities, validation, and data access responsibilities.
- Keep the codebase type-safe with TypeScript and schema validation.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Prisma ORM
- SQLite for local development
- Zod for form and data validation
- ESLint and Prettier for code quality
- CSS Modules and global CSS utilities for styling

## Application Layers

```text
src/
├─ app/          # App Router pages, layouts, and route-level UI
├─ components/   # Reusable UI primitives, icons, and shared components
├─ constants/    # Shared configuration values
├─ hooks/        # Reusable React hooks
├─ lib/          # Shared utilities, Prisma client, fonts, and navigation config
├─ styles/       # Global CSS, design tokens, layout utilities, and reset styles
└─ types/        # TypeScript types and Zod schemas

prisma/
├─ schema.prisma # Prisma schema and data model
└─ migrations/   # Database migration history
```
