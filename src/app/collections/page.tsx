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
  CollectionFilter,
  CollectionSearch,
  CollectionSidebar,
} from "@/app/collections/_components";
import { EmptyState, Pagination } from "@/components/common";
import { prisma } from "@/lib/prisma";
import type { CollectionSearchParams } from "@/types/collection";
import { redirect } from "next/navigation";

import {
  createCollectionWhere,
  normalizeCollectionSearchParams,
} from "@/lib/collections";

import styles from "./Collection.module.css";

export default async function Collection({
  searchParams,
}: {
  searchParams: Promise<CollectionSearchParams & { page?: string }>;
}) {
  const params = await searchParams;

  const normalizedParams = normalizeCollectionSearchParams(params);

  const currentParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      currentParams.set(key, value);
    }
  });

  const normalizedUrlParams = new URLSearchParams();

  Object.entries(normalizedParams).forEach(([key, value]) => {
    if (value) {
      normalizedUrlParams.set(key, value);
    }
  });

  const currentWithoutPage = new URLSearchParams(currentParams);
  currentWithoutPage.delete("page");

  const normalizedWithoutPage = new URLSearchParams(normalizedUrlParams);
  normalizedWithoutPage.delete("page");

  const hasChanged =
    currentWithoutPage.toString() !== normalizedWithoutPage.toString();

  if (hasChanged) {
    normalizedUrlParams.delete("page");

    const queryString = normalizedUrlParams.toString();

    redirect(queryString ? `/collections?${queryString}` : "/collections");
  }

  const pageSize = 10;

  const currentPage = Number(normalizedParams.page);

  const where = createCollectionWhere(normalizedParams);

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
            {/* Collection Filter */}
            <CollectionFilter />
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

      <CollectionSidebar />
    </>
  );
}
