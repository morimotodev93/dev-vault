"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, Stack } from "@/components/primitives";
import { Input, Select, Textarea } from "@/components/ui";

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
    language: string;
    framework: string | null;
    category: string | null;
    tags: string;
    favorite: boolean;
    priority: number;
    code: string;
    memo: string | null;
  };
}

export function SnippetForm({ mode = "create", snippet }: SnippetFormProps) {
  const router = useRouter();

  const form = useForm<SnippetFormInput, unknown, SnippetFormValues>({
    resolver: zodResolver(snippetFormSchema),

    defaultValues: {
      title: snippet?.title ?? "",
      description: snippet?.description ?? "",
      language: snippet?.language ?? "",
      framework: snippet?.framework ?? "",
      category: snippet?.category ?? "",
      tags: snippet?.tags ?? "",
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

      return;
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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

        <Select
          label="Language"
          options={[
            { value: "typescript", label: "TypeScript" },
            { value: "javascript", label: "JavaScript" },
            { value: "css", label: "CSS" },
            { value: "html", label: "HTML" },
            { value: "python", label: "Python" },
            { value: "sql", label: "SQL" },
          ]}
          placeholder="Select language"
          {...form.register("language")}
          error={!!form.formState.errors.language}
          errorMessage={form.formState.errors.language?.message}
        />

        <Textarea
          label="Code"
          {...form.register("code")}
          error={!!form.formState.errors.code}
          errorMessage={form.formState.errors.code?.message}
        />

        <Select
          label="Priority"
          options={[
            { value: "0", label: "Low" },
            { value: "3", label: "Medium" },
            { value: "5", label: "High" },
          ]}
          {...form.register("priority", {
            valueAsNumber: true,
          })}
          error={!!form.formState.errors.priority}
          errorMessage={form.formState.errors.priority?.message}
        />

        <Input
          label="Tags"
          {...form.register("tags")}
          error={!!form.formState.errors.tags}
          errorMessage={form.formState.errors.tags?.message}
        />

        <Stack direction="row" justify="end" gap={3}>
          <Button variant="secondary" type="button">
            Cancel
          </Button>

          <Button type="submit">
            {mode === "edit" ? "Update Snippet" : "Save Snippet"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
