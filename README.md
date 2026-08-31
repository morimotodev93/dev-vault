# Dev Vault

Dev Vault is a local-first snippet manager and knowledge organizer built with Next.js, Prisma, and SQLite.

It helps developers save reusable code, keep notes and examples organized, and group related snippets into curated collections for faster recall and reuse.

## Overview

The app follows the App Router pattern in Next.js and uses Prisma as the persistence layer for both snippets and collection relationships.
The current implementation supports:

- snippet create, read, update, and delete flows
- search, filtering, sorting, and pagination
- favorites and tag-based organization
- collection creation and managed snippet linking
- responsive browsing and detail views

## Current Features

- Snippet CRUD
- Search and filtering
- Sorting and pagination
- Favorite toggles
- Tag management
- Collection creation and detail views
- Manual snippet selection within collections
- `CollectionSnippet` metadata for ordering and path context
- SQLite-backed local development data
- Prisma schema-driven data access

## Tech Stack

- Next.js
- React
- TypeScript
- Prisma
- SQLite
- Zod
- CSS Modules
- pnpm

## Quick Start

```bash
pnpm install
pnpm prisma generate
pnpm dev
```

If you are on Windows, refer to the Windows setup guide for native dependency notes and troubleshooting details.

## Documentation

Start from the documentation index for the project map and recommended reading order.

- [Documentation Index](docs/README.md)
- [Project Structure](docs/overview/project-structure.md)
- [Development Standards](docs/development/development-standards.md)
- [Component Organization](docs/development/components.md)
- [Scaffolding Guide](docs/development/scaffolding.md)
- [Code Formatting](docs/development/code-formatting.md)
- [Setup Guide](docs/setup/README.md)
- [Windows Setup Notes](docs/setup/windows.md)
- [Usage: Snippets](docs/usage/snippets.md)
- [Usage: Collections](docs/usage/collections.md)
- [Deployment Guide](docs/operations/deployment.md)
- [Troubleshooting](docs/operations/troubleshooting/README.md)
- [API Reference](docs/reference/api.md)
- [Database Reference](docs/reference/database.md)
- [Roadmap](docs/planning/roadmap.md)
- [Development Progress](docs/planning/progress.md)
- [Changelog](docs/planning/changelog.md)

## Project Structure

```text
.
├─ prisma/
├─ public/
├─ src/
├─ docs/
├─ README.md
├─ package.json
├─ pnpm-lock.yaml
├─ prisma.config.ts
├─ tsconfig.json
└─ next.config.ts
```

For a more detailed breakdown, see the project structure overview in the docs.

## Notes

This repository is intentionally structured around a simple, maintainable workflow:

- keep the app local-first and focused
- prefer clear route-local implementation patterns
- document the current app state rather than outdated conceptual plans
- grow features incrementally as usage and requirements become clearer
