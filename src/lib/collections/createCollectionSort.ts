import {
  COLLECTION_SORT_OPTIONS,
  DEFAULT_COLLECTION_SORT,
  type CollectionSortOption,
} from "@/constants/collection";

export function getCollectionSort(sort?: string): CollectionSortOption {
  return COLLECTION_SORT_OPTIONS.some((option) => option.value === sort)
    ? (sort as CollectionSortOption)
    : DEFAULT_COLLECTION_SORT;
}

export function createCollectionOrderBy(sort: CollectionSortOption) {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" as const };

    case "priority":
      return { priority: "desc" as const };

    case "interest":
      return { interest: "desc" as const };

    case "practicality":
      return { practicality: "desc" as const };

    case "updated":
      return { updatedAt: "desc" as const };

    case "newest":
    default:
      return { createdAt: "desc" as const };
  }
}
