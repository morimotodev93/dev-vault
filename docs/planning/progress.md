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
- [x] Define Collection-specific `path`
- [x] Define `snippetId` as the reference to an existing Snippet
- [x] Define the relational structure for `Collection.snippets`

#### Collection Snippet Reference

```ts
type CollectionSnippetReference = {
  id?: string;
  snippetId: string;
  path?: string;
  position: number;
};
```

> Snippet information such as title, description, language, framework,
> tags, code, and updatedAt continue to come from the existing Snippet
> record. The collection stores the relationship metadata in the
> `CollectionSnippet` join model instead of duplicating the Snippet data.

### Snippet Lifecycle

- [x] Define removing a Snippet from a Collection separately from deleting a Snippet
- [x] Keep the original Snippet when removed from a Collection
- [x] Reflect Snippet updates in Collections that reference the Snippet
- [x] Use a dedicated relational join model for Collection ⇄ Snippet references
- [x] Define `CollectionSnippet.path` for snippet-specific path metadata
- [x] Define `CollectionSnippet.position` for collection ordering
- [x] Set cascade delete behavior for CollectionSnippet relationships

### Collection UI

- [x] Define Collection list page
- [x] Define Collection detail page
- [x] Define Collection form
- [x] Define Collection card
- [x] Add Collection pagination
- [ ] Define Collection Snippet card
- [ ] Define manual Snippet selection UI
- [ ] Add "New Snippet" action from Collection workflow
- [ ] Define Snippet removal UI
- [ ] Define path input
- [ ] Define Interest UI
- [ ] Define Practicality UI

### Collection CRUD

- [x] Create Collection
- [x] Read Collection
- [x] Update Collection
- [x] Delete Collection

### Collection Data Model

- [x] Define Prisma Collection model
- [x] Define `Collection.snippets`
- [x] Choose the relational model
- [x] Define Collection → Snippet relationship
- [x] Define delete behavior for referenced Snippets
- [x] Define update behavior for referenced Snippets

### Current Prisma Model

```prisma
model Collection {
  id           String   @id @default(cuid())
  title        String
  description  String?
  category     String
  language     String?
  frameworks   Json
  favorite     Boolean  @default(false)
  priority     Int      @default(0)
  interest     Int
  practicality Int
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  snippets CollectionSnippet[]
}

model CollectionSnippet {
  id           String  @id @default(cuid())
  collectionId String
  snippetId    String
  path         String?
  position     Int

  collection Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)
  snippet    Snippet    @relation(fields: [snippetId], references: [id], onDelete: Cascade)

  @@unique([collectionId, snippetId])
}
```

### Collection Snippet References

```ts
type CollectionSnippetReference = {
  snippetId: string;
  path?: string;
  position: number;
};
```

- Collection stores references to existing Snippets.
- Snippet data is not duplicated in Collection.
- path describes the intended file location or naming context of the Snippet within the Collection.
- path is optional.
- Snippet information is retrieved from the existing Snippet record.
- The Collection Snippet card provides:
  - Code preview / copy interaction
  - Path information when available
  - Link to the original Snippet page

## Current Phase

Snippet CRUD, Search, Filtering, Sorting, and Pagination are complete.

The Collection concept and data model are defined. The current phase
focuses on implementing the Collection UI and CRUD flows.

### Next Steps

1. Implement the Collection Snippet card and manual Snippet selection workflow.
2. Add path input and Snippet removal from a Collection.
3. Add Collection search, filtering, and sorting when requirements are defined.
