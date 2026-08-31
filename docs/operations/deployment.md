# Deployment Guide

This guide explains the current deployment assumptions for Dev Vault.

## 1. Runtime assumptions

The project currently uses:

- Next.js 16
- React 19
- Prisma 7
- SQLite for local development
- `@prisma/adapter-better-sqlite3`

The runtime configuration is defined in:

- `package.json`
- `prisma/schema.prisma`
- `src/lib/prisma.ts`

## 2. Required environment variables

The app expects a `DATABASE_URL` value for Prisma.

For local development, this is typically:

```bash
DATABASE_URL="file:./dev.db"
```

For deployment, replace it with the target environment's production database connection string.

## 3. Local development flow

The current project uses the following scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

A typical local flow looks like this:

```bash
pnpm install
pnpm prisma generate
pnpm dev
```

For a production-style local verification:

```bash
pnpm install
pnpm prisma generate
pnpm build
pnpm start
```

## 4. Database and migration notes

SQLite is suitable for local development and early iteration, but it is not always the best fit for production scale.

When deploying to a managed environment, consider:

- using a production-grade database provider
- setting `DATABASE_URL` in the deployment environment
- running Prisma migrations during deployment
- avoiding committed local database files
- checking adapter compatibility for the selected database provider

## 5. Hosting options

Because this is a standard Next.js app, it can be deployed to Node.js-compatible hosting environments such as:

- Vercel
- container-based platforms
- managed Node.js hosts
- self-hosted Linux or Windows server environments

The app is not tied to a specific hosting provider and should work on any platform that supports the Next.js runtime and Prisma database access.

## 6. Deployment checklist

Before shipping:

- confirm `DATABASE_URL` is set correctly
- run `pnpm prisma generate`
- run migrations if the schema changed
- run `pnpm build`
- verify the app starts with `pnpm start`
- confirm no local SQLite file is accidentally committed
- keep secret values out of the repository

## 7. Operational guidance

The app is currently structured around:

- App Router pages and route-level feature folders
- server actions for writes
- Prisma for persistence
- shared UI under `src/components`

This means deployment success depends on the runtime environment being able to install native dependencies and run Prisma correctly.

If deployment fails during install or build, check the troubleshooting docs for native dependency issues and platform-specific setup problems.
