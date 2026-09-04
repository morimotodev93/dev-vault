// app/page.tsx
import { Hero, QuickStats, RecentCollection, RecentSnippets } from "@/app/home";
import { Container, Spacer, Stack } from "@/components/primitives";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const totalSnippets = await prisma.snippet.count();

  const totalCollections = await prisma.collection.count();

  const favoriteSnippets = await prisma.snippet.count({
    where: {
      favorite: true,
    },
  });

  const favoriteCollections = await prisma.collection.count({
    where: {
      favorite: true,
    },
  });

  const recentSnippets = await prisma.snippet.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    take: 3,
  });

  const recentCollections = await prisma.collection.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    take: 3,
  });

  const recentCollectionItems = recentCollections.map((collection) => ({
    ...collection,
    description: collection.description ?? undefined,
    language: collection.language ?? undefined,
    frameworks: Array.isArray(collection.frameworks)
      ? collection.frameworks.filter(
          (framework): framework is string => typeof framework === "string",
        )
      : [],
  }));
  return (
    <Container>
      <Stack gap={6}>
        <Hero />
        <QuickStats
          totalSnippets={totalSnippets}
          favoriteSnippets={favoriteSnippets}
          totalCollections={totalCollections}
          favoriteCollections={favoriteCollections}
        />
        <RecentSnippets recentSnippets={recentSnippets} />
        <RecentCollection recentCollections={recentCollectionItems} />
      </Stack>
      <Spacer mobile={48} desktop={80} />
    </Container>
  );
}
