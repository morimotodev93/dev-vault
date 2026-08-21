import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

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

            <Stack gap={2} align="center" justify="end" direction="row">
              {/* Detail Return */}
              <Link href={`/snippets/${snippet.id}`}>
                <Surface radius="md" bordered>
                  <Stack justify="center" align="center">
                    <Text>Return</Text>
                  </Stack>
                </Surface>
              </Link>
              {/* New Snippets */}
              <Link href="/snippets/new">
                <Surface radius="md" bordered>
                  <Stack justify="center" align="center">
                    <Text>New Snippet</Text>
                  </Stack>
                </Surface>
              </Link>
              {/*  Snippets List */}
              <Link href="/snippets">
                <Surface radius="md" bordered>
                  <Stack justify="center" align="center">
                    <Text> Snippet List</Text>
                  </Stack>
                </Surface>
              </Link>
            </Stack>
          </Stack>
          <Spacer mobile={40} desktop={60} />
        </Stack>
      </Container>
    </>
  );
}
