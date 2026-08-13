import { Tag } from "@/components/common";
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
              {tags && <Tag size="sm">{tags}</Tag>}
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
                  ★
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Surface>
    </Link>
  );
}
