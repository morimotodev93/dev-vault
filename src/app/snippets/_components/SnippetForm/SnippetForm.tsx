"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Stack } from "@/components/primitives";
import { Input, Select, Textarea } from "@/components/ui";

import {
  snippetFormSchema,
  type SnippetFormInput,
  type SnippetFormValues,
} from "@/types/snippet";

import { createSnippet } from "@/app/snippets/_actions/createSnippet";

export function SnippetForm() {
  const form = useForm<SnippetFormInput, unknown, SnippetFormValues>({
    resolver: zodResolver(snippetFormSchema),

    defaultValues: {
      title: "",
      description: "",
      language: "",
      framework: "",
      category: "",
      tags: "",
      favorite: false,
      priority: 0,
      code: "",
      memo: "",
    },
  });

  const onSubmit = async (data: SnippetFormValues) => {
    await createSnippet(data);
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

        <Textarea label="Description" {...form.register("description")} />

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
        />

        <Input label="Tags" {...form.register("tags")} />

        <Stack direction="row" justify="end" gap={3}>
          <Button type="button" variant="secondary">
            Cancel
          </Button>

          <Button type="submit">Save Snippet</Button>
        </Stack>
      </Stack>
    </form>
  );
}
