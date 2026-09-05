"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCollectionSnippet(
  collectionId: string,
  collectionSnippetId: string,
) {
  await prisma.$transaction(async (tx) => {
    const collectionSnippet = await tx.collectionSnippet.findUnique({
      where: {
        id: collectionSnippetId,
      },
      select: {
        position: true,
      },
    });

    if (!collectionSnippet) {
      throw new Error("Collection snippet not found");
    }

    await tx.collectionSnippet.delete({
      where: {
        id: collectionSnippetId,
      },
    });

    await tx.collectionSnippet.updateMany({
      where: {
        collectionId,
        position: {
          gt: collectionSnippet.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    });
  });

  revalidatePath(`/collections/${collectionId}`);
}
