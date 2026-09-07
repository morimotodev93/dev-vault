# Reference

This section contains technical references for the current Dev Vault implementation.

## Available Documents

- [api.md](api.md) — server-side data access patterns, server actions, validation boundaries, and current application data contracts
- [database.md](database.md) — Prisma schema, PostgreSQL configuration, data model, relationships, and database behavior

## Use this section when

- you need to confirm how application data is read or written
- you want to understand the Prisma schema and database relationships
- you need to review the current server action and validation flow
- you need to understand the current PostgreSQL database configuration
- you are checking the current application data contract before adding or modifying features

## Current Scope

The reference documents describe the application's current implementation rather than a future or planned architecture.

They cover:

- internal server-side data access through Next.js Server Actions
- Zod-based validation boundaries
- Prisma Client and PostgreSQL
- the `Snippet`, `Collection`, and `CollectionSnippet` data models
- collection-snippet relationships and ordering
- current data serialization choices such as tags and collection frameworks

For planned changes and future possibilities, see the documentation under `planning/`.
