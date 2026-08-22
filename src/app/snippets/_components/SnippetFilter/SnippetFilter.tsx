"use client";

import { Button, Stack } from "@/components/primitives";
import { Input, Select, Switch } from "@/components/ui";
import {
  SNIPPET_LANGUAGE_OPTIONS,
  SNIPPET_PRIORITY_OPTIONS,
} from "@/constants";
import { updateSearchParam } from "@/lib/navigation/updateSearchParam";
import { useRouter, useSearchParams } from "next/navigation";

export function SnippetFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("language");
    params.delete("framework");
    params.delete("priority");
    params.delete("tags");
    params.delete("tagsMode");
    params.delete("favorite");
    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/snippets?${queryString}` : "/snippets");
  };

  return (
    <Stack gap={6}>
      {/* Language */}
      <Select
        value={searchParams.get("language") ?? ""}
        options={[...SNIPPET_LANGUAGE_OPTIONS]}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "language",
            event.target.value,
          )
        }
      />

      {/* Framework */}
      <Input
        label="Framework"
        value={searchParams.get("framework") ?? ""}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "framework",
            event.target.value,
          )
        }
      />

      {/* Priority */}
      <Select
        value={searchParams.get("priority") ?? ""}
        options={[...SNIPPET_PRIORITY_OPTIONS]}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "priority",
            event.target.value,
          )
        }
      />

      <Stack direction="row" justify="between" align="center">
        {/* Tags */}
        <Input
          label="Tags Search"
          value={searchParams.get("tags") ?? ""}
          onChange={(event) =>
            updateSearchParam(router, searchParams, "tags", event.target.value)
          }
        />

        {/* Tag Match Mode */}
        <Select
          label="Tag Match"
          showChevron={false}
          value={searchParams.get("tagsMode") ?? "and"}
          options={[
            { value: "and", label: "AND" },
            { value: "or", label: "OR" },
          ]}
          onChange={(event) =>
            updateSearchParam(
              router,
              searchParams,
              "tagsMode",
              event.target.value,
            )
          }
        />
      </Stack>

      <Stack direction="row" justify="between" align="center">
        {/* Favorite */}
        <Switch
          label="Favorite"
          checked={searchParams.get("favorite") === "true"}
          onChange={(event) =>
            updateSearchParam(
              router,
              searchParams,
              "favorite",
              event.target.checked ? "true" : "",
            )
          }
        />

        {/* Clear Button */}
        <Button variant="ghost" onClick={handleClear}>
          Filter Clear
        </Button>
      </Stack>
    </Stack>
  );
}
