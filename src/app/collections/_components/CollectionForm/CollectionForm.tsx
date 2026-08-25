"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { TagInput } from "@/components/common";
import { Button, Link, Stack } from "@/components/primitives";
import { Checkbox, Input, Select, Textarea } from "@/components/ui";

import {
  COLLECTION_CATEGORY_OPTIONS,
  COLLECTION_INTEREST_OPTIONS,
  COLLECTION_LANGUAGE_OPTIONS,
  COLLECTION_PRACTICALITY_OPTIONS,
  COLLECTION_PRIORITY_OPTIONS,
} from "@/constants";

import {
  collectionFormSchema,
  type CollectionFormInput,
  type CollectionFormValues,
} from "@/types/collection";

import { createCollection, updateCollection } from "@/app/collections/_actions";

interface CollectionFormProps {
  mode?: "create" | "edit";
  collection?: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    language: string | null;
    frameworks: string[];
    favorite: boolean;
    priority: number;
    interest: number;
    practicality: number;
  };
}

export function CollectionForm({
  mode = "create",
  collection,
}: CollectionFormProps) {
  const router = useRouter();

  const cancelHref =
    mode === "edit" && collection
      ? `/collections/${collection.id}`
      : "/collections";

  const form = useForm<CollectionFormInput, unknown, CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),

    defaultValues: {
      title: collection?.title ?? "",
      description: collection?.description ?? "",
      category: collection?.category ?? "",
      language: collection?.language ?? "",
      frameworks: collection?.frameworks ?? [],
      favorite: collection?.favorite ?? false,
      priority: collection?.priority ?? 0,
      interest: collection?.interest ?? 0,
      practicality: collection?.practicality ?? 0,
    },
  });

  const onSubmit = async (data: CollectionFormValues) => {
    console.log("Form data:", data);

    if (mode === "create") {
      const result = await createCollection(data);

      console.log("Created Collection:", result);

      if (result.success) {
        router.push(`/collections/${result.data.id}`);
      }

      return;
    }

    if (mode === "edit" && collection) {
      const result = await updateCollection(collection.id, data);

      if (result.success) {
        router.push(`/collections/${collection.id}`);
      }
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

        {/* Category */}
        <Select
          label="Category"
          options={[...COLLECTION_CATEGORY_OPTIONS]}
          placeholder="Select category"
          {...form.register("category")}
          error={!!form.formState.errors.category}
          errorMessage={form.formState.errors.category?.message}
        />

        {/* Language */}
        <Select
          label="Language"
          options={[...COLLECTION_LANGUAGE_OPTIONS]}
          placeholder="Select language"
          {...form.register("language")}
          error={!!form.formState.errors.language}
          errorMessage={form.formState.errors.language?.message}
        />

        {/* Frameworks / Libraries */}
        <Controller
          name="frameworks"
          control={form.control}
          render={({ field, fieldState }) => (
            <TagInput
              label="Frameworks / Libraries"
              value={field.value ?? []}
              onChange={field.onChange}
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        {/* Priority */}
        <Select
          label="Priority"
          options={[...COLLECTION_PRIORITY_OPTIONS]}
          {...form.register("priority", {
            valueAsNumber: true,
          })}
          error={!!form.formState.errors.priority}
          errorMessage={form.formState.errors.priority?.message}
        />

        {/* Interest */}
        <Select
          label="Interest"
          options={[...COLLECTION_INTEREST_OPTIONS]}
          {...form.register("interest", {
            valueAsNumber: true,
          })}
          error={!!form.formState.errors.interest}
          errorMessage={form.formState.errors.interest?.message}
        />

        {/* Practicality */}
        <Select
          label="Practicality"
          options={[...COLLECTION_PRACTICALITY_OPTIONS]}
          {...form.register("practicality", {
            valueAsNumber: true,
          })}
          error={!!form.formState.errors.practicality}
          errorMessage={form.formState.errors.practicality?.message}
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
            {mode === "edit" ? "Update Collection" : "Save Collection"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
