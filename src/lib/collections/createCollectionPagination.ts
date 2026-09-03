import type { CollectionSearchParams } from "@/types/collection";

export function createCollectionPaginationParams(
  params: CollectionSearchParams,
) {
  const searchParams = new URLSearchParams();

  if (params.query) {
    searchParams.set("query", params.query);
  }

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.language) {
    searchParams.set("language", params.language);
  }

  if (params.priority) {
    searchParams.set("priority", params.priority);
  }

  if (params.interest) {
    searchParams.set("interest", params.interest);
  }

  if (params.practicality) {
    searchParams.set("practicality", params.practicality);
  }

  if (params.favorite) {
    searchParams.set("favorite", params.favorite);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  return searchParams;
}
