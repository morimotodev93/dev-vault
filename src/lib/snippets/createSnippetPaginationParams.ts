export interface SnippetSearchParams {
  query?: string;
  language?: string;
  framework?: string;
  priority?: string;
  tags?: string;
  tagsMode?: string;
  favorite?: string;
  sort?: string;
}

export function createSnippetPaginationParams(params: SnippetSearchParams) {
  const searchParams = new URLSearchParams();

  if (params.query) {
    searchParams.set("query", params.query);
  }

  if (params.language) {
    searchParams.set("language", params.language);
  }

  if (params.framework) {
    searchParams.set("framework", params.framework);
  }

  if (params.priority) {
    searchParams.set("priority", params.priority);
  }

  if (params.tags) {
    searchParams.set("tags", params.tags);

    if (params.tagsMode) {
      searchParams.set("tagsMode", params.tagsMode);
    }
  }

  if (params.favorite) {
    searchParams.set("favorite", params.favorite);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  return searchParams;
}
