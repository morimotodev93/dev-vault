# Changelog

All notable changes to Dev Vault are documented in this file.

The changelog records feature-level and project-level changes.
Minor implementation details are intentionally omitted when they are already covered by Git history.

## 0.1.0 — Foundation

### Added

- Initial Next.js App Router project structure.
- Root application layout and metadata.
- Basic home page rendering.
- Hero component for the home page.
- Global CSS entry point.
- CSS reset, design tokens, layout utilities, and utility styles.
- Font configuration including Latin and CJK font support.
- Navigation configuration for header and hamburger menu use cases.
- Icon components for navigation, utility, and circular icon groups.
- Primitive component structure including:
  - Button
  - Container
  - Grid
  - Heading
  - Link
  - Spacer
  - Stack
  - Surface
  - Text
- Basic UI components including:
  - Input
  - Select
  - Textarea
- Shared common components including:
  - EmptyState
  - Loading
  - Pagination
  - SearchInput
  - Tag
- Prisma schema with the initial `Snippet` model.
- Initial Prisma migration.
- Shared Prisma client setup.
- Zod schema for snippet form validation.
- Initial project documentation structure.

## 0.2.0 — Snippet CRUD

### Added

- `/snippets` route for displaying snippets.
- `/snippets/new` route for creating snippets.
- `/snippets/[id]` route for viewing snippet details.
- `/snippets/[id]/edit` route for editing snippets.
- Snippet creation flow.
- Snippet detail view.
- Snippet update flow.
- Snippet deletion flow.
- Reusable `SnippetForm` component.
- Empty state for an empty snippet list.
- Navigation between snippet list, detail, create, and edit views.

### Changed

- Expanded the home page to display recent snippets.
- Improved snippet-related UI using reusable primitives and common components.

## 0.3.0 — Snippet Browsing

### Added

- Pagination for the snippet list.
- Page-based snippet loading using Prisma `skip` and `take`.
- Page query parameters using `?page=`.
- Previous and next page navigation.
- Pagination state preservation during searches.
- Validation and normalization of invalid page parameters.
- Search by snippet title using the `query` URL parameter.
- Search form with Enter-to-search interaction.
- Search result handling for empty and unmatched queries.
- Search clear functionality.
- Search and pagination integration.

### Changed

- Snippet lists are ordered by creation date.
- Snippet queries now retrieve only the records required for the current page.
- Search and pagination are handled through URL search parameters.

## 0.4.0 — Documentation

### Added

- Snippet usage documentation.
- Database reference documentation.
- Project progress documentation.
- Updated project roadmap.
- Updated changelog structure.
- Documentation navigation through `docs/README.md`.

### Changed

- Updated project documentation to reflect the current application architecture.
- Documented the Snippet data model and database responsibilities.
- Documented Snippet CRUD, search, and pagination workflows.

## Current Status

The core Snippet management workflow is implemented.

Current functionality includes:

- Create snippets
- Read snippets
- Update snippets
- Delete snippets
- Search snippets
- Paginate snippets
- Empty states
- Loading states
- Reusable UI primitives
- Form validation
- Prisma-based persistence

Future development will focus on improving snippet organization and user experience, including favorites, tags, filtering, and sorting.
