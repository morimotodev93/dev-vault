// _components/CollectionSnippetCard/CollectionSnippetCard.tsx
import { RemoveCollectionSnippetButton } from "@/app/collections/_components";
import { Heading, Stack, Text } from "@/components/primitives";

import { LinkButton } from "@/components/ui";
import styles from "./CollectionSnippetCard.module.css";

type CollectionSnippetCardProps = {
  id: string;
  collectionId: string;
  snippet: {
    id: string;
    title: string;
    description: string | null;
    language: string | null;
    framework: string | null;
    tags: string;
    code: string;
  };
  path: string | null;
  position: number;
};

export function CollectionSnippetCard({
  snippet,
  path,
  position,
  collectionId,
  id,
}: CollectionSnippetCardProps) {
  return (
    <Stack justify="between" className={styles.collectionSnippetCard}>
      <Stack gap={2} className="px-2">
        <Text size="sm">#{position + 1}</Text>

        <Heading as={"h3"}>{snippet.title}</Heading>

        {snippet.description && <Text size="sm">{snippet.description}</Text>}

        {path && <Text size="sm">{path}</Text>}
      </Stack>

      <Stack direction="row" justify="between">
        <LinkButton variant="primary" href={`/snippets/${snippet.id}`}>
          Snippet Detail
        </LinkButton>
        <RemoveCollectionSnippetButton
          collectionId={collectionId}
          collectionSnippetId={id}
        />
      </Stack>
    </Stack>
  );
}
