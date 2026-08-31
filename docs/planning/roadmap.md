# Roadmap

This roadmap reflects the current state of Dev Vault as an implementation-focused project rather than a purely conceptual product plan.

## Current Phase

The core snippet workflow is complete, and the collection workflow is implemented and active.
The project is now in a refinement phase focused on the remaining collection experience details, usability polish, and incremental feature improvements.

## Completed

### Foundation

- Next.js App Router setup
- Prisma integration with SQLite for local development
- Shared client setup and database schema model
- Global styling, utility classes, and reusable primitives
- App layout and navigation structure
- Zod-based validation for snippet input flows

### Snippet Management

- Snippet create / read / update / delete flows
- Snippet detail view and edit workflow
- Search by title and metadata-driven query input
- Pagination and query parameter handling
- Favorite handling and persistence
- Tag input, display, and filtering
- Language, framework, priority, and favorite filtering
- Newest, oldest, priority, and updated sorting
- Combined search, filter, sort, and pagination behavior
- Responsive snippet browsing and supporting UI states

### Collection Workflow

- Collection create / read / update / delete flows
- Collection detail and list views
- Collection metadata fields for title, description, category, language, framework, priority, interest, and practicality
- `CollectionSnippet` join model with `path` and `position`
- Manual snippet selection into a collection
- Collection snippet removal with confirmation
- Collection metadata and list ordering logic
- Collection-specific card presentation and detail flow

### Documentation

- Project overview and architecture documentation
- Setup and Windows-specific guidance
- Usage guides for snippets and collections
- Deployment and troubleshooting notes
- API and database references
- Planning docs aligned with the current implementation

## Near-Term Focus

### Collection Experience Refinement

- Add a collection-specific path input for linked snippets
- Add a direct New Snippet shortcut from the collection workflow
- Refine ordering and contextual display within collection detail views
- Keep manual snippet selection and removal as the primary workflow

### Product Polish

- Tighten mobile and responsive usability where needed
- Improve empty-state, confirmation, and helper text clarity
- Review collection naming and path semantics for long-term consistency

## Deferred or Intentionally Scoped

- Tag normalization remains deferred until the current serialized tag storage clearly becomes limiting.
- Snippet category is intentionally outside the current scope.
- Framework metadata on collections remains display-oriented and is not currently used as a search dimension.

## Mid-Term Opportunities

### Search and Organization

- Expand metadata search where it adds real value
- Improve result hierarchy and readability
- Revisit tag normalization if requirements become more complex

### UX Improvements

- Add more explicit confirmation flows for destructive actions
- Improve task flow clarity around collection editing and snippet linking
- Continue refining accessible interactions and layout behavior

## Long-Term Direction

### Authentication and Ownership

- Add user accounts and per-user data ownership
- Support private and shared snippets and collections

### Collaboration

- Add sharing workflows and team-based organization
- Introduce permissions and workspace-level collaboration

### Production Readiness

- Move beyond SQLite for production workloads
- Add monitoring, logging, and deployment checks
- Add automated validation for linting, type checking, and build health

## Guiding Principle

Keep the project simple and maintainable while growing the feature set incrementally.
The current emphasis is on a stable snippet system, a useful collection workflow, and clear documentation that reflects what is actually implemented.
