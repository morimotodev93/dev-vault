# Collection Usage

This page explains how collections work in the app as it exists today.

## 1. Open the collection list

Visit `/collections` to open the main collection index.

The current page includes:

- collection search
- collection cards
- filtering
- sorting
- pagination
- a `New Collection` action
- a sidebar containing search, filter, and sort controls

This is the main entry point for collection management.

## 2. Create a collection

1. Open `/collections`.
2. Click `New Collection`.
3. Enter the collection metadata.
4. Save the collection.

A collection stores its own metadata, including:

- title
- description
- category
- language
- frameworks
- favorite state
- priority
- interest
- practicality

These fields are separate from the actual snippet content.

## 3. View a collection

Open a collection from the list to go to the detail screen.

The detail page currently shows:

- collection metadata
- linked snippets
- snippet cards inside the collection
- collection actions

If the collection has no snippets yet, the app shows a selector flow so you can add existing snippets to it.

## 4. Manage snippets in a collection

The collection detail UI lets you manage the snippets included in the collection.

You can:

- select existing snippets to add
- remove snippets from the collection
- change their order
- optionally provide collection-specific `path` metadata

The collection does not duplicate the snippet itself. It stores the relationship between the collection and the existing snippet.

## 5. Collection relationship model

The current data model keeps the content canonical in `Snippet` and the collection membership logic in `CollectionSnippet`.

A few important points:

- the source snippet remains the single source of truth
- `CollectionSnippet.position` controls the order inside the collection
- `CollectionSnippet.path` is optional metadata for the collection context
- the relationship is unique for each `(collectionId, snippetId)` pair

This means updates to a snippet still flow through the snippet record, while the collection keeps its own organization metadata.

## 6. Search, filter, sort, and pagination

The collection list supports:

- query search
- category filtering
- language filtering
- priority filtering
- interest filtering
- practicality filtering
- favorite filtering
- sorting by supported collection fields
- pagination
- combined search, filter, sort, and pagination

The sidebar provides the search, filter, and sort controls used for collection browsing.

Changing the search or filter state resets pagination to the first page.

If the requested page is out of range, the app redirects back to the start of the collection list.

## 7. Edit and delete a collection

From the collection detail area, the app exposes actions to update or remove the collection.

These operations follow the project's server-action pattern and are backed by Prisma.

Removing a collection does not require deleting the snippets contained in it. The collection relationship is removed while the original snippet records remain available.

## 8. Create a new snippet from a collection

The collection detail page provides a shortcut to create a new snippet.

Use the `New Snippet` action when a snippet needed for the current collection does not yet exist.

The shortcut opens the normal snippet creation flow. The new snippet is created through the standard snippet workflow rather than being created as a collection-specific record.

## 9. Typical workflow

A common usage pattern is:

1. Create a collection around a clear goal or theme.
2. Add relevant snippets from the existing library.
3. Review the collection detail page.
4. Adjust ordering or metadata as needed.
5. Keep the original snippet data in place while organizing it by collection.

This matches the current app behavior and is the right mental model for working with collections in Dev Vault.
