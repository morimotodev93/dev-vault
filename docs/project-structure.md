# Project Structure

This project is organized as a Next.js App Router application with a component-oriented frontend and Prisma-based persistence.

## Root-Level Structure

```text
.
├─ docs/              # Project documentation
├─ prisma/            # Prisma schema and migrations
├─ public/            # Static assets
├─ src/               # Application source code
├─ package.json       # Scripts and dependencies
└─ tsconfig.json      # TypeScript configuration
```

## Source Directory

```text
src/
├─ app/
├─ components/
├─ constants/
├─ hooks/
├─ lib/
├─ styles/
└─ types/
```

### src/app

The app directory contains Next.js App Router files.

Current responsibilities:

Root layout

Global metadata

Page-level routing

Home page composition

Current examples:

```text
src/app/layout.tsx
src/app/page.tsx
src/app/home/hero/Hero.tsx
```

### src/components

The components directory contains reusable UI pieces.

Current structure:

```text
src/components/
├─ icon/
└─ primitives/
```

### Icons

Icon components are grouped by purpose:

```text
src/components/icon/
├─ circle/
├─ navigation/
└─ util/
```

### Primitives

Primitive components are small reusable UI elements. The current implementation includes:

```text
src/components/primitives/spacer/
```

Future primitives may include:

Button
Text
Heading
Container
Stack
Grid
Surface
Link

### src/constants

Shared constants live in this directory.

Current examples:

```text
src/constants/breakpoints.ts
src/constants/index.ts
```

### src/hooks

Reusable React hooks live in this directory.

Current examples:

```text
src/hooks/useBreakPoint.ts
src/hooks/useMediaQuery.ts
```

### src/lib

Shared utilities and app-level configuration live in lib.

Current examples:

```text
src/lib/fonts.ts
src/lib/fonts.cjk.ts
src/lib/navigation.ts
src/lib/prisma.ts
```

Responsibilities include:

Font configuration

Navigation configuration

Prisma client setup

Shared helpers

### src/styles

Global CSS, design tokens, layout utilities, and reusable utility classes live in styles.

Current structure:

```text
src/styles/
├─ foundation/
├─ layout/
├─ utility/
├─ global.css
└─ reset.css
```

### src/types

Shared TypeScript types and validation schemas live in types.

Current examples:

```text
src/types/navigation.ts
src/types/snippets.ts
```

### prisma

The prisma directory contains database configuration.

```text
prisma/
├─ schema.prisma
└─ migrations/
```

### Suggested Future Feature Structure

As the application grows, feature-specific logic can be placed under src/features.

```text
src/features/
├─ snippets/
├─ tags/
├─ favorites/
└─ search/
```

Each feature can contain:

```text
feature-name/
├─ components/
├─ actions/
├─ queries/
├─ schemas/
├─ types/
└─ utils/
```

This keeps domain logic separate from generic UI components and shared utilities.
