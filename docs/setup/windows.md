# Windows Setup

This guide covers Windows-specific considerations for running Dev Vault locally.

Dev Vault currently uses Next.js, Prisma, and PostgreSQL. The application no longer depends on SQLite or `better-sqlite3`, so no native SQLite build toolchain is required for the current setup.

## 1. Required tools

Install the following tools:

- Node.js LTS
- pnpm

Verify the installation from PowerShell:

```powershell
node -v
pnpm -v
```

No additional Python or C++ build toolchain is required specifically by the current database stack.

## 2. Install project dependencies

From the project root:

```powershell
pnpm install
```

The project's `postinstall` script automatically generates the Prisma Client after dependencies are installed.

If needed, Prisma Client can also be generated manually:

```powershell
pnpm prisma generate
```

## 3. Configure environment variables

Local development requires the appropriate database environment variables.

Create a `.env` file in the project root and configure:

```text
DATABASE_URL="..."
DIRECT_URL="..."
```

`DATABASE_URL` is used by the application at runtime.

`DIRECT_URL` is used by Prisma CLI operations such as migrations.

Do not commit `.env` or database credentials to the repository.

## 4. Run database migrations

If the local database needs to be initialized or updated:

```powershell
pnpm prisma migrate dev
```

Prisma CLI uses `DIRECT_URL` through `prisma.config.ts`.

## 5. Start the app

Start the development server:

```powershell
pnpm dev
```

The application runs through Next.js and connects to PostgreSQL through Prisma.

## 6. Verify the local environment

If the application does not start correctly, verify:

```powershell
node -v
pnpm -v
```

Then check the following:

- required environment variables are defined
- `DATABASE_URL` points to the intended PostgreSQL database
- `DIRECT_URL` is available for Prisma CLI operations
- Prisma Client has been generated
- the database migration state is current

Useful commands:

```powershell
pnpm prisma generate
pnpm prisma migrate status
pnpm build
```

## 7. Windows-specific notes

The current project does not require Windows-specific native compilation for its database adapter.

If `pnpm install` fails with a native module error, first identify which dependency is actually reporting the error rather than assuming that Python or Visual Studio Build Tools are required.

The previous `better-sqlite3` build issue is documented as historical troubleshooting material under:

`docs/operations/troubleshooting/archive/better-sqlite3.md`

## 8. Production environment

Local Windows development and production use the same PostgreSQL-based application architecture.

Production is deployed through Vercel with PostgreSQL provided by Prisma Postgres.

See [deployment.md](../operations/deployment.md) for deployment and production environment details.
