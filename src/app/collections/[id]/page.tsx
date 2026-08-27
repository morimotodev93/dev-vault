import { Container, Spacer, Stack } from "@/components/primitives";

import {
  CollectionDetailActions,
  CollectionDetailMetadata,
} from "@/app/collections/_components";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CollectionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
  });

  if (!collection) {
    notFound();
  }

  return (
    <>
      <Container>
        <Stack gap={8}>
          <CollectionDetailMetadata {...collection} />
          {/* CollectionSnippetCardを置く予定 */}
          <CollectionDetailActions id={collection.id} />
        </Stack>
        <Spacer mobile={32} desktop={48} />
      </Container>
    </>
  );
}
