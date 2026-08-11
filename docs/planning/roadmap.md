---

## Suggested `docs/roadmap.md`

```md
# Roadmap

This roadmap describes the planned direction for Dev Vault.

## Current Phase

The project is currently in an early foundation phase.

Implemented or partially implemented foundations include:

- Next.js App Router setup
- Root layout and metadata
- Global styles and CSS tokens
- Basic home page structure
- Reusable icon components
- Basic primitive component structure
- Navigation configuration
- Prisma schema
- Snippet validation schema

## Near-Term Goals

### Snippet Management

- Create snippet form
- Edit existing snippets
- Delete snippets
- Display snippet detail pages
- Show recent snippets on the home page

### Browsing and Organization

- List all snippets
- Filter snippets by language
- Filter snippets by framework
- Filter snippets by category
- Filter favorite snippets
- Sort by priority or update date

### UI Foundation

- Add reusable primitive components
- Add layout components such as header, footer, sidebar, and main layout
- Improve responsive behavior
- Expand design tokens and utility classes

## Mid-Term Goals

### Search

- Add keyword search
- Search across title, description, code, memo, tags, and category
- Add search result highlighting

### Tag and Category Enhancements

- Normalize tags into a dedicated model
- Add category management
- Support nested or grouped categories

### User Experience

- Add empty states
- Add loading states
- Add confirmation dialogs
- Add keyboard-friendly interactions
- Add better mobile navigation

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
```
