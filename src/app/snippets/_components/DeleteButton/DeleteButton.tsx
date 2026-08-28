"use client";

import { useRouter } from "next/navigation";

import { deleteSnippet } from "@/app/snippets/_actions";

import { Button, Stack } from "@/components/primitives";
import styles from "./DeleteButton.module.css";

console.log("DeleteButton styles:", styles);

type DeleteButtonProps = {
  id: string;
};

export function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this snippet?",
    );

    if (!confirmed) {
      return;
    }

    const result = await deleteSnippet(id);

    console.log(result);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    router.push("/snippets");
  };

  return (
    <Button variant="danger" size="md" onClick={handleDelete}>
      <Stack justify="center" align="center">
        Delete
      </Stack>
    </Button>
  );
}
