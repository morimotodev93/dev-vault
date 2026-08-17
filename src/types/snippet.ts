// src/types/snippet.ts

import { z } from "zod";
export const snippetFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),

  description: z.string().max(2000).optional(),

  language: z.string().min(1, "Language is required"),

  framework: z.string().optional(),

  category: z.string().optional(),

  tags: z.array(z.string().trim().min(1, "Tag cannot be empty")).default([]),

  favorite: z.boolean().default(false),

  priority: z.number().int().min(0).max(5).default(0),

  code: z.string().min(1, "Code is required"),

  memo: z.string().max(2000).optional(),
});

export interface SnippetCardItem {
  id: string;
  title: string;
  description?: string;
  language: string;
  tags: string;
  favorite: boolean;
  updatedAt: Date;
}

export type SnippetFormInput = z.input<typeof snippetFormSchema>;

export type SnippetFormValues = z.output<typeof snippetFormSchema>;
