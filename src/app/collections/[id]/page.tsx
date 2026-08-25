import {
  Container,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@/components/primitives";

import { Tag } from "@/components/common";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CollectionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
  });

  if (!collection) {
    notFound();
  }

  const frameworks = Array.isArray(collection.frameworks)
    ? collection.frameworks.filter(
        (framework): framework is string => typeof framework === "string",
      )
    : [];

  return (
    <>
      <Container>
        <Stack gap={8}>
          {/* Collection List */}
          <Stack gap={6}>
            <Heading as="h2" size="lg">
              {collection.title}
            </Heading>

            <Text>{collection.description}</Text>

            {/* Language */}

            {collection.language && <Text>{collection.language}</Text>}

            {/* Frameworks */}

            {/* Frameworks */}
            {frameworks.length > 0 && (
              <Stack direction="row" gap={2}>
                {frameworks.map((framework) => (
                  <Tag key={framework} size="sm">
                    {framework}
                  </Tag>
                ))}
              </Stack>
            )}
          </Stack>
          <Spacer mobile={32} desktop={48} />
        </Stack>
      </Container>
    </>
  );
}
