# better-sqlite3 Troubleshooting

> **Historical note:** Dev Vault no longer uses `better-sqlite3` or SQLite. The application has been migrated to PostgreSQL and is currently deployed with Prisma Postgres and Vercel.
>
> This document is retained as historical troubleshooting documentation for an issue encountered during the earlier SQLite-based development phase.

## Background

During the SQLite-based development phase, `pnpm install` could fail while building `better-sqlite3`.

The project at that time used:

- `@prisma/adapter-better-sqlite3`
- `better-sqlite3`

Because `better-sqlite3` is a native module, the package could require local build tooling depending on the environment.

## Common Cause

On Windows, installation failures could occur when the environment was missing one or more required native build tools.

Typical prerequisites included:

- Python
- Microsoft C++ Build Tools
- Windows SDK
- a compatible Node.js version for the installed package versions

## Historical Recommended Setup

During the SQLite development phase, the recommended setup was:

1. Install Python for Windows.
2. Install Visual Studio Build Tools or the C++ build workload.
3. Ensure the required MSBuild toolchain is available.
4. Re-run:

```bash
pnpm install
```

## Historical Diagnostics

The following commands were useful for checking the local environment:

```bash
node -v
pnpm -v
python --version
```

If dependency artifacts needed to be rebuilt, the previous installation could be removed before reinstalling.

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml
pnpm install
```

## Historical Prisma Setup

After dependencies were installed successfully, the Prisma Client was generated with:

```bash
pnpm prisma generate
```

The application could then be started with:

```bash
pnpm dev
```

## Current Resolution

This issue is no longer part of the current application environment because the project has migrated from SQLite to PostgreSQL.

The current database stack is:

```text
Next.js
   │
   ▼
Prisma Client
   │
   ▼
PostgreSQL
   │
   ▼
Prisma Postgres
```

The current runtime no longer depends on native SQLite modules such as `better-sqlite3`.
