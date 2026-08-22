# Development Progress

## Snippet Management

| Feature    | Status |
| ---------- | ------ |
| Create     | Done   |
| Read       | Done   |
| Update     | Done   |
| Delete     | Done   |
| Search     | Done   |
| Pagination | Done   |
| Favorite   | Done   |
| Tags       | Done   |
| Filtering  | Done   |
| Sorting    | Done   |

## Documentation

| Area              | Status |
| ----------------- | ------ |
| Architecture      | Done   |
| Project Structure | Done   |
| Components        | Done   |
| Database          | Done   |
| Snippet Usage     | Done   |

## Snippet Metadata

- [x] Language
- [x] Framework
- [x] Tags
- [x] Favorite
- [x] Priority
- [x] Category removed from Snippet

### Metadata Rules

- Language is optional.
- Framework is optional.
- At least one of Language or Framework is required.
- Language uses the shared language options.
- Framework is free-form.
- Tags remain user-defined labels.
- Category is outside the current Snippet scope.

## Search

- [x] Search by title
- [x] Search by language
- [x] Search by tags
- [x] Confirm single-tag search with current tag storage
- [x] Confirm free-text search remains separate from structured AND / OR conditions

### Search Direction

- [x] Keep free-text search separate from structured filtering
- [x] Define the responsibility of `SnippetSearch`
- [x] Define the responsibility of `SnippetFilter`

## Filter

- [x] Language
- [x] Priority
- [x] Favorite
- [ ] Framework
- [x] Tags
- [x] Define Tag matching behavior
- [x] Evaluate Tag `Any` / `All` conditions

> Category filtering was removed from the current scope.
> Category will not be reintroduced into Snippet unless future requirements justify it.

## Sort

- [x] Newest
- [x] Oldest
- [x] Priority
- [x] Updated

### Default Sort

- [x] Confirm `Newest` as the default collection and snippet browsing order
- [x] Define whether `Newest` refers to `createdAt` or another timestamp

## Combined Query

- [x] Combine Search and Filter
- [x] Combine Filter and Sort
- [x] Combine Search, Filter, Sort, and Pagination
- [ ] Validate query parameter behavior
- [ ] Validate empty-result behavior
- [ ] Validate multiple filter conditions

## Tags

- [x] Store tags as serialized values
- [x] Search by a single tag
- [x] Confirm free-text search limitations
- [x] Design Tag filtering
- [x] Evaluate `Any` / `All` matching
- [x] Evaluate exact Tag matching
- [ ] Evaluate whether tag normalization is necessary

> Tag normalization is deferred until actual filtering requirements
> demonstrate that the current serialized storage is insufficient.

## Collection Planning

- [ ] Define the purpose of Collection
- [ ] Define Collection as a saved Snippet view
- [ ] Define Collection criteria
- [ ] Decide which Snippet fields can be used as Collection criteria
- [ ] Define Collection sorting behavior
- [ ] Define Collection and Snippet responsibilities
- [ ] Evaluate whether Collection requires a dedicated database model

> Collection implementation is deferred until combined Search, Filtering,
> Sorting, and Pagination are stable.

## UI / UX

- [x] SnippetCard refinement
- [x] Tag display
- [x] Favorite button
- [x] Responsive layout
- [x] Sidebar controls
- [x] Code copy
- [x] Final UI/UX refinement
- [x] Refine filtering UI
- [x] Evaluate Tag filter UI
- [ ] Validate combined control behavior

## Current Phase

The Snippet CRUD workflow is complete.

The current phase focuses on stabilizing Snippet metadata, filtering,
and combined query behavior before introducing Collections.

### Next Steps

1. Evaluate Framework filtering.
2. Validate Search + Filter + Sort + Pagination.
3. Define Collection semantics.
4. Evaluate the Collection data model.
