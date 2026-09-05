import { Heading, Stack, Text } from "@/components/primitives";

import { FavoriteButton, RatingButton } from "@/app/collections/_components";
import { Tag } from "@/components/common";

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
    {
      type: "priority",
      label: "Priority",
      value: collection.priority,
    },
    {
      type: "interest",
      label: "Interest",
      value: collection.interest,
    },
    {
      type: "practicality",
      label: "Practicality",
      value: collection.practicality,
    },
  ] as const;

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

      <Stack direction="row" align="center" justify="between" wrap>
        {/* Rating Items */}
        <Stack direction="row" align="center" gap={3}>
          {ratingItems.map((item) => (
            <Stack key={item.type} gap={1}>
              <Text size="sm">{item.label}</Text>

              <RatingButton
                id={collection.id}
                type={item.type}
                value={item.value}
              />
            </Stack>
          ))}
        </Stack>
        {/* Favorite */}
        <FavoriteButton id={collection.id} favorite={collection.favorite} />
      </Stack>
    </Stack>
  );
}
