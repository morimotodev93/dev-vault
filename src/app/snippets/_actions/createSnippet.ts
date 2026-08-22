"use server";

import { prisma } from "@/lib/prisma";
import { snippetFormSchema, type SnippetFormValues } from "@/types/snippet";

export async function createSnippet(data: SnippetFormValues) {
  const result = snippetFormSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false as const,
      error: "Invalid input",
    };
  }

  const snippet = await prisma.snippet.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      language: result.data.language,
      framework: result.data.framework,
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
