import { RemoveCollectionSnippetButton } from "@/app/collections/_components";
import { Stack } from "@/components/primitives";

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
    <Stack>
      <p>#{position + 1}</p>

      <h3>{snippet.title}</h3>

      {snippet.description && <p>{snippet.description}</p>}

      {path && <p>{path}</p>}

      <RemoveCollectionSnippetButton
        collectionId={collectionId}
        collectionSnippetId={id}
      />
    </Stack>
  );
}
