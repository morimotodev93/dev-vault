"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { TagInput } from "@/components/common";
import { Button, Link, Stack } from "@/components/primitives";
import { Checkbox, Input, Select, Textarea } from "@/components/ui";

import {
  SNIPPET_LANGUAGE_OPTIONS,
  SNIPPET_PRIORITY_OPTIONS,
} from "@/constants";

import {
  snippetFormSchema,
  type SnippetFormInput,
  type SnippetFormValues,
} from "@/types/snippet";

import { createSnippet, updateSnippet } from "@/app/snippets/_actions";

interface SnippetFormProps {
  mode?: "create" | "edit";
  snippet?: {
    id: string;
    title: string;
    description: string | null;
    language: string | null;
    framework: string | null;
    tags: string;
    favorite: boolean;
    priority: number;
    code: string;
    memo: string | null;
  };
}

export function SnippetForm({ mode = "create", snippet }: SnippetFormProps) {
  const router = useRouter();

  const cancelHref =
    mode === "edit" && snippet ? `/snippets/${snippet.id}` : "/snippets";

  const form = useForm<SnippetFormInput, unknown, SnippetFormValues>({
    resolver: zodResolver(snippetFormSchema),

    defaultValues: {
      title: snippet?.title ?? "",
      description: snippet?.description ?? "",
      language: snippet?.language ?? "",
      framework: snippet?.framework ?? "",
      tags: snippet?.tags
        ? snippet.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      favorite: snippet?.favorite ?? false,
      priority: snippet?.priority ?? 0,
      code: snippet?.code ?? "",
      memo: snippet?.memo ?? "",
    },
  });

  const onSubmit = async (data: SnippetFormValues) => {
    if (mode === "create") {
      const result = await createSnippet(data);

      if (result.success) {
        router.push(`/snippets/${result.data.id}`);
      }

      return;
    }

    if (mode === "edit" && snippet) {
      const result = await updateSnippet(snippet.id, data);

      if (result.success) {
        router.push(`/snippets/${snippet.id}`);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      event.key === "Enter" &&
      event.target instanceof HTMLInputElement &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <Stack>
        <Input
          label="Title"
          {...form.register("title")}
          error={!!form.formState.errors.title}
          errorMessage={form.formState.errors.title?.message}
        />

        <Textarea
          label="Description"
          {...form.register("description")}
          error={!!form.formState.errors.description}
          errorMessage={form.formState.errors.description?.message}
        />

        {/* Language */}
        <Select
          label="Language"
          options={[...SNIPPET_LANGUAGE_OPTIONS]}
          placeholder="Select language"
          {...form.register("language")}
          error={!!form.formState.errors.language}
          errorMessage={form.formState.errors.language?.message}
        />

        {/* Framework / Library */}
        <Input
          label="Framework / Library"
          placeholder="e.g. React, Next.js, Zod"
          {...form.register("framework")}
          error={!!form.formState.errors.framework}
          errorMessage={form.formState.errors.framework?.message}
        />

        <Textarea
          label="Code"
          {...form.register("code")}
          error={!!form.formState.errors.code}
          errorMessage={form.formState.errors.code?.message}
        />

        <Select
          label="Priority"
          options={[...SNIPPET_PRIORITY_OPTIONS]}
          {...form.register("priority", {
            valueAsNumber: true,
          })}
          error={!!form.formState.errors.priority}
          errorMessage={form.formState.errors.priority?.message}
        />

        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <TagInput
              label="Tags"
              value={field.value ?? []}
              onChange={field.onChange}
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Checkbox
          label="Favorite"
          {...form.register("favorite")}
          error={!!form.formState.errors.favorite}
          errorMessage={form.formState.errors.favorite?.message}
        />

        <Stack direction="row" justify="end" gap={3}>
          <Link href={cancelHref}>Cancel</Link>

          <Button type="submit">
            {mode === "edit" ? "Update Snippet" : "Save Snippet"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
