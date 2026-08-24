// src/lib/snippets/query.ts

import { createSnippetFilterConditions } from "./createSnippetFilterConditions";
import { createSnippetSearchCondition } from "./createSnippetSearchCondition";

interface SnippetQueryParams {
  query: string;
  language: string;
  framework: string;
  priority: string;
  tags: string[];
  tagsMode: "and" | "or";
  favorite: string;
}

export function createSnippetWhere({
  query,
  language,
  framework,
  priority,
  tags,
  tagsMode,
  favorite,
}: SnippetQueryParams) {
  const conditions = [];

  const searchCondition = createSnippetSearchCondition(query);

  if (searchCondition) {
    conditions.push(searchCondition);
  }

  conditions.push(
    ...createSnippetFilterConditions({
      language,
      framework,
      priority,
      tags,
      tagsMode,
      favorite,
    }),
  );

  return conditions.length > 0
    ? {
        AND: conditions,
      }
    : undefined;
}
