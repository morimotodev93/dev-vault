// src/app/collections/_actions/updateCollection.ts

"use server";

import { prisma } from "@/lib/prisma";
import { collectionFormSchema } from "@/types/collection";

export async function updateCollection(id: string, input: unknown) {
  const result = collectionFormSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false as const,
      error: "Invalid collection data",
    };
  }

  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      title: result.data.title,
      description: result.data.description,
      category: result.data.category,
      language: result.data.language || null,
      frameworks: result.data.frameworks,
      favorite: result.data.favorite,
      priority: result.data.priority,
      interest: result.data.interest,
      practicality: result.data.practicality,
    },
  });

  return {
    success: true as const,
    data: collection,
  };
}
