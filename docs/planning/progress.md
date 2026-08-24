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
- [x] Framework
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
- [x] Validate query parameter behavior
- [x] Validate empty-result behavior
- [x] Validate multiple filter conditions

## Tags

- [x] Store tags as serialized values
- [x] Search by a single tag
- [x] Confirm free-text search limitations
- [x] Design Tag filtering
- [x] Evaluate `Any` / `All` matching
- [x] Evaluate exact Tag matching
- [x] Evaluate whether tag normalization is necessary

> Tag normalization is deferred until actual filtering requirements
> demonstrate that the current serialized storage is insufficient.

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
- [x] Validate combined control behavior

## Collection Planning

### Purpose

- [x] Define Collection as a manually curated group of Snippets
- [x] Select existing Snippets from Search / Filter results
- [x] Allow adding new Snippets from Collection workflow
- [x] Reuse existing Snippet data instead of duplicating it

### Collection Metadata

- [x] Define `title`
- [x] Define `description`
- [x] Define `category`
- [x] Define `language`
- [x] Define `frameworks`
- [x] Define `favorite`
- [x] Define `priority`
- [x] Define `interest`
- [x] Define `practicality`

### Metadata Rules

- Category represents the purpose or genre of the Collection.
- Category is not intended to represent technical areas such as Frontend or Backend.
- Language represents the main language of the Collection.
- Frameworks represent libraries and frameworks used by the Collection.
- Multiple frameworks are allowed.
- Frameworks are metadata for display and are not currently used as search criteria.
- `priority` uses the existing Snippet priority values.
- `interest` uses three levels:
  - `curious`
  - `interested`
  - `excited`
- `practicality` uses three levels:
  - `optional`
  - `useful`
  - `essential`

### Snippet References

- [x] Reuse existing Snippets
- [x] Avoid duplicating complete Snippet data in Collection
- [x] Define Collection-specific `filename`
- [x] Define Collection-specific `directory`
- [x] Define `snippetId` as the reference to an existing Snippet
- [ ] Define the final JSON structure for `Collection.snippets`

#### Collection Snippet Reference

```ts
type CollectionSnippetReference = {
  snippetId: string;
  filename: string;
  directory: string;
};
```

> Snippet information such as title, description, language, framework,
> tags, code, and updatedAt should continue to come from the existing
> Snippet data rather than being duplicated inside the Collection.

### Snippet Lifecycle

- [x] Define removing a Snippet from a Collection separately from deleting a Snippet
- [x] Keep the original Snippet when removed from a Collection
- [x] Reflect Snippet updates in Collections that reference the Snippet
- [ ] Define automatic cleanup when a referenced Snippet is deleted
- [ ] Decide whether Collection references should be stored as JSON or a dedicated relation

### Collection UI

- [ ] Define Collection list page
- [ ] Define Collection detail page
- [ ] Define Collection form
- [ ] Define Collection Snippet card
- [ ] Define manual Snippet selection UI
- [ ] Add "New Snippet" action from Collection workflow
- [ ] Define Snippet removal UI
- [ ] Define filename input
- [ ] Define directory input
- [ ] Define Interest UI
- [ ] Define Practicality UI

### Collection CRUD

- [ ] Create Collection
- [ ] Read Collection
- [ ] Update Collection
- [ ] Delete Collection

### Collection Data Model

- [ ] Define Prisma Collection model
- [ ] Define `Collection.snippets`
- [ ] Decide JSON vs relational model
- [ ] Define Collection → Snippet relationship
- [ ] Define delete behavior for referenced Snippets
- [ ] Define update behavior for referenced Snippets

### Collection Snippet References

```ts
type CollectionSnippetReference = {
  snippetId: string;
  filename?: string;
  directory?: string;
};
```

- Collection stores references to existing Snippets.
- Snippet data is not duplicated in Collection.
- filename and directory describe the intended usage of the Snippet within the Collection.
- Both filename and directory are optional.
- Snippet information is retrieved from the existing Snippet record.
- The Collection Snippet card provides:
  - Code preview / copy interaction
  - Filename / directory information when available
  - Link to the original Snippet page

## Current Phase

Snippet CRUD, Search, Filtering, Sorting, and Pagination are complete.

The current phase focuses on defining the Collection concept and
data model before implementation.

### Next Steps

1. Define the Prisma Collection model.
2. Define Collection CRUD requirements.
3. Design the Collection UI and manual Snippet selection workflow.
