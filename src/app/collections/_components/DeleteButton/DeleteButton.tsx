"use client";

import { useRouter } from "next/navigation";

import { deleteCollection } from "@/app/collections/_actions";
import { Button } from "@/components/primitives";

type DeleteButtonProps = {
  id: string;
};

export function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this collection?",
    );

    if (!confirmed) {
      return;
    }

    const result = await deleteCollection(id);

    if (result.success) {
      router.push("/collections");
    }
  };

  return (
    <Button variant="danger" size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
}
