"use server";

import { prisma } from "@/lib/prisma";

export async function deleteSnippet(id: string) {
  if (!id) {
    return {
      success: false as const,
      error: "Invalid ID",
    };
  }

  try {
    const snippet = await prisma.snippet.delete({
      where: {
        id,
      },
    });

    return {
      success: true as const,
      data: snippet,
    };
  } catch {
    return {
      success: false as const,
      error: "Failed to delete snippet",
    };
  }
}
