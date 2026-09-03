# Database Reference

Dev Vault uses Prisma ORM and SQLite for local development.

This document describes the current database model and the data patterns the application actually uses today.

## 1. Database configuration

The Prisma datasource is configured in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
}
```

The runtime Prisma client is created in `src/lib/prisma.ts` using `@prisma/adapter-better-sqlite3`.

The app expects a `DATABASE_URL` environment variable, and defaults to:

```bash
file:./dev.db
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
| `priority`     | `Int`      | Yes      | Default `0`                 |
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

The model also has a unique compound key on `(collectionId, snippetId)`.
Both the collection and snippet relations use cascade deletes, so the relationship record is removed when either related record is deleted.

## 7. Tag behavior

The current app still serializes tag values as a single string in Prisma.

Example:

```ts
["typescript", "react", "nextjs"];
```

is stored as:

```ts
"typescript,react,nextjs";
```

This is a deliberate current implementation choice, not a normalized tag table.

## 8. Migrations

Prisma migrations are stored in:

```text
prisma/migrations/
```

When the schema changes, create and apply migrations with Prisma CLI commands.

## 9. Future direction

SQLite is sufficient for the current local development workflow, but this project may later move to a production-grade database while keeping Prisma as the access layer.

Potential future extensions include:

- `User`
- `Tag` as a dedicated model
- revision history
- more structured collection metadata
- richer access control
