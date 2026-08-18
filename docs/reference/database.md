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
  tags        String[]
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
| `tags`        | `String[]` | Yes      | Multiple tags associated with the snippet                 |
| `favorite`    | `Boolean`  | Yes      | Whether the snippet is marked as a favorite               |
| `priority`    | `Int`      | Yes      | Priority score, defaulting to `0`                         |
| `code`        | `String`   | Yes      | Main code content                                         |
| `memo`        | `String?`  | No       | Additional notes                                          |
| `createdAt`   | `DateTime` | Yes      | Creation timestamp                                        |
| `updatedAt`   | `DateTime` | Yes      | Last update timestamp                                     |

                                 |

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

Tags are represented as an array of strings throughout the application.

The form layer uses:

```ts
string[]
```

and the Prisma model also stores:

```prisma
tags String[]
```

This allows a snippet to have multiple tags without requiring serialization or deserialization between the form and database layers.

For example:

```ts
["typescript", "react", "nextjs"];
```

A snippet can therefore contain multiple tags, and each tag can be displayed independently in the UI.

## Tag Operations

The tag input supports:

- Adding a tag
- Preventing duplicate tags
- Removing a tag
- Displaying multiple tags

The current implementation keeps tag management directly on the Snippet model.

A future version may normalize tags into a dedicated Tag model if tag management becomes more complex, such as:

- Shared tag metadata
- Tag-based statistics
- Tag management pages
- Tag relationships across snippets
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
- `Category`
- `Collection`
- `SnippetRevision`
- `Favorite`
