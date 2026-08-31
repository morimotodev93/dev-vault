import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

import {
  CollectionCard,
  CollectionSearch,
  CollectionSidebar,
} from "@/app/collections/_components";
import { EmptyState, Pagination } from "@/components/common";
import { prisma } from "@/lib/prisma";
import type { CollectionSearchParams } from "@/types/collection";
import { redirect } from "next/navigation";

import { createCollectionWhere } from "@/lib/collections";

import styles from "./Collection.module.css";

export default async function Collection({
  searchParams,
}: {
  searchParams: Promise<CollectionSearchParams & { page?: string }>;
}) {
  const params = await searchParams;

  const pageSize = 10;

  const requestedPage = Number(params.page ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const where = createCollectionWhere({
    query: params.query ?? "",
    category: "",
    language: "",
    framework: "",
    priority: "",
    interest: "",
    practicality: "",
    favorite: "",
  });

  const totalCount = await prisma.collection.count({
    where,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  if (currentPage > totalPages && totalPages > 0) {
    redirect("/collections");
  }

  const collections = await prisma.collection.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const collectionItems = collections.map((collection) => ({
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
    <>
      <main className={styles.main}>
        <Container>
          <Stack gap={6}>
            <Heading as={"h2"} level={2} size="lg">
              Collection List
            </Heading>
            {/* mobile (Base) */}
            {/* Search, Filter, Sort */}
            <Stack className={styles.mobileCollectionControls}>
              {/* Collection Input */}
              <CollectionSearch />
            </Stack>
          </Stack>
          <Spacer mobile={32} desktop={48} />
          {/* Collection Menu */}
          {totalCount === 0 ? (
            <EmptyState
              title="No collections yet"
              description="Create your first collection to start organizing your knowledge base."
            />
          ) : (
            <>
              <div className="l-auto-grid">
                {collectionItems.map((collection) => (
                  <CollectionCard key={collection.id} {...collection} />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath="/collections"
                />
              )}
            </>
          )}
          <Spacer mobile={32} desktop={48} />
          <Stack direction="row" align="center" justify="end">
            {/* New Collection Button */}
            <Link appearance="content" href="/collections/new">
              <Surface radius="md" bordered>
                <Stack justify="center" align="center">
                  <Text size="sm">New Collection</Text>
                </Stack>
              </Surface>
            </Link>
          </Stack>
          <Spacer mobile={48} desktop={80} />
        </Container>
        {/* Sidebar */}
        <aside className={styles.aside}>
          <CollectionSidebar />
        </aside>
      </main>
    </>
  );
}
