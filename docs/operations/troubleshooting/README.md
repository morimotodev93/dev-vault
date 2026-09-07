# Troubleshooting

This section collects troubleshooting guidance for issues encountered while setting up, building, deploying, or running Dev Vault.

## Available topics

### Current

No dedicated troubleshooting guides are currently documented.

### Archive

- [better-sqlite3.md](archive/better-sqlite3.md) — historical native build issues from the previous SQLite and `better-sqlite3` setup

Archived documents describe issues from previous project configurations and are kept for historical reference. They are not part of the current application stack.

## When to use this section

Use this section when:

- `pnpm install` fails
- Prisma Client cannot be generated or initialized
- the development app does not start
- the production build fails
- database connection or migration issues occur
- Vercel deployment fails
- environment variables are missing or incorrectly configured

## Typical troubleshooting flow

1. Confirm that the Node.js and package manager versions match the project requirements.
2. Check the installation and build output for the first reported error.
3. Verify that the required environment variables are defined correctly.
4. Run Prisma generation when dependency or Prisma configuration changes are involved.
5. Check the database connection and migration state when database-related errors occur.
6. Re-run the build or startup command after correcting the underlying issue.

## Current environment

Dev Vault currently uses:

- Next.js
- React
- TypeScript
- Prisma ORM
- PostgreSQL
- Prisma Postgres
- Vercel
- pnpm

The application no longer uses SQLite or `better-sqlite3`.

For deployment and environment configuration, see [deployment.md](../deployment.md).
