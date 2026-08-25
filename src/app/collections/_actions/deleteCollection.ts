"use server";

import { prisma } from "@/lib/prisma";

export async function deleteCollection(id: string) {
  if (!id) {
    return {
      success: false as const,
      error: "Invalid ID",
    };
  }

  try {
    const collection = await prisma.collection.delete({
      where: {
        id,
      },
    });

    return {
      success: true as const,
      data: collection,
    };
  } catch {
    return {
      success: false as const,
      error: "Failed to delete collection",
    };
  }
}
