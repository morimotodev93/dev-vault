"use server";

import { prisma } from "@/lib/prisma";

export async function toggleFavorite(id: string, favorite: boolean) {
  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      favorite,
    },
  });

  return {
    id: collection.id,
    favorite: collection.favorite,
  };
}
