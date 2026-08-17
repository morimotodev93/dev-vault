"use server";

import { prisma } from "@/lib/prisma";
import { snippetFormSchema, type SnippetFormValues } from "@/types/snippet";

export async function updateSnippet(id: string, data: SnippetFormValues) {
  const result = snippetFormSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false as const,
      error: "Invalid input",
    };
  }

  const snippet = await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      title: result.data.title,
      description: result.data.description,
      language: result.data.language,
      framework: result.data.framework,
      category: result.data.category,
      tags: result.data.tags.join(","),
      favorite: result.data.favorite,
      priority: result.data.priority,
      code: result.data.code,
      memo: result.data.memo,
    },
  });

  return {
    success: true as const,
    data: snippet,
  };
}
