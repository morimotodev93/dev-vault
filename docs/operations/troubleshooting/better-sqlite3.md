# better-sqlite3 troubleshooting

If `pnpm install` fails while building `better-sqlite3`, the package is likely trying to compile a native module in your local environment.

This project currently uses `@prisma/adapter-better-sqlite3` and `better-sqlite3`, so the dependency must be buildable on the machine running the app.

## Common cause

On Windows, this usually happens when the environment is missing one or more required native build tools.

Typical prerequisites include:

- Python
- Microsoft C++ Build Tools
- Windows SDK
- a compatible Node.js version for the installed package versions

## Recommended setup

Install the required build tooling before reinstalling dependencies:

1. Install Python for Windows.
2. Install Visual Studio Build Tools or the C++ build workload.
3. Ensure the MSBuild toolchain is available in `PATH`.
4. Re-run:

```bash
pnpm install
```

## If the install still fails

Try the following checks:

```bash
node -v
pnpm -v
python --version
```

Then remove the existing install artifacts and reinstall:

```bash
rm -rf node_modules
rm -rf pnpm-lock.yaml
pnpm install
```

On Windows PowerShell, the equivalent is usually:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml
pnpm install
```

## Next step after install

Once dependencies are installed successfully, generate the Prisma client:

```bash
pnpm prisma generate
```

Then start the app:

```bash
pnpm dev
```

## Notes

This issue is environment-specific and not usually caused by the application code itself. The fix is generally to provide the native build tooling required by the SQLite driver.
