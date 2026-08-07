# API and Data Access

Dev Vault does not currently expose a documented public HTTP API. The application is designed around Next.js App Router and Prisma-based server-side data access.

## Current Status

The current codebase includes:

- Prisma schema and generated client configuration
- Shared Prisma client setup in `src/lib/prisma.ts`
- Zod validation schema for snippets in `src/types/snippets.ts`
- No dedicated API route contract yet

## Data Access Layer

Database access should be centralized through server-side modules. Prisma should not be used directly inside generic UI components.

Recommended future structure:

````text
src/features/snippets/
├─ actions/
├─ queries/
├─ schemas/
└─ types/

## Snippet Input Shape
The current form schema is defined with Zod.


`snippetFormSchema`

Fields include:

title

description

language

framework

category

tags

favorite

priority

code

memo

## Recommended Server Actions

Future snippet workflows may include server actions such as:

createSnippet

updateSnippet

deleteSnippet

toggleFavoriteSnippet

listSnippets

getSnippetById

## Validation Boundary

All user-submitted data should be validated before persistence.

Recommended flow:

Receive form input.

Validate with Zod.

Transform UI-specific values into database-compatible values.

Persist with Prisma.

Return a typed result to the caller.

## Error Handling

Future API or server action responses should use a consistent shape.

Example

```ts
type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };
````

## Future HTTP API

If a public or internal HTTP API is added later, it should document:

Endpoint path

HTTP method

Request body

Response body

Error responses

Authentication requirements
