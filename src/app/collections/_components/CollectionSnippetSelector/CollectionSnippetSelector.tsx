import { addCollectionSnippets } from "@/app/collections/_actions";
import { Grid } from "@/components/primitives";
import { Checkbox } from "@/components/ui";
import { prisma } from "@/lib/prisma";

type CollectionSnippetSelectorProps = {
  collectionId: string;
};

export async function CollectionSnippetSelector({
  collectionId,
}: CollectionSnippetSelectorProps) {
  const snippets = await prisma.snippet.findMany({
    where: {
      collections: {
        none: {
          collectionId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <form action={addCollectionSnippets.bind(null, collectionId)}>
      <Grid
        col={{ mobile: 1, tablet: 2, laptop: 3 }}
        rowGap={{ mobile: 3, tablet: 4 }}
        columnGap={{ mobile: 2, tablet: 5 }}
      >
        {snippets.map((snippet) => (
          <Checkbox
            key={snippet.id}
            name="snippetIds"
            value={snippet.id}
            label={snippet.title}
          />
        ))}
      </Grid>

      <button type="submit">Add Selected</button>
    </form>
  );
}
