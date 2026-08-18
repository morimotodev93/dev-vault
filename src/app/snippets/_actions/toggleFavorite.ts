"use server";

import { prisma } from "@/lib/prisma";

export async function toggleFavorite(id: string, favorite: boolean) {
  const snippet = await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      favorite,
    },
  });

  return {
    id: snippet.id,
    favorite: snippet.favorite,
  };
}
