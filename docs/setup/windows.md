# Windows Setup

This guide covers the Windows-specific setup steps required for the current Prisma + SQLite stack.

## 1. Native build requirements

The project depends on `better-sqlite3`, which may require a native build on Windows.

If `pnpm install` fails while compiling it, install the required toolchain before retrying.

Common requirements include:

- Python
- Visual Studio Build Tools or a compatible C++ toolchain
- Windows SDK
- a new terminal session after installation so PATH changes take effect

> This is usually an environment problem rather than a project-code problem.

## 2. Install the required tools

Use the Windows installer or Visual Studio installer to add the C++ workload and Python.

After installation, reopen the terminal and verify the tools are available:

```powershell
node -v
pnpm -v
python --version
```

## 3. Install project dependencies

From the project root:

```powershell
pnpm install
```

## 4. Add the local database URL

Create a `.env` file if needed:

```powershell
"DATABASE_URL=file:./dev.db" | Set-Content -Path .env
```

## 5. Generate Prisma client

```powershell
pnpm prisma generate
```

## 6. Run database migrations

```powershell
pnpm prisma migrate dev
```

## 7. Start the app

```powershell
pnpm dev
```

## 8. If installation still fails

Try the following checks:

- close and reopen the terminal after installing build tools
- confirm `node`, `pnpm`, and `python` are available in `PATH`
- remove the old dependency install and retry

Example:

```powershell
Remove-Item -Recurse -Force node_modules
pnpm install
```

Once the native dependency is installed, the project should be able to run normally with the standard Prisma and Next.js commands.
