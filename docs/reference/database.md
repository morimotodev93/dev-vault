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

The core data model is `Snippet`.

```prisma
model Snippet {
  id          String   @id @default(cuid())
  title       String
  description String?
  language    String
  framework   String?
  category    String?
  tags        String
  favorite    Boolean  @default(false)
  priority    Int      @default(0)
  code        String
  memo        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Snippet Fields

| Field         | Type       | Required | Description                                               |
| ------------- | ---------- | -------- | --------------------------------------------------------- |
| `id`          | `String`   | Yes      | Unique snippet identifier generated with `cuid()`         |
| `title`       | `String`   | Yes      | Human-readable snippet title                              |
| `description` | `String?`  | No       | Optional summary or explanation                           |
| `language`    | `String`   | Yes      | Programming language or syntax category                   |
| `framework`   | `String?`  | No       | Optional framework name such as React, Next.js, or Prisma |
| `category`    | `String?`  | No       | Optional high-level grouping                              |
| `tags`        | `String`   | Yes      | Serialized tag data                                       |
| `favorite`    | `Boolean`  | Yes      | Whether the snippet is marked as a favorite               |
| `priority`    | `Int`      | Yes      | Priority score, defaulting to `0`                         |
| `code`        | `String`   | Yes      | Main code content                                         |
| `memo`        | `String?`  | No       | Additional notes                                          |
| `createdAt`   | `DateTime` | Yes      | Creation timestamp                                        |
| `updatedAt`   | `DateTime` | Yes      | Last update timestamp                                     |

## Validation

Form-level validation is defined with Zod in:

`src/types/snippets.ts`

The current validation schema includes:

- Required title
- Optional description
- Required language
- Optional framework
- Optional category
- Tag array input
- Favorite flag
- Priority range from `0` to `5`
- Required code
- Optional memo

## Tags

The Prisma model currently stores `tags` as a `String`, while the Zod form schema represents tags as an array of strings.

The application should explicitly serialize and deserialize tags at the data access boundary.

The current conceptual representation is:

```text
UI / Form layer
string[]
      ↓
Data access layer
serialized string
      ↓
SQLite
String
```

This approach allows the form layer to work with an array while keeping the current database schema simple.

A future version may replace this representation with a normalized `Tag` model or another structured database representation.

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
- `Category`
- `Collection`
- `SnippetRevision`
- `Favorite`
