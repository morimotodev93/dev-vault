import { SNIPPET_PRIORITY_VALUES, SNIPPET_SORT_OPTIONS } from "@/constants";

import type { SnippetSearchParams } from "@/types/snippet";

export function normalizeSnippetSearchParams(
  params: SnippetSearchParams & { page?: string },
) {
  const normalized = new URLSearchParams();

  // query
  if (params.query?.trim()) {
    normalized.set("query", params.query.trim());
  }

  // language
  if (params.language) {
    normalized.set("language", params.language);
  }

  // framework
  if (params.framework?.trim()) {
    normalized.set("framework", params.framework.trim());
  }

  // priority
  if (params.priority) {
    const priorityValue = Number(params.priority);

    if (
      Number.isInteger(priorityValue) &&
      SNIPPET_PRIORITY_VALUES.includes(
        priorityValue as (typeof SNIPPET_PRIORITY_VALUES)[number],
      )
    ) {
      normalized.set("priority", String(priorityValue));
    }
  }

  // tags
  if (params.tags?.trim()) {
    const tags = params.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (tags.length > 0) {
      normalized.set("tags", tags.join(","));
      normalized.set("tagsMode", params.tagsMode === "or" ? "or" : "and");
    }
  }

  // favorite
  if (params.favorite === "true") {
    normalized.set("favorite", "true");
  }

  // sort
  if (
    params.sort &&
    SNIPPET_SORT_OPTIONS.some((option) => option.value === params.sort)
  ) {
    normalized.set("sort", params.sort);
  }

  // page
  if (params.page) {
    const page = Number(params.page);

    if (Number.isInteger(page) && page >= 1) {
      normalized.set("page", String(page));
    }
  }

  return normalized;
}
