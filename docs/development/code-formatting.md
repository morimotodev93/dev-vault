# Code Formatting

Dev Vault uses Prettier to keep the codebase consistent and readable.

## 1. Configuration

The project configuration is defined in:

- `.prettierrc.json`
- `.prettierignore`

Formatting rules are shared through the repository rather than through individual editor settings.

## 2. Commands

Format the project:

```bash
pnpm format
```

Check formatting without modifying files:

```bash
pnpm format:check
```

## 3. Editor setup

VS Code is configured to format files on save using the project's Prettier configuration.

Developers may use another editor, but they should still respect the repository's formatting rules.
