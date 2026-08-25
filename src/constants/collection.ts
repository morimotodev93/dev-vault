// constants/collection.ts

export const COLLECTION_CATEGORY_OPTIONS = [
  { value: "marketing", label: "Marketing" },
  { value: "learning", label: "Learning" },
  { value: "work", label: "Work" },
  { value: "portfolio", label: "Portfolio" },
  { value: "personal", label: "Personal" },
  { value: "research", label: "Research" },
] as const;

export const COLLECTION_CATEGORY_VALUES = COLLECTION_CATEGORY_OPTIONS.map(
  (option) => option.value,
) as [
  (typeof COLLECTION_CATEGORY_OPTIONS)[number]["value"],
  ...(typeof COLLECTION_CATEGORY_OPTIONS)[number]["value"][],
];

export const COLLECTION_LANGUAGE_OPTIONS = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
] as const;

export const COLLECTION_LANGUAGE_VALUES = COLLECTION_LANGUAGE_OPTIONS.map(
  (option) => option.value,
) as [
  (typeof COLLECTION_LANGUAGE_OPTIONS)[number]["value"],
  ...(typeof COLLECTION_LANGUAGE_OPTIONS)[number]["value"][],
];
export const COLLECTION_PRIORITY_OPTIONS = [
  { value: "0", label: "Low" },
  { value: "3", label: "Medium" },
  { value: "5", label: "High" },
] as const;

export const COLLECTION_INTEREST_OPTIONS = [
  { value: "0", label: "Curious" },
  { value: "3", label: "Interested" },
  { value: "5", label: "Excited" },
] as const;

export const COLLECTION_PRACTICALITY_OPTIONS = [
  { value: "0", label: "Optional" },
  { value: "3", label: "Useful" },
  { value: "5", label: "Essential" },
] as const;

export const COLLECTION_PRIORITY_VALUES = [0, 3, 5] as const;

export const COLLECTION_INTEREST_VALUES = [0, 3, 5] as const;

export const COLLECTION_PRACTICALITY_VALUES = [0, 3, 5] as const;

export const COLLECTION_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priority", label: "Priority" },
  { value: "interest", label: "Interest" },
  { value: "practicality", label: "Practicality" },
  { value: "updated", label: "Recently Updated" },
] as const;

export const DEFAULT_COLLECTION_SORT = "newest";

export type CollectionSortOption =
  (typeof COLLECTION_SORT_OPTIONS)[number]["value"];
