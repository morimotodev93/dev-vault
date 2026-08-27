"use client";

import { deleteCollectionSnippet } from "@/app/collections/_actions";
import { Button } from "@/components/primitives";

type RemoveCollectionSnippetButtonProps = {
  collectionId: string;
  collectionSnippetId: string;
};

export function RemoveCollectionSnippetButton({
  collectionId,
  collectionSnippetId,
}: RemoveCollectionSnippetButtonProps) {
  const handleRemove = async () => {
    const confirmed = window.confirm(
      "Remove this snippet from the collection?",
    );

    if (!confirmed) {
      return;
    }

    await deleteCollectionSnippet(collectionId, collectionSnippetId);
  };

  return (
    <Button
      variant="danger"
      size="sm"
      onClick={handleRemove}
      className="u-self-end"
    >
      Remove
    </Button>
  );
}
