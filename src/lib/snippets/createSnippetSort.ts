// src/lib/snippets/sort.ts

import {
  DEFAULT_SNIPPET_SORT,
  SNIPPET_SORT_OPTIONS,
  type SnippetSortOption,
} from "@/constants";

export function getSnippetSort(sort?: string): SnippetSortOption {
  return SNIPPET_SORT_OPTIONS.some((option) => option.value === sort)
    ? (sort as SnippetSortOption)
    : DEFAULT_SNIPPET_SORT;
}

export function createSnippetOrderBy(sort: SnippetSortOption) {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" as const };

    case "priority":
      return { priority: "desc" as const };

    case "updated":
      return { updatedAt: "desc" as const };

    case "newest":
    default:
      return { createdAt: "desc" as const };
  }
}
