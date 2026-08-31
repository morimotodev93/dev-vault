# Troubleshooting

This section collects the most common issues encountered while setting up, building, or running Dev Vault.

## Available topics

- [better-sqlite3.md](better-sqlite3.md) — native build issues related to SQLite and `better-sqlite3`

## When to use this section

Use this section when:

- `pnpm install` fails at a native dependency step
- Prisma cannot initialize the client
- the development app does not start after dependencies are installed
- Windows-specific runtime requirements block the build

## Typical troubleshooting flow

1. Confirm that the Node.js and package manager versions match the project requirements.
2. Check whether the issue is caused by a native module build problem.
3. Verify that `DATABASE_URL` is defined correctly.
4. Run Prisma generation after dependency installation.
5. Re-run the build or startup command with the correct environment variables in place.

## Current known issue pattern

The most common blocker in this project is the `better-sqlite3` native build on Windows. In most cases, this happens because the local environment is missing the required C++ build tooling or Python dependencies.

For the latest fix path, see [better-sqlite3.md](better-sqlite3.md).
