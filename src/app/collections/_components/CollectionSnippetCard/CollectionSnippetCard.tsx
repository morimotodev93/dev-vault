// _components/CollectionSnippetCard/CollectionSnippetCard.tsx
import { RemoveCollectionSnippetButton } from "@/app/collections/_components";
import { Heading, Stack, Text } from "@/components/primitives";

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
    <Stack justify="between">
      <Text size="sm">#{position + 1}</Text>

      <Heading as={"h3"}>{snippet.title}</Heading>

      {snippet.description && <Text size="sm">{snippet.description}</Text>}

      {path && <Text size="sm">{path}</Text>}

      <RemoveCollectionSnippetButton
        collectionId={collectionId}
        collectionSnippetId={id}
      />
    </Stack>
  );
}
