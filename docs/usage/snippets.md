# Snippets

## Create a Snippet

1. Open `/snippets`.
2. Select `New Snippet`.
3. Enter the snippet information.
4. Add tags if needed.
5. Select `Save Snippet`.

A snippet can include multiple tags.

## Read Snippets

1. Open `/snippets`.
2. Select a snippet card.
3. View the snippet details.

From the snippet detail page, you can perform other CRUD operations.

## Update a Snippet

1. Select a snippet card.
2. Select `Update`.
3. Edit the snippet information.
4. Select `Update Snippet`.

## Delete a Snippet

1. Select a snippet card.
2. Select `Delete`.
3. The snippet is deleted immediately.
4. Check the toast notification for the result.

## Search Snippets

Snippets can be searched by:

- Title
- Description
- Language
- Tags
- Code

### Search

1. Select the search field.
2. Enter a keyword.
3. Press `Enter`.
4. View the search results.

Example:

`/snippets?query=typescript`

To clear the search, select the `Clear` button.

## Filter Snippets

Available filters:

- Language
- Priority
- Favorite
- Framework
- Tags

Filters can be combined with search and other filters.

Examples:

`/snippets?language=typescript`

`/snippets?priority=5`

`/snippets?favorite=true`

Changing a filter resets the current page to the first page.

## Favorite

Favorites can be toggled directly from a snippet card.

1. Select the Favorite button on a snippet card.
2. The favorite state is updated.
3. The Favorite filter can be used to display only favorite snippets.

Favorite state is persisted in the database.

## Tags

Multiple tags can be assigned to a snippet.

1. Enter a tag in the Tags field.
2. Select `Add`.
3. Repeat to add additional tags.
4. Select the remove control to remove a tag.

Tags are displayed individually on snippet cards.

## Pagination

Pagination is displayed when the number of snippets exceeds the page size.

1. Check the pagination controls below the snippet list.
2. Select a page number.
3. Navigate to the selected page.

Use the `Previous` and `Next` buttons to move between pages.

Pagination works together with search and filters. Changing a search query or filter resets the current page.
