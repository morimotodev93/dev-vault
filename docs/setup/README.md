# Local Setup

This guide explains how to get Dev Vault running locally.

## 1. Requirements

Before installing dependencies, make sure you have:

- Node.js LTS
- pnpm

The current database stack uses PostgreSQL with Prisma's PostgreSQL adapter. The project no longer requires SQLite or `better-sqlite3`.

## 2. Install dependencies

From the project root:

```bash
pnpm install
```

Prisma Client is generated automatically through the project's `postinstall` script.

If needed, generate it manually:

```bash
pnpm prisma generate
```

## 3. Configure the environment

Dev Vault uses PostgreSQL for local development and production.

Create a `.env` file in the project root and configure the database connection variables:

```bash
DATABASE_URL="..."
DIRECT_URL="..."
```

`DATABASE_URL` is used by the application at runtime.

`DIRECT_URL` is used by Prisma CLI operations such as migrations.

Do not commit `.env` or database credentials to the repository.

## 4. Run database migrations

If the database is not initialized yet or the schema has changed:

```bash
pnpm prisma migrate dev
```

The Prisma CLI reads the migration database connection from `DIRECT_URL` through [prisma.config.ts](../../prisma.config.ts).

## 5. Start the app

Start the development server:

```bash
pnpm dev
```

This starts the Next.js application and connects to PostgreSQL through Prisma.

## 6. Standard local setup flow

For a repository that already contains the current schema and migration history, the usual flow is:

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm dev
```

If no migration is pending, the migration step does not need to create a new migration.

## 7. Project-specific notes

- Local development uses PostgreSQL.
- Prisma Client is generated under `src/generated/prisma`.
- Active PostgreSQL migrations are stored under `prisma/migrations`.
- Historical SQLite migrations are preserved under `prisma/migrations-sqlite`.
- Runtime database access uses `DATABASE_URL`.
- Prisma CLI and migration operations use `DIRECT_URL`.
- The current database adapter is `@prisma/adapter-pg`.
- Windows users do not need Python or C++ build tools specifically for the current database stack.

## 8. Common troubleshooting

If the app does not start after installation:

1. confirm `DATABASE_URL` is configured correctly
2. confirm `DIRECT_URL` is available for Prisma CLI operations
3. run `pnpm prisma generate`
4. run `pnpm prisma migrate status`
5. verify that the PostgreSQL database is reachable
6. run `pnpm build` to identify build-time issues

For Windows-specific guidance, see [windows.md](windows.md).

For deployment and production configuration, see [deployment.md](../operations/deployment.md).
