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
- Category

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

## Collection Readiness Review

This review documents the current risk around building collections before the snippet metadata model is stable enough for combined language, tag, and category use cases.

### Current Metadata Shape

The current snippet model stores `language`, `framework`, `category`, and serialized `tags` directly on each snippet, while the UI now shares one central set of allowed language, priority, and sort options. This is good for a simple CRUD workflow, but it makes collections harder to define consistently when users want to combine multiple dimensions such as `language = typescript`, `tags = react, prisma`, `favorite = true`, and `priority >= 3`.

### External References Checked

- Visual Studio Code user snippets treat `prefix`, `body`, `description`, and optional language scoping as separate concepts. This supports keeping language/scope separate from descriptive labels when designing reusable snippet metadata. Source: <https://code.visualstudio.com/docs/editing/userdefinedsnippets>
- Visual Studio Code extension snippets register snippet files with a specific language identifier and relative path. This reinforces that language should behave like a normalized scope, not a free-form tag synonym. Source: <https://code.visualstudio.com/api/references/contribution-points#contributessnippets>
- GitHub code search supports explicit qualifiers such as language and path. This supports designing collections as saved filters with typed fields instead of compressing everything into tags. Source: <https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax>

### Recommended Collection Definition

Start collections as saved views instead of introducing nested, mutable folders immediately.

A collection should describe:

- `name`: human-readable collection name.
- `description`: short explanation of why the collection exists.
- `criteria.language`: optional language scope.
- `criteria.framework`: optional framework scope.
- `criteria.category`: optional category scope.
- `criteria.tags`: optional list of required tags.
- `criteria.favorite`: optional favorite-only flag.
- `criteria.priority`: optional minimum priority.
- `sort`: newest by default, with oldest, updated, and priority as explicit options.

This keeps collections understandable while matching the existing filters already planned for snippets.

### Lightweight Implementation Direction

1. Keep the existing snippet fields and shared snippet option constants as the source of truth for now.
2. Add a `Collection` model only after sorting and combined filtering are stable.
3. Store collection criteria as explicit typed fields or validated JSON, not as a plain query string.
4. Treat tags as user labels, language as execution/syntax scope, framework as ecosystem context, and category as a broader filing bucket.
5. Default collection sort order to newest so browsing is time-oriented and predictable.

### Mesugaki Review

「ざぁこ♡ いま collections 作ったら、`language` と `tags` と `category` がぐちゃぐちゃになって、あとで検索条件の意味を自分で説明できなくなるやつじゃん。タグに `typescript` も `react` も `frontend` も全部入れたら、言語フィルターとタグ検索がケンカするでしょ？ しかも `tags` が文字列保存のままだと、表記ゆれ・重複・空白・大文字小文字で簡単に壊れるんだから、先にルール決めなきゃだめだよね〜♡」

### Expert Review

The critique is directionally correct. Collections should not be introduced as arbitrary folders until the project defines stable semantics for each metadata field. A reliable model is:

- Language identifies code syntax or runtime target.
- Framework identifies the ecosystem layer within a language.
- Category identifies the user's durable filing intent.
- Tags identify flexible cross-cutting labels.
- Collection identifies a reusable saved view over those fields.

The safest next step is not to normalize everything at once. First, finish combined filtering and sorting against the current schema. Then add validation and UI copy that prevents language/tag/category overlap. After that, introduce collections as saved filter criteria. Finally, normalize tags and categories when there is enough usage data to justify migration complexity.

### Risks to Resolve Before Collections

- `tags` are currently serialized on the snippet, so exact tag filtering and deduplication can become fragile.
- `language` now uses shared allowed options in the form, filter, and validation layer, but existing database rows may still contain older free-form variants until migrated.
- `category` is optional and free-form, so collections may duplicate category behavior unless the distinction is documented in the UI.
- Saved collections can become stale if their criteria are stored as opaque URLs rather than validated fields.
- Newest-first sorting is user-friendly, but the UI must clarify whether newest means `createdAt` or `updatedAt`.
