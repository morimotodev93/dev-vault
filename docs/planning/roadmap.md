# Roadmap

This roadmap describes the planned direction for Dev Vault.

## Current Phase

Snippet CRUD, search, filtering, sorting, and pagination are complete.
The Collection concept, metadata, and lifecycle rules are defined.
The Collection data model and migrations are complete.
The current phase focuses on implementing the Collection UI and CRUD flows.

## Completed Foundations

- Next.js App Router setup
- Root layout and metadata
- Global styles, CSS tokens, and reusable UI primitives
- Prisma schema and database integration
- Zod validation
- Snippet CRUD and detail pages
- Empty and loading states
- Search across title, description, language, tags, and code
- Pagination with search and query parameter handling
- Language, priority, favorite, framework, and tag filtering
- Newest, oldest, priority, and updated sorting
- Combined search, filtering, sorting, and pagination
- Favorite toggle and database persistence
- Multiple tag input and display
- Responsive layout and final UI/UX refinement
- Snippet usage, architecture, project structure, components, and database documentation
- Collection purpose, metadata, Snippet references, and lifecycle rules
- Collection Prisma model and relational `CollectionSnippet` join model

## Near-Term Goals

### Collection Definition

- Collection metadata and lifecycle rules are defined.
- `Collection.snippets` uses the relational `CollectionSnippet` join model.
- Collection to Snippet relationship and delete behavior are defined.
- Collection CRUD requirements are defined.

### Collection UI

- Define the Collection list and detail pages
- Define the Collection form
- Design manual Snippet selection from Search / Filter results
- Add a `New Snippet` action to the Collection workflow
- Define Collection Snippet cards and removal UI
- Add a collection-specific path input
- Add Interest and Practicality controls

### Collection Implementation

- Create Collection
- Read Collection
- Update Collection
- Delete Collection
- Preserve existing Snippets when they are removed from a Collection
- Reflect Snippet updates in Collections that reference them
- Define automatic cleanup when a referenced Snippet is deleted

## Deferred Decisions

- Tag normalization remains deferred until the current serialized storage proves insufficient.
- Snippet category is outside the current scope and should not be reintroduced without new requirements.
- Collection frameworks are display metadata and are not currently search criteria.

## Mid-Term Goals

### Search and Organization

- Expand search across memo and additional Snippet metadata
- Add search result highlighting
- Revisit tag normalization if Collection requirements require it

### User Experience

- Add confirmation dialogs where appropriate
- Improve mobile navigation
- Improve accessibility

## Long-Term Goals

### Authentication

- Add user accounts
- Associate snippets and collections with users
- Support private and shared snippets

### Collaboration

- Share snippets and collections with other users
- Add team or workspace support
- Add role-based permissions

### Internationalization

- Add locale-based routing
- Separate translation files from business logic
- Support English and Japanese initially
- Use locale-aware date, number, and time formatting

### Production Readiness

- Migrate from SQLite to a production-grade database
- Add observability and error monitoring
- Add database backups
- Add CI checks for linting, type checking, and builds

## Guiding Principle

The project should remain simple while making it easy to add features incrementally.
