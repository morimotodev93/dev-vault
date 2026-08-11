# Code Formatting

DevVault uses Prettier for consistent code formatting.

## Configuration

The project configuration is defined in:

- `.prettierrc.json`
- `.prettierignore`

Formatting rules are shared through the repository rather than
individual editor settings.

## Commands

Format the project:

```bash
pnpm format
```

Check formatting without modifying files:

```bash
pnpm format:check
```

## Editor

VS Code is configured to format files on save using the project's
Prettier configuration.

Developers may use another editor, but should ensure that the
project's Prettier configuration is respected.
