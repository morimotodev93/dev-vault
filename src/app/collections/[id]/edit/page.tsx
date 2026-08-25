import { CollectionForm } from "@/app/collections/_components";
import { Container, Heading, Spacer, Stack } from "@/components/primitives";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCollection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = await prisma.collection.findUnique({ where: { id } });

  if (!collection) {
    notFound();
  }

  const frameworks = Array.isArray(collection.frameworks)
    ? collection.frameworks.filter(
        (framework): framework is string => typeof framework === "string",
      )
    : [];

  return (
    <Container>
      <Stack gap={6}>
        <Heading as="h2" level={2} size="lg">
          Edit Collection
        </Heading>
        <CollectionForm
          mode="edit"
          collection={{ ...collection, frameworks }}
        />
      </Stack>
      <Spacer mobile={48} desktop={80} />
    </Container>
  );
}
