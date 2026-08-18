# Roadmap

This roadmap describes the planned direction for Dev Vault.

## Current Phase

The project is currently focused on improving snippet browsing, organization, and user experience.

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
- Search across title, description, language, tags, and code
- Language filtering
- Priority filtering
- Favorite filtering
- Favorite toggle and database persistence
- Multiple tag input and display

## Near-Term Goals

### Browsing and Organization

- Filter snippets by category
- Sort snippets by priority
- Sort snippets by update date
- Support newest and oldest sorting
- Improve combined search, filtering, and sorting

### Snippet Features

- Improve favorite management
- Expand tag management
- Improve snippet organization
- Improve category management

### User Experience

- Improve loading states
- Add keyboard-friendly interactions
- Improve responsive behavior
- Improve search, filtering, sorting, and pagination UX
- Complete UI/UX refinement

## Mid-Term Goals

### Tag and Category Enhancements

- Normalize tags into a dedicated model
- Add category management
- Support nested or grouped categories

### Search

- Expand search across memo and additional snippet metadata
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

## Snippet Management

### Completed

- CRUD
- Search
- Pagination
- Language filter
- Priority filter
- Favorite filter
- Favorite toggle
- Multiple tag input
- Multiple tag display

### In Progress

- UI/UX refinement

### Planned

- Category filter
- Sorting
  - Newest
  - Oldest
  - Priority
  - Updated
- Improved combined search, filtering, sorting, and pagination
- Expanded tag and category management
