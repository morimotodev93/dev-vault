import { Heading, Stack, Text } from "@/components/primitives";

import { Tag } from "@/components/common";
import { StarIcon } from "@/components/icon";

import {
  COLLECTION_CATEGORY_OPTIONS,
  COLLECTION_LANGUAGE_OPTIONS,
} from "@/constants/collection";

import type { CollectionDetailMetadataItem } from "@/types/collection";

export function CollectionDetailMetadata(
  collection: CollectionDetailMetadataItem,
) {
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
  ];

  return (
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
  );
}
