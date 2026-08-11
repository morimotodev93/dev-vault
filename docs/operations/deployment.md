# Deployment

Dev Vault is a Next.js application and can be deployed to standard Node.js-compatible hosting environments.

## Current Runtime Assumptions

The current project uses:

- Next.js 16
- React 19
- Prisma ORM
- SQLite for local development
- `@prisma/adapter-better-sqlite3`

## Local Development Database

SQLite is suitable for local development and early prototyping. The application reads `DATABASE_URL` from the environment and falls back to:

```text
file:./dev.db
```

## Environment Variables

Recommended environment variable:

`DATABASE_URL=file:./dev.db`
For production deployments, this should be replaced with the production database connection string.

## Build Process

The project defines the following scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

Typical deployment flow:

```shell
pnpm install
pnpm prisma generate
pnpm build
pnpm start
```

## Production Database Considerations

SQLite is convenient for development, but production deployments may require a more scalable database such as PostgreSQL.

When moving to production:

- Use a managed database provider.
- Store connection strings in environment variables.
- Run migrations as part of the deployment process.
- Avoid committing local database files.
- Confirm Prisma adapter requirements for the selected database.

## Hosting

The application can be hosted on platforms that support Next.js and Node.js, such as:

- Vercel
- Node.js servers
- Container-based platforms

Other serverless or hybrid hosting providers compatible with Next.js

## Deployment Checklist

Before production deployment:

- Configure DATABASE_URL.
- Generate Prisma Client.
- Run database migrations.
- Build the Next.js app.
- Verify environment-specific settings.
- Confirm that sensitive values are not committed to the repository.
- Review database backup and migration strategy.
