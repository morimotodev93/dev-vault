import {
  Container,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@/components/primitives";

import { Tag } from "@/components/common";
import { LinkButton } from "@/components/ui";

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

            <Stack gap={2} direction="row">
              {/* Language */}

              {snippet.language && (
                <Tag color="accent" size="sm">
                  {snippet.language}
                </Tag>
              )}

              {/* Framework */}

              {snippet.framework && (
                <Tag color="success" size="sm">
                  {snippet.framework}
                </Tag>
              )}
            </Stack>

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
              <LinkButton href={`/snippets/${snippet.id}/edit`}>
                Edit
              </LinkButton>
              {/* New Snippets */}
              <LinkButton variant="primary" href="/snippets/new">
                New Snippet
              </LinkButton>
              {/*  Snippets List */}
              <LinkButton href="/snippets">Snippet List</LinkButton>
            </Stack>
          </Stack>
          <Spacer />
        </Stack>
      </Container>
    </>
  );
}
