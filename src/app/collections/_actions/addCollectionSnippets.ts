"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCollectionSnippets(
  collectionId: string,
  formData: FormData,
): Promise<void> {
  const snippetIds = formData
    .getAll("snippetIds")
    .filter((value): value is string => typeof value === "string");

  if (snippetIds.length === 0) {
    return;
  }

  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
    select: {
      id: true,
    },
  });

  if (!collection) {
    return;
  }

  const existing = await prisma.collectionSnippet.findMany({
    where: {
      collectionId,
      snippetId: {
        in: snippetIds,
      },
    },
    select: {
      snippetId: true,
    },
  });

  const existingSnippetIds = new Set(existing.map((item) => item.snippetId));

  const newSnippetIds = snippetIds.filter(
    (snippetId) => !existingSnippetIds.has(snippetId),
  );

  if (newSnippetIds.length === 0) {
    return;
  }

  const lastSnippet = await prisma.collectionSnippet.findFirst({
    where: {
      collectionId,
    },
    orderBy: {
      position: "desc",
    },
    select: {
      position: true,
    },
  });

  const startPosition = lastSnippet ? lastSnippet.position + 1 : 0;

  await prisma.collectionSnippet.createMany({
    data: newSnippetIds.map((snippetId, index) => ({
      collectionId,
      snippetId,
      path: null,
      position: startPosition + index,
    })),
  });

  revalidatePath(`/collections/${collectionId}`);
}
