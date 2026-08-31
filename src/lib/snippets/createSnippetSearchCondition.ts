// src/lib/snippets/createSnippetSearchCondition.ts

export function createSnippetSearchCondition(query: string) {
  if (!query) {
    return null;
  }

  return {
    OR: [
      { title: { contains: query } },
      { language: { contains: query } },
      { framework: { contains: query } },
      { tags: { contains: query } },
    ],
  };
}
