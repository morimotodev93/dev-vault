import { Container, Heading, Spacer, Stack } from "@/components/primitives";

import { LinkButton } from "@/components/ui";

import { SnippetForm } from "@/app/snippets/_components";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SnippetEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <>
      <Container>
        <Stack gap={8}>
          {/* Page Header */}
          <Heading as="h2" size="lg">
            Edit Snippet
          </Heading>

          <Stack gap={6}>
            {/* Edit Form */}
            <SnippetForm mode="edit" snippet={snippet} />

            <Stack wrap gap={2} align="center" direction="row">
              {/* New Snippets */}
              <LinkButton variant="subtle" href="/snippets/new">
                New Snippet
              </LinkButton>
              {/*  Snippets List */}
              <LinkButton href="/snippets">Snippet List</LinkButton>
            </Stack>
          </Stack>
          <Spacer mobile={40} desktop={60} />
        </Stack>
      </Container>
    </>
  );
}
