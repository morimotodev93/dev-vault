import { Tag } from "@/components/common";
import { Heading, Link, Stack, Surface, Text } from "@/components/primitives";
import type { CollectionCardItem } from "@/types/collection";
import clsx from "clsx";

import styles from "./CollectionCard.module.css";

type CollectionCardProps = CollectionCardItem;

function getRatingConfig(value: number) {
  switch (value) {
    case 0:
      return { label: "Low", variant: "default" as const };
    case 3:
      return { label: "Medium", variant: "warning" as const };
    case 5:
      return { label: "High", variant: "success" as const };
    default:
      return { label: "Unknown", variant: "default" as const };
  }
}

export function CollectionCard({
  id,
  title,
  description,
  category,
  language,
  frameworks,
  favorite,
  priority,
  interest,
  practicality,
  updatedAt,
}: CollectionCardProps) {
  const ratings = [
    ["Priority", priority],
    ["Interest", interest],
    ["Practicality", practicality],
  ] as const;

  return (
    <Surface
      radius="sm"
      bordered
      className={clsx("w-full", styles.collectionCard)}
    >
      <Stack justify="between" className={styles.collectionCard__inner}>
        <Link
          appearance="content"
          className={styles.collectionCard__link}
          size="sm"
          href={`/collections/${id}`}
        >
          <Stack direction="row" align="center" justify="between" gap={3}>
            <Heading className="u-line-clamp" level={4} size="sm">
              {title}
            </Heading>
            {favorite && (
              <Tag color="warning" size="sm">
                Favorite
              </Tag>
            )}
          </Stack>

          {description && (
            <Text className={clsx("u-line-clamp", styles.collectionCard__text)}>
              {description}
            </Text>
          )}

          <Stack direction="row" wrap gap={2}>
            <Tag color="accent" size="sm">
              {category}
            </Tag>
            {language && (
              <Tag color="success" size="sm">
                {language}
              </Tag>
            )}
            {frameworks.map((framework) => (
              <Tag key={framework} size="sm">
                {framework}
              </Tag>
            ))}
          </Stack>

          <Stack direction="row" wrap gap={2}>
            {ratings.map(([label, value]) => {
              const rating = getRatingConfig(value);

              return (
                <Tag key={label} variant={rating.variant} size="sm">
                  {label}: {rating.label}
                </Tag>
              );
            })}
          </Stack>
        </Link>

        <Text size="sm">Updated: {updatedAt.toLocaleDateString()}</Text>
      </Stack>
    </Surface>
  );
}
