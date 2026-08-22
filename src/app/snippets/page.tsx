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
  SnippetSidebar,
  SnippetSort,
} from "@/app/snippets/_components";

import { EmptyState, Pagination } from "@/components/common";
import {
  DEFAULT_SNIPPET_SORT,
  SNIPPET_PRIORITY_VALUES,
  SNIPPET_SORT_OPTIONS,
  type SnippetSortOption,
} from "@/constants";
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
    framework?: string;
    priority?: string;
    tags?: string;
    tagsMode?: string;
    favorite?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const pageSize = 10;

  const searchQuery = params.query ?? "";
  const selectedLanguage = params.language ?? "";
  const selectedFramework = params.framework ?? "";
  const selectedPriority = params.priority ?? "";
  const selectedTags = (params.tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const selectedTagsMode = params.tagsMode === "or" ? "or" : "and";
  const selectedFavorite = params.favorite ?? "";

  // Sort
  const selectedSort: SnippetSortOption = SNIPPET_SORT_OPTIONS.some(
    (option) => option.value === params.sort,
  )
    ? (params.sort as SnippetSortOption)
    : DEFAULT_SNIPPET_SORT;

  const requestedPage = Number(params.page ?? "1");

  const paginationParams = new URLSearchParams();

  if (params.query) {
    paginationParams.set("query", params.query);
  }

  if (params.language) {
    paginationParams.set("language", params.language);
  }

  if (params.framework) {
    paginationParams.set("framework", params.framework);
  }

  if (params.priority) {
    paginationParams.set("priority", params.priority);
  }

  if (selectedTags.length > 0) {
    paginationParams.set("tags", selectedTags.join(","));
    paginationParams.set("tagsMode", selectedTagsMode);
  }

  if (params.favorite) {
    paginationParams.set("favorite", params.favorite);
  }

  if (params.sort) {
    paginationParams.set("sort", params.sort);
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
        { framework: { contains: searchQuery } },
        { tags: { contains: searchQuery } },
      ],
    });
  }

  // Tags
  if (selectedTags.length > 0) {
    const tagConditions = selectedTags.map((tag) => ({
      OR: [
        { tags: tag },
        { tags: { startsWith: `${tag},` } },
        { tags: { endsWith: `,${tag}` } },
        { tags: { contains: `,${tag},` } },
      ],
    }));

    conditions.push(
      selectedTagsMode === "or"
        ? { OR: tagConditions }
        : { AND: tagConditions },
    );
  }

  // Language
  if (selectedLanguage) {
    conditions.push({
      language: selectedLanguage,
    });
  }

  // Framework
  if (selectedFramework) {
    conditions.push({
      framework: {
        contains: selectedFramework,
      },
    });
  }

  // Priority
  const priorityValue = Number(selectedPriority);
  if (
    selectedPriority &&
    Number.isInteger(priorityValue) &&
    SNIPPET_PRIORITY_VALUES.includes(
      priorityValue as (typeof SNIPPET_PRIORITY_VALUES)[number],
    )
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

  // Sort -> Prisma orderBy
  const orderBy = ((): {
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
    priority?: "asc" | "desc";
  } => {
    switch (selectedSort) {
      case "oldest":
        return { createdAt: "asc" };
      case "priority":
        return { priority: "desc" };
      case "updated":
        return { updatedAt: "desc" };
      case "newest":
      default:
        return { createdAt: "desc" };
    }
  })();

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
      <main className={styles.main}>
        <Container>
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
          <Spacer />
        </Container>
        {/* Sidebar */}
        <aside className={styles.aside}>
          <SnippetSidebar />
        </aside>
      </main>
    </>
  );
}
