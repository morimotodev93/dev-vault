# API and Data Access Reference

Dev Vault does not currently expose a public HTTP API.

The app uses Next.js App Router server components and server actions for data access, with Prisma as the persistence layer.

## Current Status

The current codebase includes:

- Prisma schema and generated client output
- a shared Prisma client in `src/lib/prisma.ts`
- Zod schemas for form validation in `src/types/`
- server actions for snippet and collection writes
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
4. Store only sanitized, typed values.

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

## Prisma Client Setup

The shared Prisma client is created in `src/lib/prisma.ts`.

Current setup:

```ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

export const prisma = new PrismaClient({ adapter });
```

This means the app currently expects a SQLite-backed Prisma configuration through `DATABASE_URL`.

## Error Handling

The application currently uses simple action-level error responses rather than a formal API error envelope.

Recommended pattern for future expansion:

```ts
type ActionResult<T> =
  { success: true; data: T } | { success: false; error: string };
```

## Future API Direction

If a public API is added later, the project should document:

- endpoint path
- HTTP method
- request shape
- response shape
- error payloads
- auth or access requirements

At present, it is better to treat the server actions as the app's current data access contract.
