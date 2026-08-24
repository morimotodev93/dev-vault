import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

import { Tag } from "@/components/common";

import {
  CodeBlock,
  DeleteButton,
  FavoriteButton,
} from "@/app/snippets/_components";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SnippetDetail({
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
          {/* Snippets List */}
          <Stack gap={6}>
            <Heading as="h2" size="lg">
              {snippet.title}
            </Heading>

            <Text>{snippet.description}</Text>

            {/* Language */}

            {snippet.language && <Text>{snippet.language}</Text>}

            {/* Framework */}

            {snippet.framework && <Text>{snippet.framework}</Text>}

            {/* Tag */}

            {snippet.tags && (
              <Stack direction="row" gap={2}>
                {snippet.tags
                  .split(",")
                  .map((tag: string) => tag.trim())
                  .filter(Boolean)
                  .map((tag: string) => (
                    <Tag key={tag} size="sm">
                      {tag}
                    </Tag>
                  ))}
              </Stack>
            )}

            <CodeBlock code={snippet.code} />

            <Stack direction="row" align="center" justify="end">
              <Text>Favorite</Text>
              <FavoriteButton id={snippet.id} favorite={snippet.favorite} />
            </Stack>

            {/* Other Page Link */}
            <Stack gap={2} wrap align="center" justify="end" direction="row">
              {/* Delete Snippets */}
              <DeleteButton id={snippet.id} />
              {/* Edit Snippets */}
              <Link href={`/snippets/${snippet.id}/edit`} appearance="content">
                <Surface radius="sm" padding="sm" bordered>
                  <Stack justify="center" align="center">
                    <Text>Edit</Text>
                  </Stack>
                </Surface>
              </Link>
              {/* New Snippets */}
              <Link href="/snippets/new" appearance="content">
                <Surface radius="sm" padding="sm" bordered>
                  <Stack justify="center" align="center">
                    <Text>New Snippet</Text>
                  </Stack>
                </Surface>
              </Link>
              {/*  Snippets List */}
              <Link href="/snippets" appearance="content">
                <Surface radius="sm" padding="sm" bordered>
                  <Stack justify="center" align="center">
                    <Text> Snippet List</Text>
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
