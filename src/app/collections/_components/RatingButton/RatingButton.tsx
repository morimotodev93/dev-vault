"use client";

import { updateCollectionRating } from "@/app/collections/_actions/updateCollectionRating";
import { Button } from "@/components/primitives";
import { useState } from "react";

type RatingType = "priority" | "interest" | "practicality";
type RatingValue = 0 | 3 | 5;

interface RatingButtonProps {
  id: string;
  type: RatingType;
  value: number;
}

const ratingLabels = {
  priority: {
    0: "Low",
    3: "Medium",
    5: "High",
  },
  interest: {
    0: "Curious",
    3: "Interested",
    5: "Excited",
  },
  practicality: {
    0: "Optional",
    3: "Useful",
    5: "Essential",
  },
} as const;

function isRatingValue(value: number): value is RatingValue {
  return value === 0 || value === 3 || value === 5;
}

function getNextValue(value: RatingValue): RatingValue {
  if (value === 0) return 3;
  if (value === 3) return 5;

  return 0;
}

export function RatingButton({ id, type, value }: RatingButtonProps) {
  const initialValue: RatingValue = isRatingValue(value) ? value : 0;

  const [currentValue, setCurrentValue] = useState<RatingValue>(initialValue);

  const [isPending, setIsPending] = useState(false);

  const handleToggle = async () => {
    if (isPending) return;

    const nextValue = getNextValue(currentValue);

    setIsPending(true);

    try {
      const result = await updateCollectionRating(id, type, nextValue);

      setCurrentValue(result.value);
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
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
      aria-label={`Change ${type}`}
    >
      {ratingLabels[type][currentValue]}
    </Button>
  );
}
