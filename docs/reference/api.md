# API and Data Access Reference

Dev Vault does not currently expose a public HTTP API.

The app uses Next.js App Router server components and server actions for data access, with Prisma as the persistence layer.

## Current Status

The current codebase includes:

- Prisma schema and generated client output
- a shared Prisma client in `src/lib/prisma.ts`
- Zod schemas for form validation in `src/types/`
- server actions for snippet and collection writes
- PostgreSQL as the application database
- no dedicated REST or GraphQL contract yet

## Server Action Pattern

The current project pattern is not a public API layer; it is server-side action-based CRUD.

Examples in the app:

- `src/app/snippets/_actions/createSnippet.ts`
- `src/app/snippets/_actions/updateSnippet.ts`
- `src/app/snippets/_actions/deleteSnippet.ts`
- `src/app/snippets/_actions/toggleFavorite.ts`
- `src/app/collections/_actions/createCollection.ts`
- `src/app/collections/_actions/updateCollection.ts`
- `src/app/collections/_actions/deleteCollection.ts`
- `src/app/collections/_actions/deleteCollectionSnippet.ts`
- `src/app/collections/_actions/addCollectionSnippets.ts`

These functions validate input, call Prisma, and return a small typed result object such as:

```ts
{
  success: true,
  data: collectionOrSnippet,
}
```

or:

```ts
{
  success: false,
  error: "Invalid input",
}
```

## Validation Boundary

All user-submitted data should be validated before persistence.

Current validation flow:

1. Receive input from form state or server action arguments.
2. Parse with Zod.
3. Reject invalid input before Prisma writes.
4. Store only validated, typed values.

Examples:

- `src/types/snippet.ts`
- `src/types/collection.ts`

## Snippet Data Contract

The current snippet form contract is defined by `snippetFormSchema`.

Fields include:

- `title`: required string
- `description`: optional string
- `language`: optional string
- `framework`: optional string
- `tags`: string array before serialization
- `favorite`: boolean
- `priority`: numeric priority value
- `code`: required string
- `memo`: optional memo text

At persistence time, the application serializes the tag array into a single string field for Prisma.

## Collection Data Contract

Collection data is validated by `collectionFormSchema` and stored with fields such as:

- `title`
- `description`
- `category`
- `language`
- `frameworks`
- `favorite`
- `priority`
- `interest`
- `practicality`

The collection also relates to snippets through the `CollectionSnippet` join model.

`CollectionSnippet` stores relationship-specific information:

- `collectionId`
- `snippetId`
- `path`
- `position`

The relation prevents the same Snippet from being added to the same Collection more than once through a composite unique constraint.

## Prisma Client Setup

The shared Prisma client is created in `src/lib/prisma.ts`.

The application uses the PostgreSQL adapter provided by `@prisma/adapter-pg`.

The runtime database connection uses `DATABASE_URL`:

```ts
const databaseUrl = process.env.DATABASE_URL;

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });
```

`DATABASE_URL` is used by the application at runtime and points to the pooled PostgreSQL connection.

Prisma CLI operations such as migrations use `DIRECT_URL`, configured through `prisma.config.ts`.

The current database stack is:

```text
Next.js
   │
   ▼
Server Actions / Server Components
   │
   ▼
Prisma Client
   │
   ▼
PrismaPg Adapter
   │
   ▼
PostgreSQL
   │
   ▼
Prisma Postgres
```

## Database Schema

The primary data models are:

- `Snippet`
- `Collection`
- `CollectionSnippet`

`CollectionSnippet` is an explicit relation model because the relationship itself stores additional data such as `path` and `position`.

The current Prisma schema is defined in:

`prisma/schema.prisma`

Active PostgreSQL migrations are stored in:

`prisma/migrations/`

Historical SQLite migrations are archived separately in:

`prisma/migrations-sqlite/`

## Error Handling

The application currently uses simple action-level error responses rather than a formal API error envelope.

The general result pattern is:

```ts
type ActionResult<T> =
  { success: true; data: T } | { success: false; error: string };
```

This pattern is intended for internal server actions rather than a public HTTP API.

## Public API Status

There is currently no dedicated REST or GraphQL API.

Server actions are considered internal application data-access boundaries and should not be treated as a stable public API contract.

If external clients or integrations are introduced later, a dedicated API layer should document:

- endpoint path
- HTTP method
- request shape
- response shape
- error payloads
- authentication and authorization requirements
- versioning strategy

Until then, the server actions and their validation boundaries represent the application's current data-access contract.
