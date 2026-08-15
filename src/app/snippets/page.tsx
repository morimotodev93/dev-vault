import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

import { SnippetCard } from "@/app/snippets/_components";
import { EmptyState, Pagination } from "@/components/common";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
import { redirect } from "next/navigation";
import styles from "./snippet.module.css";

export default async function Snippet({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const pageSize = 10;
  const requestedPage = Number(params.page ?? "1");

  // Invalid page parameter
  if (!Number.isInteger(requestedPage) || requestedPage < 1) {
    redirect("/snippets");
  }

  const totalCount = await prisma.snippet.count();
  const totalPages = Math.ceil(totalCount / pageSize);

  // Page does not exist
  if (requestedPage > totalPages && totalPages > 0) {
    redirect("/snippets");
  }

  const currentPage = requestedPage;
  const skip = (currentPage - 1) * pageSize;

  const snippets = await prisma.snippet.findMany({
    skip,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Container>
        <Stack gap={8}>
          <Stack gap={6}>
            <Heading as="h2" size="lg">
              Snippets List
            </Heading>

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
        </Stack>
      </Container>
    </>
  );
}
