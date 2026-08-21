"use client";

import { Stack } from "@/components/primitives";
import { Select, Switch } from "@/components/ui";
import {
  SNIPPET_LANGUAGE_OPTIONS,
  SNIPPET_PRIORITY_OPTIONS,
} from "@/constants";
import { updateSearchParam } from "@/lib/navigation/updateSearchParam";
import { useRouter, useSearchParams } from "next/navigation";

export function SnippetFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    </Stack>
  );
}
