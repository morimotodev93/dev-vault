import { Container, Grid, Spacer, Stack } from "@/components/primitives";

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
            <Grid
              col={{ mobile: 1, tablet: 2, laptop: 3 }}
              rowGap={{ mobile: 3, tablet: 4 }}
              columnGap={{ mobile: 2, tablet: 5 }}
            >
              {collection.snippets.map((item) => (
                <CollectionSnippetCard
                  key={item.id}
                  id={item.id}
                  collectionId={id}
                  snippet={item.snippet}
                  path={item.path}
                  position={item.position}
                />
              ))}
            </Grid>
          )}
          <CollectionDetailActions id={collection.id} />
        </Stack>
        <Spacer mobile={32} desktop={48} />
      </Container>
    </>
  );
}
