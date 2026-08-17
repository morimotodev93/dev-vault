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
  SnippetCard,
  SnippetFilter,
  SnippetSearch,
} from "@/app/snippets/_components";
import { EmptyState, Pagination } from "@/components/common";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
import { redirect } from "next/navigation";
import styles from "./snippet.module.css";

export default async function Snippet({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    language?: string;
    priority?: string;
    favorite?: string;
  }>;
}) {
  const params = await searchParams;

  const pageSize = 10;

  const searchQuery = params.query ?? "";
  const selectedLanguage = params.language ?? "";
  const selectedPriority = params.priority ?? "";
  const selectedFavorite = params.favorite ?? "";

  const requestedPage = Number(params.page ?? "1");

  const paginationParams = new URLSearchParams();

  if (params.query) {
    paginationParams.set("query", params.query);
  }

  if (params.language) {
    paginationParams.set("language", params.language);
  }

  if (params.priority) {
    paginationParams.set("priority", params.priority);
  }

  if (params.favorite) {
    paginationParams.set("favorite", params.favorite);
  }

  // Invalid page parameter
  if (!Number.isInteger(requestedPage) || requestedPage < 1) {
    redirect("/snippets");
  }

  const conditions = [];

  // Query
  if (searchQuery) {
    conditions.push({
      OR: [
        { title: { contains: searchQuery } },
        { language: { contains: searchQuery } },
        { tags: { contains: searchQuery } },
      ],
    });
  }

  // Language
  if (selectedLanguage) {
    conditions.push({
      language: selectedLanguage,
    });
  }

  // Priority
  const priorityValue = Number(selectedPriority);
  if (
    selectedPriority &&
    Number.isInteger(priorityValue) &&
    [0, 3, 5].includes(priorityValue)
  ) {
    conditions.push({
      priority: priorityValue,
    });
  }

  // Favorite

  if (selectedFavorite === "true") {
    conditions.push({
      favorite: true,
    });
  }

  const where =
    conditions.length > 0
      ? {
          AND: conditions,
        }
      : undefined;

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
    skip,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Container>
        <Stack gap={6}>
          <Heading as="h2" size="lg">
            Snippets List
          </Heading>
          {/* Search Input */}
          <SnippetSearch />
          {/* Test Sunippet Fileter */}
          <SnippetFilter />
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
        <Spacer />
      </Container>
    </>
  );
}
