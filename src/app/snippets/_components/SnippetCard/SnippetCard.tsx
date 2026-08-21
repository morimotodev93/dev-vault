import { FavoriteButton } from "@/app/snippets/_components";
import { Tag } from "@/components/common";
import { Heading, Link, Stack, Surface, Text } from "@/components/primitives";
import type { Snippet } from "@/generated/prisma/client";
import clsx from "clsx";

import styles from "./SnippetCard.module.css";

type SnippetCardProps = Snippet;

export function getPriorityConfig(priority: number) {
  switch (priority) {
    case 0:
      return { label: "Low", variant: "default" as const };
    case 3:
      return { label: "Medium", variant: "warning" as const };
    case 5:
      return { label: "High", variant: "destructive" as const };
    default:
      return { label: "Unknown", variant: "default" as const };
  }
}

export function SnippetCard({
  id,
  title,
  description,
  language,
  tags,
  favorite,
  priority,
  updatedAt,
}: SnippetCardProps) {
  const priorityConfig = getPriorityConfig(priority);

  return (
    <Surface
      radius="sm"
      bordered
      className={clsx("w-full", styles.snippetsCard)}
    >
      <Stack justify="between" className={styles.snippetsCard__inner}>
        {/* Content / Link */}
        <Link
          className={styles.snippetsCard__link}
          size="sm"
          href={`/snippets/${id}`}
        >
          <Heading className="u-line-clamp" level={4} size="sm">
            {title}
          </Heading>
          <Text className={clsx("u-line-clamp", styles.snippetsCard__text)}>
            {description}
          </Text>

          <Stack direction="row" wrap gap={2}>
            <Tag size="sm">{language}</Tag>
            {/* tags */}
            {tags &&
              tags
                .split(",")
                .map((tag: string) => tag.trim())
                .filter(Boolean)
                .map((tag: string) => (
                  <Tag key={tag} size="sm">
                    {tag}
                  </Tag>
                ))}
            <Tag variant={priorityConfig.variant} size="sm">
              {priorityConfig.label}
            </Tag>
          </Stack>
        </Link>

        {/* Actions */}
        <Stack
          className={styles.snippetsCard__action}
          direction="row"
          align="center"
          justify="between"
        >
          <Text size="sm">Updated: {updatedAt.toLocaleDateString()}</Text>

          <FavoriteButton id={id} favorite={favorite} />
        </Stack>
      </Stack>
    </Surface>
  );
}
