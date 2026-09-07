# Documentation Index

This is the main documentation entry point for Dev Vault.

Use this page as a starting point when you want to understand the project architecture, development conventions, setup flow, current app usage, operational environment, or project history.

## Documentation Map

```text
docs/
├─ overview/        # project architecture and structure
├─ development/     # development standards, components, scaffolding
├─ setup/           # local setup instructions
├─ usage/           # current workflows for snippets and collections
├─ operations/      # deployment and troubleshooting
├─ reference/       # API and database references
├─ planning/        # roadmap, progress, and changelog
└─ README.md        # documentation entry point
```

## Start Here

If you are new to the project, start with:

1. [overview/architecture.md](overview/architecture.md) for the application architecture and technical choices
2. [overview/project-structure.md](overview/project-structure.md) for the repository structure
3. [development/development-standards.md](development/development-standards.md) for development conventions
4. [setup/README.md](setup/README.md) for the local setup flow

## Sections

### Overview

High-level guides for understanding the application architecture and codebase.

- [overview/README.md](overview/README.md)
- [overview/architecture.md](overview/architecture.md)
- [overview/project-structure.md](overview/project-structure.md)

### Development

Guides for implementation, component structure, scaffolding, and development conventions.

- [development/development-standards.md](development/development-standards.md)
- [development/components.md](development/components.md)
- [development/scaffolding.md](development/scaffolding.md)
- [development/code-formatting.md](development/code-formatting.md)

### Setup

Instructions for getting the project running locally.

- [setup/README.md](setup/README.md)
- [setup/windows.md](setup/windows.md)

The current local database stack uses PostgreSQL with Prisma. SQLite and `better-sqlite3` are no longer part of the current setup.

### Usage

Guides describing the current application workflows.

- [usage/snippets.md](usage/snippets.md)
- [usage/collections.md](usage/collections.md)

### Operations

Deployment and troubleshooting guidance for the current application environment.

- [operations/deployment.md](operations/deployment.md)
- [operations/troubleshooting/README.md](operations/troubleshooting/README.md)

Historical troubleshooting material is archived separately:

- [operations/troubleshooting/archive/better-sqlite3.md](operations/troubleshooting/archive/better-sqlite3.md)

### Reference

Technical references for the current application data-access and database structure.

- [reference/README.md](reference/README.md)
- [reference/api.md](reference/api.md)
- [reference/database.md](reference/database.md)

The current database stack is PostgreSQL with Prisma, with Prisma Postgres used for the production database infrastructure.

### Planning

Project direction, development progress, and change history.

- [planning/roadmap.md](planning/roadmap.md)
- [planning/progress.md](planning/progress.md)
- [planning/changelog.md](planning/changelog.md)

## Current Project Status

The core Snippet and Collection workflows are implemented and stable.

The application currently includes:

- Snippet CRUD, search, filtering, sorting, favorites, tags, and pagination
- Collection management and CollectionSnippet relationships
- Collection-specific metadata, paths, and ordering
- Home page with project statistics and recent content
- Project introduction page at `/about`
- PostgreSQL persistence through Prisma
- Prisma Postgres production database infrastructure
- Vercel production deployment

The project is currently in a refinement and completion phase. Remaining work focuses on practical UX improvements, accessibility, edge-case handling, documentation consistency, and incremental structural improvements.

## When to Use Which Section

- Use **Overview** when you want to understand the project architecture or repository structure.
- Use **Development** when implementing features or following project conventions.
- Use **Setup** when preparing a local development environment.
- Use **Usage** when you need to understand current application workflows.
- Use **Operations** when deploying the application or troubleshooting runtime issues.
- Use **Reference** when you need technical details about data access or the database.
- Use **Planning** when reviewing project direction, development progress, or change history.
