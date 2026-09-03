import {
  Container,
  Heading,
  Link,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

import {
  SnippetCard,
  SnippetFilter,
  SnippetSearch,
  SnippetSidebar,
  SnippetSort,
} from "@/app/snippets/_components";

import { EmptyState, Pagination } from "@/components/common";

import type { SnippetSearchParams } from "@/types/snippet";

import { prisma } from "@/lib/prisma";
import {
  createSnippetOrderBy,
  createSnippetPaginationParams,
  createSnippetWhere,
  getSnippetSort,
  normalizeSnippetSearchParams,
} from "@/lib/snippets";
import clsx from "clsx";
import { redirect } from "next/navigation";

import styles from "./snippet.module.css";

export default async function Snippet({
  searchParams,
}: {
  searchParams: Promise<SnippetSearchParams & { page?: string }>;
}) {
  const params = await searchParams;

  const normalizedParams = normalizeSnippetSearchParams(params);

  // URL normalization
  const currentParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      currentParams.set(key, value);
    }
  });

  const currentWithoutPage = new URLSearchParams(currentParams);
  currentWithoutPage.delete("page");

  const normalizedWithoutPage = new URLSearchParams();

  Object.entries(normalizedParams).forEach(([key, value]) => {
    if (key !== "page" && value !== undefined && value !== "") {
      normalizedWithoutPage.set(key, String(value));
    }
  });

  const hasChanged =
    currentWithoutPage.toString() !== normalizedWithoutPage.toString();

  if (hasChanged) {
    const redirectParams = new URLSearchParams();

    Object.entries(normalizedParams).forEach(([key, value]) => {
      if (key !== "page" && value !== undefined && value !== "") {
        redirectParams.set(key, String(value));
      }
    });

    const queryString = redirectParams.toString();

    redirect(queryString ? `/snippets?${queryString}` : "/snippets");
  }

  const pageSize = 10;

  const searchQuery = params.query ?? "";
  const selectedLanguage = params.language ?? "";
  const selectedFramework = params.framework ?? "";
  const selectedPriority = params.priority ?? "";

  const selectedTags = normalizedParams.tags
    ? normalizedParams.tags.split(",")
    : [];

  const selectedTagsMode = normalizedParams.tagsMode === "or" ? "or" : "and";

  const selectedFavorite = params.favorite ?? "";

  const selectedSort = getSnippetSort(params.sort);

  const requestedPage = Number(params.page ?? "1");

  const paginationParams = createSnippetPaginationParams(params);

  const where = createSnippetWhere({
    query: searchQuery,
    language: selectedLanguage,
    framework: selectedFramework,
    priority: selectedPriority,
    tags: selectedTags,
    tagsMode: selectedTagsMode,
    favorite: selectedFavorite,
  });

  // Sort -> Prisma orderBy
  const orderBy = createSnippetOrderBy(selectedSort);

  // Pagination
  const totalCount = await prisma.snippet.count({
    where,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  // Page does not exist
  if (requestedPage > totalPages && totalPages > 0) {
    redirect("/snippets");
  }

  const currentPage = requestedPage;
  const skip = (currentPage - 1) * pageSize;

  // Snippets
  const snippets = await prisma.snippet.findMany({
    where,
    orderBy,
    skip,
    take: pageSize,
  });

  return (
    <>
      <Container className={styles.snippets}>
        <Stack gap={6}>
          <Heading as="h2" size="lg">
            Snippets List
          </Heading>
          {/* Snippet Controls */}
          {/* mobile */}
          <Stack className={styles.mobileSnippetControls}>
            {/* Search Input */}
            <SnippetSearch />
            {/* Snippet Filter */}
            <SnippetFilter />
            {/* Snippet Sort */}
            <SnippetSort />
          </Stack>

          {/* Snippets Menu */}
          {totalCount === 0 ? (
            <Stack
              justify="center"
              align="center"
              className={styles.snippetsZero}
            >
              <EmptyState
                title="No snippets yet"
                description="Create your first snippet to start building your knowledge base."
              />
            </Stack>
          ) : (
            <>
              <div className={clsx(styles.snippetsList, "l-auto-grid")}>
                {snippets.map((snippet) => (
                  <SnippetCard key={snippet.id} {...snippet} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  searchParams={paginationParams.toString()}
                />
              )}
            </>
          )}

          <Stack gap={2} align="center" justify="end" direction="row">
            {/* New Snippets */}
            <Link href="/snippets/new">
              <Surface radius="md" bordered>
                <Stack justify="center" align="center">
                  <Text>New Snippet</Text>
                </Stack>
              </Surface>
            </Link>
          </Stack>
        </Stack>
      </Container>
      {/* Sidebar */}
      <SnippetSidebar />
    </>
  );
}
