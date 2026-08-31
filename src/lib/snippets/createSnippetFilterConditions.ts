// src/lib/snippets/createSnippetFilterConditions.ts

import { SNIPPET_PRIORITY_VALUES } from "@/constants";

interface SnippetFilterParams {
  language: string;
  framework: string;
  priority: string;
  tags: string[];
  tagsMode: "and" | "or";
  favorite: string;
}

export function createSnippetFilterConditions({
  language,
  framework,
  priority,
  tags,
  tagsMode,
  favorite,
}: SnippetFilterParams) {
  const conditions = [];

  // Language
  if (language) {
    conditions.push({
      language,
    });
  }

  // Framework
  if (framework) {
    conditions.push({
      framework: {
        contains: framework,
      },
    });
  }

  // Priority
  if (priority) {
    const priorityValue = Number(priority);

    if (
      Number.isInteger(priorityValue) &&
      SNIPPET_PRIORITY_VALUES.includes(
        priorityValue as (typeof SNIPPET_PRIORITY_VALUES)[number],
      )
    ) {
      conditions.push({
        priority: priorityValue,
      });
    }
  }

  // Tags
  if (tags.length > 0) {
    const tagConditions = tags.map((tag) => ({
      OR: [
        { tags: tag },
        { tags: { startsWith: `${tag},` } },
        { tags: { endsWith: `,${tag}` } },
        { tags: { contains: `,${tag},` } },
      ],
    }));

    conditions.push(
      tagsMode === "or" ? { OR: tagConditions } : { AND: tagConditions },
    );
  }

  // Favorite
  if (favorite === "true") {
    conditions.push({
      favorite: true,
    });
  }

  return conditions;
}
