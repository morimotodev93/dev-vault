# Changelog

All notable changes to Dev Vault are documented in this file.

The changelog records feature-level and project-level changes, and keeps the project history aligned with the current implementation rather than a purely conceptual version of the app.

## 0.1.0 — Foundation

### Added

- Initial Next.js App Router project structure.
- Root application layout and metadata.
- Basic home page rendering.
- Hero component for the home page.
- Global CSS entry point.
- CSS reset, design tokens, layout utilities, and utility styles.
- Font configuration for Latin and CJK support.
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
- Navigation across snippet list, detail, create, and edit views.

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

## 0.4.0 — Snippet Organization

### Added

- Favorite toggle with database persistence.
- Multiple tag input and display.
- Language, priority, favorite, framework, and tag filtering.
- Newest, oldest, priority, and updated sorting.
- Combined search, filtering, sorting, and pagination.
- Responsive layout, sidebar controls, code copy interaction, and UI refinements.

### Changed

- Search and structured filtering responsibilities are now defined separately.
- Tag matching behavior is documented and kept scoped to the current implementation.
- Snippet category was removed from the current scope.
- Tag normalization remains deferred until the serialized storage proves insufficient.

## 0.5.0 — Collection Workflow

### Added

- Collection list page.
- Collection detail page.
- Collection creation flow.
- Collection update flow.
- Collection deletion flow.
- Collection card and collection metadata UI.
- Manual snippet selection inside a collection.
- Collection relationship model using `CollectionSnippet`.
- `position` metadata for ordering snippets inside a collection.
- `path` metadata for collection-specific context.
- Collection snippet removal and relationship cleanup.

### Changed

- The app now treats a collection as a curated grouping of existing snippets rather than a duplicated snippet store.
- Snippet content stays canonical in the `Snippet` model, while collection membership is tracked in `CollectionSnippet`.
- Collection UI and data rules are aligned with the actual Prisma schema and app behavior.

## 0.5.1 — Collection Browsing

### Added

- Collection search
- Collection filtering
- Collection sorting
- Collection pagination
- Combined search, filtering, sorting, and pagination
- Responsive sidebar controls for collection browsing
- Direct New Snippet shortcut from collection detail

### Changed

- Collection browsing now supports the same practical navigation patterns established for Snippets.
- Collection workflow is now considered feature-complete for the current project scope.

## 0.6.0 — Documentation and Structure Alignment

### Added

- Documentation index and navigation updates.
- Usage guides for snippets and collections.
- Setup guide for local development and Windows-specific tooling.
- Deployment and troubleshooting sections.
- API and database reference documentation.
- Project status and planning docs aligned with the actual implementation.

### Changed

- Docs were rewritten to match the current Next.js, Prisma, and App Router architecture.
- README files and documentation sections were normalized for consistency.
- Project documentation now reflects the implemented snippet and collection workflows rather than older conceptual plans.

## Current Status

The app currently includes a working snippet workflow and a collection workflow that follows the actual persisted data model.

## 0.7.0 — Home and UX Refinement

### Added

- Quick statistics on the home page.
- Recent snippets section on the home page.
- Recent collections section on the home page.

### Changed

- Improved the home page as an entry point for snippets and collections.
- Mobile navigation now closes automatically after navigation.

### Implemented

- Create snippets
- Read snippets
- Update snippets
- Delete snippets
- Search snippets
- Filter snippets
- Sort snippets
- Paginate snippets
- Favorite snippets
- Manage tags
- Create collections
- Read collections
- Update collections
- Delete collections
- Add snippets to collections
- Remove snippets from collections
- Maintain collection snippet ordering by position
- Maintain collection-related metadata
- Update collection favorites
- Update collection priority, interest, and practicality ratings
- Search collections
- Filter collections
- Sort collections
- Paginate collection results
- Create new snippets directly from collection detail
- Prisma-backed persistence with SQLite for local development
- Home page with project introduction, statistics, and recent snippets and collections
- Project introduction page
- Responsive mobile navigation with automatic menu closing after navigation

### Documentation status

The documentation set is now aligned with the current application structure, including:

- project overview
- architecture and structure
- setup instructions
- usage guides
- deployment and troubleshooting
- API and database references
- roadmap and changelog
- current development progress

### Remaining focus

The project is now in a refinement and completion phase.

The remaining work focuses on:

- final UX refinement
- accessibility and edge-case checks
- responsive behavior verification
- project structure cleanup
- final documentation review
- identifying reusable UI improvements based on actual usage

Large-scale feature expansion and speculative architectural changes are not currently a priority.
