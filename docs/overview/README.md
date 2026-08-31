# Overview

This section gives a high-level view of the Dev Vault application and how the codebase is organized.

## Available Documents

- [architecture.md](architecture.md) — application architecture and core technical choices
- [project-structure.md](project-structure.md) — repository structure and the role of each major directory

## Recommended Starting Point

Start with the architecture overview if you want to understand the product direction and system boundaries.

Then read the project structure guide to see how the current feature folders and shared directories are arranged.

## Current Scope

The current app includes:

- Snippet CRUD, search, filtering, sorting, and pagination
- Collection management and relation-based collection snippets
- Prisma-backed persistence with SQLite for local development
- App Router pages and route-local feature folders
- Shared UI primitives, icon assets, and reusable common patterns
