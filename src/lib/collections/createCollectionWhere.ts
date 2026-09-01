import {
  createCollectionFilterConditions,
  createCollectionSearchCondition,
} from "./index";

interface CollectionQueryParams {
  query: string;
  category: string;
  language: string;
  priority: string;
  interest: string;
  practicality: string;
  favorite: string;
}

export function createCollectionWhere({
  query,
  category,
  language,

  priority,
  interest,
  practicality,
  favorite,
}: CollectionQueryParams) {
  const conditions = [];

  const searchCondition = createCollectionSearchCondition(query);

  if (searchCondition) {
    conditions.push(searchCondition);
  }

  conditions.push(
    ...createCollectionFilterConditions({
      category,
      language,
      priority,
      interest,
      practicality,
      favorite,
    }),
  );

  return conditions.length > 0 ? { AND: conditions } : undefined;
}
