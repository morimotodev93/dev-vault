"use server";

import { prisma } from "@/lib/prisma";

type RatingField = "priority" | "interest" | "practicality";
type RatingValue = 0 | 3 | 5;

export async function updateCollectionRating(
  id: string,
  field: RatingField,
  value: RatingValue,
) {
  await prisma.collection.update({
    where: {
      id,
    },
    data: {
      [field]: value,
    },
  });

  return {
    id,
    field,
    value,
  };
}
