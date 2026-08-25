# Database

Dev Vault uses Prisma ORM for database access.

SQLite is currently used for local development, with `better-sqlite3` as the runtime SQLite driver.

## Database Configuration

The Prisma datasource is configured to use SQLite.

```prisma
datasource db {
  provider = "sqlite"
}
```

The runtime Prisma client uses `@prisma/adapter-better-sqlite3` and reads the database URL from `DATABASE_URL`.

If `DATABASE_URL` is not set, the application falls back to:

`file:./dev.db`

## Prisma Client

The generated Prisma Client output is configured as:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

The shared Prisma client is defined in:

`src/lib/prisma.ts`

## Data Model

The current Prisma schema includes `Snippet`, `Collection`, and the join model `CollectionSnippet`.

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

## Snippet Fields

| Field         | Type       | Required | Description                                               |
| ------------- | ---------- | -------- | --------------------------------------------------------- |
| `id`          | `String`   | Yes      | Unique snippet identifier generated with `cuid()`         |
| `title`       | `String`   | Yes      | Human-readable snippet title                              |
| `description` | `String?`  | No       | Optional summary or explanation                           |
| `language`    | `String?`  | No       | Optional programming language or syntax category          |
| `framework`   | `String?`  | No       | Optional framework name such as React, Next.js, or Prisma |
| `tags`        | `String`   | Yes      | Serialized tag list stored as a single string in Prisma   |
| `favorite`    | `Boolean`  | Yes      | Whether the snippet is marked as a favorite               |
| `priority`    | `Int`      | Yes      | Priority score, defaulting to `0`                         |
| `code`        | `String`   | Yes      | Main code content                                         |
| `memo`        | `String?`  | No       | Additional notes                                          |
| `createdAt`   | `DateTime` | Yes      | Creation timestamp                                        |
| `updatedAt`   | `DateTime` | Yes      | Last update timestamp                                     |

## Collection Fields

| Field          | Type       | Required | Description                                          |
| -------------- | ---------- | -------- | ---------------------------------------------------- |
| `id`           | `String`   | Yes      | Unique collection identifier generated with `cuid()` |
| `title`        | `String`   | Yes      | Human-readable collection title                      |
| `description`  | `String?`  | No       | Optional collection summary                          |
| `category`     | `String`   | Yes      | Collection purpose or genre                          |
| `language`     | `String?`  | No       | Main language used by the collection                 |
| `frameworks`   | `Json`     | Yes      | JSON array of framework names for metadata display   |
| `favorite`     | `Boolean`  | Yes      | Whether the collection is marked as a favorite       |
| `priority`     | `Int`      | Yes      | Priority score, defaulting to `0`                    |
| `interest`     | `Int`      | Yes      | Interest rating for the collection                   |
| `practicality` | `Int`      | Yes      | Practicality rating for the collection               |
| `createdAt`    | `DateTime` | Yes      | Creation timestamp                                   |
| `updatedAt`    | `DateTime` | Yes      | Last update timestamp                                |

## Collection Snippet Links

The `CollectionSnippet` model stores the relationship between a `Collection` and a `Snippet`.

| Field          | Type      | Required | Description                                     |
| -------------- | --------- | -------- | ----------------------------------------------- |
| `id`           | `String`  | Yes      | Unique link identifier generated with `cuid()`  |
| `collectionId` | `String`  | Yes      | Reference to the parent collection              |
| `snippetId`    | `String`  | Yes      | Reference to the linked snippet                 |
| `path`         | `String?` | No       | Optional snippet-specific path or file location |
| `position`     | `Int`     | Yes      | Ordering inside the collection                  |

The relation is enforced with a unique composite key on `(collectionId, snippetId)` and cascade deletes on both sides.

## Validation

Form-level validation is defined with Zod in:

`src/types/snippet.ts`

The current validation schema includes:

- Required title
- Optional description
- Optional language or framework
- Tag array input
- Favorite flag
- Priority values from the shared snippet priority constants
- Required code
- Optional memo

`language` and `framework` are intentionally treated as optional in combination, and the schema enforces that at least one of them is present.

## Tags

The application currently stores a snippet's tags as a serialized string in Prisma, while the form layer still accepts an array of strings before conversion.

Prisma model:

```prisma
tags String
```

Form layer:

```ts
["typescript", "react", "nextjs"];
```

At persistence time, the UI serializes the array into a single string value. The data layer does not currently use a dedicated `Tag` table or `String[]` column.

## Tag Operations

The tag input supports:

- Adding a tag
- Preventing duplicate tags
- Removing a tag
- Displaying multiple tags

Tag management remains part of the `Snippet` model for now. Future normalization into a dedicated tag table is possible if the application needs:

- Shared tag metadata
- Tag statistics
- Tag administration pages
- Cross-snippet tag relationships
- Advanced tag filtering

## Database Migrations

Prisma Migrate is used to manage database schema changes.

Migration files are stored in:

`prisma/migrations/`

When the Prisma schema is changed, create and apply a migration during development.

## Future Database Direction

SQLite is suitable for local development and early prototyping.

For production, the application may migrate to PostgreSQL or another production-oriented database while keeping Prisma as the primary data access layer.

Potential future models include:

- `User`
- `Tag`
- `SnippetRevision`
- `Favorite`
- `CollectionTemplate`
