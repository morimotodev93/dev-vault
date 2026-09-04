# Roadmap

This roadmap reflects the current state of Dev Vault as an implementation-focused project rather than a purely conceptual product plan.

## Current Phase

The core snippet and collection workflows are implemented and stable.
Both workflows support CRUD operations, search, filtering, sorting, and pagination where applicable.

The project is now entering a completion and refinement phase.
The immediate focus is on finishing the top page, reviewing the application as a whole, and addressing practical UX issues discovered through actual usage.

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
- Collection search
- Collection filtering
- Collection sorting
- Collection pagination
- Combined search, filter, sort, and pagination behavior
- Responsive sidebar controls for collection browsing
- Direct New Snippet shortcut from the collection workflow

### Documentation

- Project overview and architecture documentation
- Setup and Windows-specific guidance
- Usage guides for snippets and collections
- Deployment and troubleshooting notes
- API and database references
- Planning docs aligned with the current implementation

## Near-Term Focus

### Application Completion

- Finish and refine the top page
- Review the complete application flow from a user perspective
- Check consistency across snippets, collections, and shared UI
- Fix practical UX issues discovered through actual usage
- Apply final responsive and accessibility polish where needed

### Component and Utility Refinement

- Evaluate existing utilities and primitives through real page implementation
- Add or adjust utilities only when practical usage reveals a clear need
- Avoid speculative abstraction and unnecessary component expansion

### Product Polish

- Tighten mobile and responsive usability where needed
- Improve empty-state, confirmation, and helper text clarity
- Review collection naming and path semantics for long-term consistency
- Review navigation and information hierarchy across the application
- Address edge-case UX issues discovered during final application review

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

Prioritize completing and using the application over expanding the feature set indefinitely.
Let real usage drive improvements to utilities, components, and UX rather than designing abstractions speculatively.

The current emphasis is on a stable snippet system, a useful collection workflow, a polished top page, and documentation that reflects the actual implementation.
