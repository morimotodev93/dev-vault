import { Container, Spacer, Stack } from "@/components/primitives";

import {
  CollectionDetailActions,
  CollectionDetailMetadata,
  CollectionSnippetCard,
  CollectionSnippetSelector,
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
    include: {
      snippets: {
        include: {
          snippet: true,
        },
        orderBy: {
          position: "asc",
        },
      },
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
          {/* CollectionSnippetSection */}
          {collection.snippets.length === 0 ? (
            <CollectionSnippetSelector collectionId={collection.id} />
          ) : (
            collection.snippets.map((item) => (
              <CollectionSnippetCard
                key={item.id}
                id={item.id}
                collectionId={id}
                snippet={item.snippet}
                path={item.path}
                position={item.position}
              />
            ))
          )}
          <CollectionDetailActions id={collection.id} />
        </Stack>
        <Spacer mobile={32} desktop={48} />
      </Container>
    </>
  );
}
