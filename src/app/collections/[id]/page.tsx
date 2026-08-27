import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from "@/components/primitives";

import { StarIcon } from "@/components/icon";

import { DeleteButton } from "@/app/collections/_components";
import { Tag } from "@/components/common";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import {
  COLLECTION_CATEGORY_OPTIONS,
  COLLECTION_LANGUAGE_OPTIONS,
} from "@/constants/collection";

import styles from "./CollectionDetail.module.css";

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

  const categoryLabel =
    COLLECTION_CATEGORY_OPTIONS.find(
      (option) => option.value === collection.category,
    )?.label ?? collection.category;

  const languageLabel = collection.language
    ? COLLECTION_LANGUAGE_OPTIONS.find(
        (option) => option.value === collection.language,
      )?.label
    : null;

  const frameworks = Array.isArray(collection.frameworks)
    ? collection.frameworks.filter(
        (framework): framework is string => typeof framework === "string",
      )
    : [];

  const ratingItems = [
    ["Priority", collection.priority],
    ["Interest", collection.interest],
    ["Practicality", collection.practicality],
  ] as const;

  return (
    <>
      <Container>
        <Stack gap={8}>
          {/* Collection List */}
          <Stack gap={6}>
            {/* Title */}
            <Heading as="h2" size="lg">
              {collection.title}
            </Heading>
            {/* Description */}
            <Text>{collection.description}</Text>

            {/* Category */}
            <Text>{categoryLabel}</Text>

            {/* Language */}

            {languageLabel && <Text>{languageLabel}</Text>}
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

            <Stack direction="row" gap={4} wrap>
              {ratingItems.map(([label, value]) => (
                <Stack key={label} gap={1}>
                  <Text size="sm">{label}</Text>
                  <Text>{value} / 5</Text>
                </Stack>
              ))}
            </Stack>

            {/* Favorite */}
            {collection.favorite && (
              <Stack direction="row" align="center" justify="end">
                <StarIcon />
              </Stack>
            )}
          </Stack>
          <Stack gap={2} wrap align="center" justify="end" direction="row">
            <DeleteButton id={collection.id} />
            <Link
              href={`/collections/${collection.id}/edit`}
              appearance="content"
              className={styles.linkButton}
            >
              Edit
            </Link>
            <Link
              href="/collections/new"
              appearance="content"
              className={styles.linkButton}
            >
              New Collection
            </Link>
            <Link
              href="/collections"
              appearance="content"
              className={styles.linkButton}
            >
              Collection List
            </Link>
          </Stack>
        </Stack>
        <Spacer mobile={32} desktop={48} />
      </Container>
    </>
  );
}
