"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCollectionSnippet(
  collectionId: string,
  collectionSnippetId: string,
) {
  await prisma.collectionSnippet.delete({
    where: {
      id: collectionSnippetId,
    },
  });

  revalidatePath(`/collections/${collectionId}`);
}
