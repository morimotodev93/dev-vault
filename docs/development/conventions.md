# Development Conventions

This project uses a small but consistent set of conventions across the app. These rules describe how the current codebase is organized and how new work should fit into it.

## 1. App Router and server/client boundaries

This project is built with Next.js App Router.

- Server components are the default for page and data-fetching logic.
- Client components are used only when browser interactivity is required.
- Interactive UI should explicitly start with `"use client"`.
- Data mutation, validation, and Prisma writes should live in server actions under feature-specific `_actions` folders.

Examples from the current codebase:

- `src/app/snippets/_actions/createSnippet.ts`
- `src/app/collections/_actions/createCollection.ts`
- `src/components/common/SearchInput/SearchInput.tsx`

Rule:

- Use server components for rendering and reading data.
- Use client components only for user interaction, local form state, or browser-only behavior.

## 2. Feature structure

Features use route-local folders instead of one large shared folder.

Current pattern:

```text
src/app/
├─ snippets/
│  ├─ _actions/
│  ├─ _components/
│  ├─ [id]/
│  ├─ new/
│  └─ page.tsx
├─ collections/
│  ├─ _actions/
│  ├─ _components/
│  ├─ [id]/
│  ├─ new/
│  └─ page.tsx
└─ ...
```

This keeps route logic, validation, UI, and data mutation close to the feature they support.

## 3. Server actions and database access

Server actions are the standard place for mutations.

Current conventions:

- Add `"use server"` at the top of a server action file.
- Access Prisma through `@/lib/prisma`.
- Validate request data before executing database operations.
- Revalidate relevant paths after successful writes.

Example pattern:

```ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSnippet(data: SnippetFormValues) {
  const result = snippetFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid input" };
  }

  const snippet = await prisma.snippet.create({
    data: {
      title: result.data.title,
      // ...
    },
  });

  revalidatePath("/snippets");

  return { success: true, data: snippet };
}
```

## 4. Validation with Zod

Forms and mutation inputs are validated with Zod schemas.

Pattern:

- Put schema definitions in `src/types/*.ts`.
- Use `z.object(...)` for form input validation.
- Keep input-level and UI-level validation together.
- Use `safeParse` or `zodResolver` before persistence.

Examples:

- `src/types/snippet.ts`
- `src/types/collection.ts`

This keeps validation rules centralized and reuseable across server and client code.

## 5. Prisma conventions

Prisma is used as the source of truth for persistence.

Current conventions include:

- Use `prisma.<model>.findMany`, `findUnique`, `create`, `update`, and `delete` for CRUD.
- Keep queries close to the feature they serve.
- Use `include` for relational reads when related data is needed in the page.
- Use `orderBy` for list ordering and pagination support.
- Prefer explicit selects when only required fields are needed.

Example:

```ts
const collection = await prisma.collection.findUnique({
  where: { id },
  include: {
    snippets: {
      include: { snippet: true },
      orderBy: { position: "asc" },
    },
  },
});
```

## 6. Form and client interaction patterns

Client-side form logic currently uses `react-hook-form` with a Zod resolver.

Common pattern:

```tsx
const form = useForm<CollectionFormInput, unknown, CollectionFormValues>({
  resolver: zodResolver(collectionFormSchema),
  defaultValues: {
    title: collection?.title ?? "",
  },
});
```

For interactive behavior:

- Put browser-only logic in client components.
- Use a small, focused client component for filtering, sort controls, or confirmation actions.
- Prefer simple mutation calls to server actions rather than custom API routes.

## 7. Component naming and CSS modules

Component names use PascalCase and match the file name.

Examples:

- `SnippetCard`
- `CollectionForm`
- `SearchInput`

CSS Module class names use camelCase for component structure and kebab-case for variants or stateful classes.

Examples:

```css
.hero {
}

.mainHeading {
}

.size-sm {
}

.is-active {
}
```

Use the same convention consistently across the codebase.

## 8. Shared component layers

The project keeps shared UI in a small number of global directories.

- `src/components/primitives/` — low-level structural building blocks
- `src/components/ui/` — reusable form and input controls
- `src/components/common/` — shared UI patterns used across pages
- `src/components/Header/` and `src/components/Footer/` — app shell components
- `src/components/icon/` — reusable icon set

Feature-specific components should remain in the relevant feature folder, such as:

```text
src/app/snippets/_components/
src/app/collections/_components/
```

Only move something into a shared global directory when it is genuinely reusable and not tightly coupled to one feature.

## 9. Search, filters, and list state

For list pages, the app typically uses query parameters rather than local-only state for filter/search navigation.

Current patterns include:

- search terms in URL query strings
- filter parameters in the page query state
- sort controls tied to URL update logic
- pagination state derived from search parameters

This keeps state shareable, refresh-safe, and easier to reason about.

## 10. Practical rules for new work

When adding a new feature or component, follow these rules:

1. Keep route logic and model-specific code close to the feature.
2. Use server actions for writes and data mutation.
3. Validate input with Zod before database writes.
4. Use Prisma directly inside server code; do not create an extra ad hoc data layer.
5. Keep shared UI generic and app-agnostic.
6. Prefer composition over large monolithic components.
7. Match the existing naming and folder conventions exactly.

## Summary

The current codebase favors a simple, predictable structure:

- App Router + route-local feature folders
- Server actions for mutation
- Prisma for persistence
- Zod for validation
- Feature-specific components near the route
- Shared components only when truly reusable

This keeps the project maintainable while allowing features to grow incrementally.
