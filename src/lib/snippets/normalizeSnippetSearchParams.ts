import {
  SNIPPET_LANGUAGE_OPTIONS,
  SNIPPET_PRIORITY_VALUES,
  SNIPPET_SORT_OPTIONS,
} from "@/constants";

import type { SnippetSearchParams } from "@/types/snippet";

export function normalizeSnippetSearchParams(
  params: SnippetSearchParams & { page?: string },
) {
  const priority = Number(params.priority);

  return {
    // Search
    query: params.query?.trim() ?? "",

    // Filter
    language:
      params.language &&
      SNIPPET_LANGUAGE_OPTIONS.some(
        (option) => option.value === params.language,
      )
        ? params.language
        : "",

    framework: params.framework?.trim() ?? "",

    priority:
      Number.isInteger(priority) &&
      SNIPPET_PRIORITY_VALUES.includes(
        priority as (typeof SNIPPET_PRIORITY_VALUES)[number],
      )
        ? String(priority)
        : "",

    tags: params.tags?.trim(),

    tagsMode: params.tags?.trim()
      ? params.tagsMode === "or"
        ? "or"
        : "and"
      : "",

    favorite: params.favorite === "true" ? "true" : "",

    // Sort
    sort:
      params.sort &&
      SNIPPET_SORT_OPTIONS.some((option) => option.value === params.sort)
        ? params.sort
        : "",

    // Pagination
    page:
      params.page &&
      Number.isInteger(Number(params.page)) &&
      Number(params.page) >= 1
        ? String(Number(params.page))
        : "1",
  };
}
