import { Tag } from "@/components/common";
import { StarIcon } from "@/components/icon";
import {
  Button,
  Heading,
  Link,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";
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
  code,
  updatedAt,
}: SnippetCardProps) {
  const priorityConfig = getPriorityConfig(priority);

  return (
    <Link href={`/snippets/${id}`}>
      <Surface
        radius="sm"
        bordered
        className={clsx("w-full", styles.snippetsCard)}
      >
        <Stack>
          <Heading size="sm">{title}</Heading>
          <Text>{description}</Text>
          <Stack gap={1}>
            {/* Language Tag Area*/}
            <Stack direction="row" gap={1}>
              <Tag size="sm">{language}</Tag>

              {tags &&
                tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <Tag key={tag} size="sm">
                      {tag}
                    </Tag>
                  ))}

              <Tag variant={priorityConfig.variant} size="sm">
                {priorityConfig.label}
              </Tag>
            </Stack>
            {/* Update & Favorit Button Area */}
            <Stack direction="row" align="center" justify="between">
              <Text size="sm">Updated: {updatedAt.toLocaleDateString()}</Text>
              {favorite && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={styles.favoriteButton}
                >
                  <StarIcon />
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Surface>
    </Link>
  );
}
