# Collections

## Overview

Collections are curated groups of existing snippets. The current model treats a Collection as a top-level record and keeps each snippet relationship in a dedicated join table.

This keeps the canonical snippet content in `Snippet` while storing collection-specific metadata and ordering in `CollectionSnippet`.

## Current Model

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

## Design Principles

- Keep the source of truth for snippet content in `Snippet`.
- Store collection membership and ordering in `CollectionSnippet`.
- Treat `CollectionSnippet.path` as collection-specific metadata, not as a duplicate of snippet content.
- Preserve the original snippet when it is removed from a collection.
- Use cascade delete rules so the relationship is cleaned up with the owning collection or snippet.

## Metadata Semantics

A Collection is not just a folder. It carries its own metadata:

- `title`: collection title
- `description`: human-readable summary
- `category`: purpose or genre of the collection
- `language`: primary language of the collection
- `frameworks`: JSON array of framework names for display and filtering metadata
- `favorite`: personal bookmark state
- `priority`: collection priority
- `interest`: interest level
- `practicality`: practical value level

`frameworks` are metadata for display and are not currently treated as first-class search criteria.

## Snippet References

A snippet in a collection should be referenced through `CollectionSnippet`, not copied into the collection record.

The relationship stores:

- `snippetId`: a reference to the existing snippet
- `path`: optional collection-specific path or filename context
- `position`: ordering inside the collection

This allows snippet updates to flow through the canonical snippet model while the collection keeps its own arrangement and placement metadata.

## Recommended Usage

1. Create a collection with a clear title and category.
2. Add snippets from existing snippet search or selection flows.
3. Use `position` to define the ordering in the collection UI.
4. Keep `path` for collection-specific naming or directory hints when needed.
5. Avoid duplicating title, code, tags, or memo into the collection record.

## Risks and Constraints

- Tag semantics are still serialized on `Snippet`, so collection-level tag filtering should be treated carefully.
- `language` and `framework` are not fully normalized across all historical data yet.
- Collection metadata should remain distinct from snippet metadata unless there is a strong reuse case.
- Saved collection views should keep explicit, validated fields instead of opaque query strings.

## Pending Work

The implementation focus is still on:

- Collection list page
- Collection detail page
- Collection form
- Manual snippet selection UI
- Collection snippet card rendering
- CRUD flows for create, read, update, and delete

Once the Collection UI is in place, the next step is to validate the relationship model against real usage and refine metadata defaults if needed.
