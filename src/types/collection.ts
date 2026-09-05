// src/types/collection.ts

import {
  COLLECTION_CATEGORY_VALUES,
  COLLECTION_INTEREST_VALUES,
  COLLECTION_LANGUAGE_VALUES,
  COLLECTION_PRACTICALITY_VALUES,
  COLLECTION_PRIORITY_VALUES,
} from "@/constants";
import type { Prisma } from "@/generated/prisma/client";
import { z } from "zod";

export const collectionFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),

  description: z.string().max(2000).optional(),

  category: z
    .string()
    .trim()
    .refine(
      (value) =>
        COLLECTION_CATEGORY_VALUES.includes(
          value as (typeof COLLECTION_CATEGORY_VALUES)[number],
        ),
      "Category is invalid",
    ),

  language: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        COLLECTION_LANGUAGE_VALUES.includes(
          value as (typeof COLLECTION_LANGUAGE_VALUES)[number],
        ),
      "Language is invalid",
    ),

  frameworks: z
    .array(z.string().trim().min(1, "Framework cannot be empty"))
    .default([]),

  favorite: z.boolean().default(false),

  priority: z
    .number()
    .int()
    .refine(
      (value) =>
        (COLLECTION_PRIORITY_VALUES as readonly number[]).includes(value),
      "Priority is invalid",
    )
    .default(0),

  interest: z
    .number()
    .int()
    .refine(
      (value) =>
        (COLLECTION_INTEREST_VALUES as readonly number[]).includes(value),
      "Interest is invalid",
    )
    .default(0),

  practicality: z
    .number()
    .int()
    .refine(
      (value) =>
        (COLLECTION_PRACTICALITY_VALUES as readonly number[]).includes(value),
      "Practicality is invalid",
    )
    .default(0),
});

export interface CollectionCardItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  language?: string;
  frameworks: string[];
  favorite: boolean;
  priority: number;
  interest: number;
  practicality: number;
  updatedAt: Date;
}

export interface CollectionDetailMetadataItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  language: string | null;
  frameworks: Prisma.JsonValue;
  favorite: boolean;
  priority: number;
  interest: number;
  practicality: number;
}

export interface CollectionSearchParams {
  query?: string;
  category?: string;
  language?: string;
  priority?: string;
  interest?: string;
  practicality?: string;
  favorite?: string;
  sort?: string;
}

export type CollectionFormInput = z.input<typeof collectionFormSchema>;

export type CollectionFormValues = z.output<typeof collectionFormSchema>;
