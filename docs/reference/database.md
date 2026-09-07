# Database Reference

Dev Vault uses Prisma ORM with PostgreSQL as its database.

The production database is provided through Prisma Postgres, and the application connects to PostgreSQL through the Prisma PostgreSQL adapter.

This document describes the current database configuration, data model, and data patterns used by the application.

## 1. Database configuration

The Prisma datasource is configured in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
}
```

The runtime Prisma client is created in `src/lib/prisma.ts` using `@prisma/adapter-pg`.

The application uses `DATABASE_URL` for the runtime database connection.

Prisma CLI operations such as migrations use `DIRECT_URL`, configured through `prisma.config.ts`.

The current configuration separates the application runtime connection from the direct connection used for database administration and migrations.

```text
DATABASE_URL
  → Runtime application connection
  → PrismaPg adapter
  → PostgreSQL

DIRECT_URL
  → Prisma CLI / migrations
  → PostgreSQL
```

## 2. Prisma client output

The Prisma client output is configured as:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

The generated client is intentionally kept under `src/generated/prisma` and should not be edited by hand.

The Prisma Client is generated automatically after dependency installation through the `postinstall` script:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

## 3. Current data model

The current schema includes `Snippet`, `Collection`, and the join model `CollectionSnippet`.

```prisma
model Snippet {
  id          String   @id @default(cuid())
  title       String
  description String?
  language    String?
  framework   String?
  tags        String
  favorite    Boolean  @default(false)
  priority    Int      @default(0)
  code        String
  memo        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  collections CollectionSnippet[]
}

model Collection {
  id           String   @id @default(cuid())
  title        String
  description  String?
  category     String
  language     String?
  frameworks   Json
  favorite     Boolean  @default(false)
  priority     Int      @default(0)
  interest     Int
  practicality Int
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  snippets CollectionSnippet[]
}

model CollectionSnippet {
  id           String  @id @default(cuid())
  collectionId String
  snippetId    String
  path         String?
  position     Int

  collection Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)
  snippet    Snippet    @relation(fields: [snippetId], references: [id], onDelete: Cascade)

  @@unique([collectionId, snippetId])
}
```

## 4. Snippet fields

| Field         | Type       | Required | Notes                |
| ------------- | ---------- | -------- | -------------------- |
| `id`          | `String`   | Yes      | CUID identifier      |
| `title`       | `String`   | Yes      | Title of the snippet |
| `description` | `String?`  | No       | Optional description |
| `language`    | `String?`  | No       | Optional language    |
| `framework`   | `String?`  | No       | Optional framework   |
| `tags`        | `String`   | Yes      | Serialized tag list  |
| `favorite`    | `Boolean`  | Yes      | Default `false`      |
| `priority`    | `Int`      | Yes      | Default `0`          |
| `code`        | `String`   | Yes      | Main code content    |
| `memo`        | `String?`  | No       | Additional notes     |
| `createdAt`   | `DateTime` | Yes      | Created timestamp    |
| `updatedAt`   | `DateTime` | Yes      | Updated timestamp    |

## 5. Collection fields

| Field          | Type       | Required | Notes                       |
| -------------- | ---------- | -------- | --------------------------- |
| `id`           | `String`   | Yes      | CUID identifier             |
| `title`        | `String`   | Yes      | Collection title            |
| `description`  | `String?`  | No       | Optional summary            |
| `category`     | `String`   | Yes      | Purpose or grouping         |
| `language`     | `String?`  | No       | Collection language         |
| `frameworks`   | `Json`     | Yes      | Stored as a framework array |
| `favorite`     | `Boolean`  | Yes      | Default `false`             |
| `priority`     | `Int`      | Yes      | Priority rating             |
| `interest`     | `Int`      | Yes      | Interest rating             |
| `practicality` | `Int`      | Yes      | Practicality rating         |
| `createdAt`    | `DateTime` | Yes      | Created timestamp           |
| `updatedAt`    | `DateTime` | Yes      | Updated timestamp           |

## 6. Collection snippet relation

`CollectionSnippet` stores the relationship between a `Collection` and a `Snippet`.

| Field          | Type      | Required | Notes                                |
| -------------- | --------- | -------- | ------------------------------------ |
| `id`           | `String`  | Yes      | Identifier                           |
| `collectionId` | `String`  | Yes      | Parent collection ID                 |
| `snippetId`    | `String`  | Yes      | Linked snippet ID                    |
| `path`         | `String?` | No       | Optional path metadata               |
| `position`     | `Int`     | Yes      | Ordering value inside the collection |

The model has a unique compound constraint on `(collectionId, snippetId)`.

This prevents the same Snippet from being added to the same Collection more than once.

Both relations use cascade deletes:

- deleting a Collection removes its `CollectionSnippet` records
- deleting a Snippet removes its related `CollectionSnippet` records

The `Snippet` or `Collection` itself is not deleted when a relationship record is removed.

## 7. Tag behavior

The current app serializes tag values as a single string in Prisma.

For example:

```ts
["typescript", "react", "nextjs"];
```

is stored as:

```text
"typescript,react,nextjs"
```

The form layer works with a string array, while the database stores the serialized representation.

This is a deliberate current implementation choice rather than a normalized tag table.

Tag normalization and a dedicated `Tag` model remain possible future improvements if the current representation becomes limiting.

## 8. Framework data

Collection frameworks are stored using Prisma's `Json` type.

The application treats the value as an array of framework names.

Example:

```json
["React", "Next.js", "Prisma"]
```

The database does not use a separate framework relation.

## 9. Migrations

Active PostgreSQL migrations are stored in:

```text
prisma/migrations/
```

The current migration history represents the PostgreSQL database schema.

When the schema changes, create and apply a migration with Prisma CLI commands.

For deployment environments, migrations should be applied with:

```bash
pnpm prisma migrate deploy
```

The project does not use `prisma migrate reset` against the production database.

### Historical SQLite migrations

The previous SQLite migration history is preserved separately in:

```text
prisma/migrations-sqlite/
```

These files are historical reference material and are not part of the active PostgreSQL migration history.

The project no longer uses SQLite or `better-sqlite3`.

## 10. Database environment

The application distinguishes between runtime and migration database connections.

| Variable       | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `DATABASE_URL` | Runtime PostgreSQL connection used by the application          |
| `DIRECT_URL`   | Direct PostgreSQL connection used by Prisma CLI and migrations |

Both values are environment-specific secrets and should not be committed to the repository.

In production, these values are configured through the deployment environment.

## 11. Current database architecture

The current data-access flow is:

```text
Next.js App Router
       │
       ▼
Server Components / Server Actions
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

Prisma remains the application's database access layer.

The application does not expose a public database API directly.

## 12. Future direction

The database migration to PostgreSQL is complete.

Future database-related work should be driven by actual application requirements rather than by replacing the current architecture speculatively.

Potential future extensions include:

- `User`
- a dedicated `Tag` model
- revision history
- more structured collection metadata
- richer access control
- additional relationship metadata

These are not currently part of the application's implemented data model.
