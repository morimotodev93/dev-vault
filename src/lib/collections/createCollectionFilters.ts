import {
  COLLECTION_INTEREST_VALUES,
  COLLECTION_PRACTICALITY_VALUES,
  COLLECTION_PRIORITY_VALUES,
} from "@/constants";

interface CollectionFilterParams {
  category: string;
  language: string;
  priority: string;
  interest: string;
  practicality: string;

  favorite: string;
}

export function createCollectionFilterConditions({
  category,
  language,
  priority,
  interest,
  practicality,

  favorite,
}: CollectionFilterParams) {
  const conditions = [];

  // Category
  if (category) {
    conditions.push({
      category,
    });
  }

  // Language
  if (language) {
    conditions.push({
      language,
    });
  }

  // Priority
  if (priority) {
    const priorityValue = Number(priority);

    if (
      Number.isInteger(priorityValue) &&
      COLLECTION_PRIORITY_VALUES.includes(
        priorityValue as (typeof COLLECTION_PRIORITY_VALUES)[number],
      )
    ) {
      conditions.push({
        priority: priorityValue,
      });
    }
  }
  // Interest
  if (interest) {
    const interestValue = Number(interest);

    if (
      Number.isInteger(interestValue) &&
      COLLECTION_INTEREST_VALUES.includes(
        interestValue as (typeof COLLECTION_INTEREST_VALUES)[number],
      )
    ) {
      conditions.push({
        interest: interestValue,
      });
    }
  }
  // Practicality
  if (practicality) {
    const practicalityValue = Number(practicality);

    if (
      Number.isInteger(practicalityValue) &&
      COLLECTION_PRACTICALITY_VALUES.includes(
        practicalityValue as (typeof COLLECTION_PRACTICALITY_VALUES)[number],
      )
    ) {
      conditions.push({
        practicality: practicalityValue,
      });
    }
  }

  // Favorite
  if (favorite === "true") {
    conditions.push({
      favorite: true,
    });
  }

  return conditions;
}
