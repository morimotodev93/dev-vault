import {
  COLLECTION_CATEGORY_OPTIONS,
  COLLECTION_INTEREST_VALUES,
  COLLECTION_LANGUAGE_OPTIONS,
  COLLECTION_PRACTICALITY_VALUES,
  COLLECTION_PRIORITY_VALUES,
  COLLECTION_SORT_OPTIONS,
} from "@/constants/collection";

import type { CollectionSearchParams } from "@/types/collection";

export function normalizeCollectionSearchParams(
  params: CollectionSearchParams & { page?: string },
) {
  const priority = Number(params.priority);
  const interest = Number(params.interest);
  const practicality = Number(params.practicality);

  return {
    // Search
    query: params.query?.trim() ?? "",

    // Filter
    category:
      params.category &&
      COLLECTION_CATEGORY_OPTIONS.some(
        (option) => option.value === params.category,
      )
        ? params.category
        : "",

    language:
      params.language &&
      COLLECTION_LANGUAGE_OPTIONS.some(
        (option) => option.value === params.language,
      )
        ? params.language
        : "",

    priority:
      Number.isInteger(priority) &&
      COLLECTION_PRIORITY_VALUES.includes(
        priority as (typeof COLLECTION_PRIORITY_VALUES)[number],
      )
        ? String(priority)
        : "",

    interest:
      Number.isInteger(interest) &&
      COLLECTION_INTEREST_VALUES.includes(
        interest as (typeof COLLECTION_INTEREST_VALUES)[number],
      )
        ? String(interest)
        : "",

    practicality:
      Number.isInteger(practicality) &&
      COLLECTION_PRACTICALITY_VALUES.includes(
        practicality as (typeof COLLECTION_PRACTICALITY_VALUES)[number],
      )
        ? String(practicality)
        : "",

    favorite: params.favorite === "true" ? "true" : "",

    // Sort
    sort:
      params.sort &&
      COLLECTION_SORT_OPTIONS.some((option) => option.value === params.sort)
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
