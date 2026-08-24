// src/types/snippet.ts

import { SNIPPET_LANGUAGE_VALUES, SNIPPET_PRIORITY_VALUES } from "@/constants";
import { z } from "zod";

export const snippetFormSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(200),

    description: z.string().max(2000).optional(),

    language: z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "" ||
          SNIPPET_LANGUAGE_VALUES.includes(
            value as (typeof SNIPPET_LANGUAGE_VALUES)[number],
          ),
        "Language is invalid",
      ),

    framework: z.string().trim(),

    tags: z.array(z.string().trim().min(1, "Tag cannot be empty")).default([]),

    favorite: z.boolean().default(false),

    priority: z
      .number()
      .int()
      .refine(
        (value) =>
          SNIPPET_PRIORITY_VALUES.includes(
            value as (typeof SNIPPET_PRIORITY_VALUES)[number],
          ),
        "Priority is invalid",
      )
      .default(0),

    code: z.string().min(1, "Code is required"),

    memo: z.string().max(2000).optional(),
  })
  .refine((data) => Boolean(data.language || data.framework), {
    message: "Language or framework is required",
    path: ["language"],
  });

export interface SnippetCardItem {
  id: string;
  title: string;
  description?: string;
  language?: string;
  framework?: string;
  tags: string;
  favorite: boolean;
  updatedAt: Date;
}

export interface SnippetSearchParams {
  query?: string;
  language?: string;
  framework?: string;
  priority?: string;
  tags?: string;
  tagsMode?: string;
  favorite?: string;
  sort?: string;
}

export type SnippetFormInput = z.input<typeof snippetFormSchema>;

export type SnippetFormValues = z.output<typeof snippetFormSchema>;
