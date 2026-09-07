# Deployment Guide

This guide explains the current deployment architecture and deployment assumptions for Dev Vault.

## 1. Runtime and deployment environment

The project currently uses:

- Next.js 16
- React 19
- Prisma 7
- PostgreSQL
- Prisma Postgres
- Vercel
- pnpm

The runtime configuration is primarily defined in:

- `package.json`
- `prisma/schema.prisma`
- `prisma.config.ts`
- `src/lib/prisma.ts`

The application uses Prisma Client with the PostgreSQL adapter for database access.

## 2. Environment variables

The application uses separate database connection variables for runtime access and Prisma migration operations.

### `DATABASE_URL`

Used by the application runtime through `src/lib/prisma.ts`.

This should contain the PostgreSQL connection string intended for application access.

### `DIRECT_URL`

Used by Prisma CLI operations through `prisma.config.ts`.

This should contain the direct PostgreSQL connection string used for migrations and administrative operations.

Both values must be configured in the deployment environment.

Do not commit database connection strings or other secret values to the repository.

## 3. Local development flow

Install dependencies:

```bash
pnpm install
```

Prisma Client is generated automatically through the `postinstall` script.

If generation is required manually:

```bash
pnpm prisma generate
```

Start the development server:

```bash
pnpm dev
```

For a production-style local verification:

```bash
pnpm install
pnpm build
pnpm start
```

## 4. Database and migrations

The application uses PostgreSQL as its current database.

The active Prisma migration history is stored in:

```text
prisma/migrations/
```

The previous SQLite migration history is archived separately:

```text
prisma/migrations-sqlite/
```

When the Prisma schema changes, create and apply migrations during development as appropriate.

For deployment environments, use:

```bash
pnpm prisma migrate deploy
```

Do not use `prisma migrate reset` against a production database.

Before applying a migration to production:

- review the generated migration
- verify that the change is intentional
- confirm the target database
- ensure important existing data is preserved when required

## 5. Vercel deployment

The production application is deployed through Vercel.

The expected deployment flow is:

```text
GitHub
   │
   ▼
Vercel
   │
   ├─ Install dependencies
   ├─ Generate Prisma Client
   ├─ Build Next.js application
   │
   ▼
Production application
   │
   ▼
Prisma Postgres
```

The production branch is `main`.

When changes are pushed to the production branch, Vercel can build and deploy the application according to the configured project settings.

## 6. Build requirements

The project uses:

```json
{
  "build": "next build",
  "postinstall": "prisma generate"
}
```

The `postinstall` script ensures that the Prisma Client is generated after dependencies are installed.

A successful local production build can be verified with:

```bash
pnpm build
```

The build should complete successfully before pushing deployment-related changes.

## 7. Deployment checklist

Before shipping:

- confirm the intended changes are committed
- confirm the working tree is clean
- run `pnpm install`
- run `pnpm build`
- verify Prisma Client generation
- review database migrations if the schema changed
- confirm `DATABASE_URL` is configured in Vercel
- confirm `DIRECT_URL` is configured where Prisma migration operations require it
- keep secret values out of the repository
- push the intended production branch
- verify the Vercel deployment succeeds
- test the deployed application after deployment

## 8. Production verification

After deployment, verify the primary application workflows rather than relying only on a successful build.

At minimum, check:

- home page
- snippet browsing
- snippet creation and editing
- collection browsing
- collection creation and editing
- collection ↔ snippet relationships
- search and filtering
- production database reads and writes

Production verification should confirm both application behavior and database connectivity.

## 9. Operational guidance

The application is currently structured around:

- Next.js App Router pages
- route-level feature folders
- server actions for writes
- Prisma for persistence
- PostgreSQL for database storage
- shared UI under `src/components`

The current deployment architecture is intentionally lightweight.

Large-scale infrastructure changes are not currently required unless actual usage or operational requirements justify them.
