# Roadmap

This roadmap describes the planned direction for Dev Vault.

## Current Phase

The project is currently focused on expanding the core snippet management experience.

Completed foundations include:

- Next.js App Router setup
- Root layout and metadata
- Global styles and CSS tokens
- Reusable UI primitives
- Prisma schema and database integration
- Zod validation
- Snippet CRUD
- Snippet detail pages
- Empty states
- Pagination
- Keyword search

## Near-Term Goals

### Browsing and Organization

- Filter snippets by language
- Filter snippets by framework
- Filter snippets by category
- Filter favorite snippets
- Sort by priority or update date

### Snippet Features

- Improve favorite management
- Expand tag management
- Support multiple tags
- Improve snippet organization

### User Experience

- Improve loading states
- Add keyboard-friendly interactions
- Improve responsive behavior
- Improve search and pagination UX

## Mid-Term Goals

### Tag and Category Enhancements

- Normalize tags into a dedicated model
- Add category management
- Support nested or grouped categories

### Search

- Search across title, description, code, memo, tags, and category
- Add search result highlighting

### User Experience

- Add confirmation dialogs where appropriate
- Improve mobile navigation
- Improve accessibility

## Long-Term Goals

### Authentication

- Add user accounts
- Associate snippets with users
- Support private and shared snippets

### Collaboration

- Share snippets with other users
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
