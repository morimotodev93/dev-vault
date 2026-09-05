"use client";

import { toggleFavorite } from "@/app/collections/_actions/toggleFavorite";
import { StarIcon } from "@/components/icon";
import { Button } from "@/components/primitives";
import { useState } from "react";

import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  id: string;
  favorite: boolean;
}

export function FavoriteButton({ id, favorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async () => {
    if (isPending) return;

    const nextFavorite = !isFavorite;

    setIsPending(true);

    try {
      const result = await toggleFavorite(id, nextFavorite);

      setIsFavorite(result.favorite);
    } catch (error) {
      console.error("Failed to update favorite:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      className={styles.favoriteButton}
    >
      <StarIcon
        className={`${styles.favoriteIcon} ${
          isFavorite ? styles.favoriteActive : ""
        }`}
      />
    </Button>
  );
}
