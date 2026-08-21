// constants/snippet.ts
export const SNIPPET_LANGUAGE_OPTIONS = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
] as const;

export const SNIPPET_LANGUAGE_VALUES = SNIPPET_LANGUAGE_OPTIONS.map(
  (option) => option.value,
) as [
  (typeof SNIPPET_LANGUAGE_OPTIONS)[number]["value"],
  ...(typeof SNIPPET_LANGUAGE_OPTIONS)[number]["value"][],
];

export const SNIPPET_PRIORITY_OPTIONS = [
  { value: "0", label: "Low" },
  { value: "3", label: "Medium" },
  { value: "5", label: "High" },
] as const;

export const SNIPPET_PRIORITY_VALUES = [0, 3, 5] as const;

export const SNIPPET_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priority", label: "Priority" },
  { value: "updated", label: "Recently Updated" },
] as const;

export const DEFAULT_SNIPPET_SORT = "newest";

export type SnippetSortOption = (typeof SNIPPET_SORT_OPTIONS)[number]["value"];
