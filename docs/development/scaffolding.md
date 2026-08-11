# Scaffolding

DevVault provides PowerShell scripts for generating commonly used
component structures.

## Component Generator

The component generator creates the following structure:

```text
src/components/
└─ ComponentName/
   ├─ ComponentName.tsx
   ├─ ComponentName.module.css
   └─ index.ts
```

### Usage

```powershell
.\scripts\new-component.ps1 -Name Button
```

The default output directory is:

`src/components/`

A different output directory can be specified with -Path.

```PowerShell
.\scripts\new-component.ps1 `
  -Name QuickActions `
  -Path src/app/home
```

### Customization

The generator is a development convenience, not a required part of
the application architecture.

Developers may modify the script or create components manually when
a different structure is more appropriate.
