export function createCollectionSearchCondition(query: string) {
  if (!query.trim()) {
    return undefined;
  }

  return {
    OR: [
      {
        title: {
          contains: query,
        },
      },
      {
        category: {
          contains: query,
        },
      },
      {
        language: {
          contains: query,
        },
      },
    ],
  };
}
