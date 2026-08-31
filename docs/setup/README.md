# Local Setup

This guide explains how to get Dev Vault running locally.

## 1. Requirements

Before installing dependencies, make sure you have:

- Node.js LTS
- pnpm
- Python on Windows for native module builds
- a C++ build toolchain on Windows for `better-sqlite3`

## 2. Install dependencies

From the project root:

```bash
pnpm install
```

If installation fails while building `better-sqlite3`, install the required native build tools first and then retry.

## 3. Configure the environment

This project uses Prisma with SQLite for local development. Create a `.env` file in the project root if it does not already exist:

```bash
DATABASE_URL="file:./dev.db"
```

The Prisma config in [prisma.config.ts](../../prisma.config.ts) reads this value and uses it for schema and migration operations.

## 4. Generate the Prisma client

```bash
pnpm prisma generate
```

## 5. Run the database migration

If the database is not initialized yet:

```bash
pnpm prisma migrate dev
```

If the repository already contains the schema and migration history, the usual flow is a bit shorter:

```bash
pnpm install
pnpm prisma generate
pnpm dev
```

## 6. Start the app

```bash
pnpm dev
```

This starts the app in development mode with Next.js and local Prisma access.

## 7. Project-specific notes

- Local development uses SQLite.
- Prisma migration files are stored under `prisma/migrations`.
- The app expects a runtime environment where native modules can compile correctly.
- Windows users should check [windows.md](windows.md) if `better-sqlite3` fails during installation.

## 8. Common troubleshooting

If the app does not start after installation:

1. confirm `DATABASE_URL` is set correctly
2. run `pnpm prisma generate`
3. make sure the Prisma migration state is current
4. verify the native build dependencies are installed on Windows

For platform-specific guidance, see [windows.md](windows.md).
