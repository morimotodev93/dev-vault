# Snippet Usage

This page covers how snippets work in the app as it exists today.

## 1. Open the snippet list

Visit `/snippets` to open the main snippet index.

The page includes:

- a search box
- a filter panel
- a sort selector
- pagination controls
- a `New Snippet` action

The list view renders snippet cards from the current Prisma query, and it resets to page 1 when the search or filter state changes.

## 2. Create a snippet

1. Open `/snippets`.
2. Click `New Snippet`.
3. Fill in the form fields.
4. Add or remove tags as needed.
5. Save the snippet.

The app stores the main snippet details such as title, description, language, framework, tags, code, memo, and favorite state.

## 3. Read a snippet

1. Select a snippet card from the list.
2. Open the detail page for that record.

The detail page shows:

- title
- description
- language and framework badges
- tag list
- code block
- favorite toggle
- edit and delete actions
- a shortcut back to the snippet list

## 4. Edit and delete

From the snippet detail page, you can:

- click `Edit` to update the snippet
- click `Delete` to remove it
- toggle the favorite state directly from the page

The current implementation uses server actions backed by Prisma rather than a standalone HTTP API.

## 5. Search, filter, and sort

The snippet page supports:

- query search
- language filter
- framework filter
- priority filter
- favorite filter
- tag filtering
- tag mode (`and` / `or`)
- sort selection

Examples:

- `/snippets?query=nextjs`
- `/snippets?language=typescript`
- `/snippets?favorite=true`
- `/snippets?tags=react,next&tagsMode=and`

When the URL parameters are normalized, the app redirects to the canonical query string so the filter state stays consistent.

## 6. Favorite behavior

Favorites are saved to the database and can be toggled from either the snippet card or the detail page.

This is useful when you want to:

- highlight important snippets
- filter to only favorite items
- build a shortlist of useful references

## 7. Tag behavior

Each snippet can have multiple tags, although the stored value is still a serialized string in Prisma.

In the UI:

- tags are entered as a list
- each tag is displayed individually
- duplicate tags can be prevented by the form logic
- removing a tag updates the snippet immediately

## 8. Pagination

The list view paginates when there are more snippets than the page size.

Pagination respects the current search and filter state, and changing those values resets the page to the first valid page.

## 9. Typical workflow

A common usage flow is:

1. Search or filter the list.
2. Open a matching snippet.
3. Review the code and notes.
4. Edit it if needed.
5. Use favorites and tags to build a personal knowledge base.

This reflects the current intended usage of the app rather than a hypothetical API contract.
