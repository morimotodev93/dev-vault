# Architecture Overview

This project is a lightweight knowledge-management application for storing and organizing development snippets, notes, and reusable code examples. The current implementation is a Next.js app with Prisma-based persistence and a simple folder structure designed for future expansion.

## 1. Goals

- Provide a clean interface for saving and browsing code snippets
- Keep the architecture simple and easy to extend
- Support future multilingual and global usage
- Separate business logic, UI, and data access clearly

## 2. Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma ORM
- SQLite for local development
- Zod for schema validation
- ESLint and Prettier for code quality

## 3. Project Structure

```text
src/
├─ app/              # App Router pages, layouts, and global styles
├─ components/       # Reusable UI and layout components
├─ features/         # Feature-specific business logic
├─ lib/              # Shared utilities and helpers
├─ types/            # TypeScript type definitions
└─ styles/           # Global and component-specific styles

prisma/
├─ schema.prisma     # Database schema definition
└─ migrations/       # Database migration history
```

## 4. Data Model

The core data entity is the Snippet model, which stores:

- title
- description
- language
- framework
- category
- tags
- favorite status
- priority
- code content
- memo
- creation and update timestamps

This structure allows the app to grow from a simple snippet collection into a more advanced knowledge base.

## 5. Runtime Flow

1. A user opens the application in the browser.
2. The Next.js app renders the relevant page from the App Router.
3. Data is fetched or updated through Prisma.
4. The UI displays the content using reusable components.
5. Validation and formatting are handled before data is persisted.

## 6. Internationalization and Global Readiness

Although the current UI is minimal, the architecture is designed to support global usage in the future.

Recommended direction:

- Use locale-based routing such as /en and /ja
- Separate user-facing text from business logic
- Prepare content structures so they can be translated without changing the data model
- Use locale-aware formatting for dates, numbers, and time zones
- Keep the codebase language-agnostic where possible, especially for content and metadata

## 7. Extensibility

The current structure is intentionally simple, but it can be extended with:

- user authentication
- multi-user collaboration
- search and filtering
- tagging and categorization enhancements
- cloud database support
- multilingual UI and content translation

## 8. Deployment Considerations

For development, SQLite is sufficient. For production, the system can be migrated to a more scalable database such as PostgreSQL while keeping the Prisma layer unchanged.

The app is compatible with standard Node.js hosting environments and can be deployed on platforms such as Vercel or similar providers.
