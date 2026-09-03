// app/snippets/_components/SnippetSort/SnippetSort.tsx
"use client";

import { Select } from "@/components/ui";
import { DEFAULT_SNIPPET_SORT, SNIPPET_SORT_OPTIONS } from "@/constants";
import { updateSearchParam } from "@/lib/navigation/updateSearchParam";
import { useRouter, useSearchParams } from "next/navigation";

export function SnippetSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      value={searchParams.get("sort") ?? DEFAULT_SNIPPET_SORT}
      options={[...SNIPPET_SORT_OPTIONS]}

      onChange={(event) =>
        updateSearchParam(
          router,
          searchParams,
          "/snippets",
          "sort",
          event.target.value === DEFAULT_SNIPPET_SORT ? "" : event.target.value,
        )
      }
    />
  );
}
