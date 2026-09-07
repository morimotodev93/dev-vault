# Overview

This section gives a high-level view of the Dev Vault application, its architecture, and how the codebase is organized.

## Available Documents

- [architecture.md](architecture.md) — application architecture, technical choices, data layer, and deployment structure
- [project-structure.md](project-structure.md) — repository structure and the role of each major directory

## Recommended Starting Point

Start with the architecture overview if you want to understand the application goals, technical architecture, data layer, and deployment environment.

Then read the project structure guide to see how the current feature folders and shared directories are arranged.

## Current Scope

The current app includes:

- Snippet CRUD, search, filtering, sorting, favorites, tags, and pagination
- Collection management and relation-based collection snippets
- Collection-specific metadata, paths, and ordering
- Home page with project introduction, statistics, and recent content
- Project introduction page at `/about`
- Next.js App Router pages with route-local feature folders
- Shared UI primitives, icon assets, and reusable common patterns
- Prisma-backed PostgreSQL persistence
- Prisma Postgres for production database infrastructure
- Vercel production deployment

## Current Phase

The core Snippet and Collection workflows are implemented and stable.

The project is currently in a refinement and completion phase, with remaining work focused on practical UX improvements, accessibility, edge-case handling, and incremental structural cleanup.
