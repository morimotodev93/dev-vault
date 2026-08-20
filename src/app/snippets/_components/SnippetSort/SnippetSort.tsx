// app/snippets/_components/SnippetSort/SnippetSort.tsx
"use client";

import { Select } from "@/components/ui";
import { updateSearchParam } from "@/lib/navigation/updateSearchParam";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_SORT = "newest";

export function SnippetSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      value={searchParams.get("sort") ?? DEFAULT_SORT}
      options={[
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
        { value: "priority", label: "Priority" },
        { value: "updated", label: "Recently Updated" },
      ]}
      onChange={(event) =>
        updateSearchParam(
          router,
          searchParams,
          "sort",
          event.target.value === DEFAULT_SORT ? "" : event.target.value,
        )
      }
    />
  );
}
