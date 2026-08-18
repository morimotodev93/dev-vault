"use client";

import { Stack } from "@/components/primitives";
import { Select, Switch } from "@/components/ui";
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
        options={[
          { value: "", label: "All Languages" },
          { value: "typescript", label: "TypeScript" },
          { value: "javascript", label: "JavaScript" },
          { value: "css", label: "CSS" },
          { value: "html", label: "HTML" },
          { value: "python", label: "Python" },
          { value: "sql", label: "SQL" },
        ]}
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
        options={[
          { value: "", label: "All Priorities" },
          { value: "0", label: "Low" },
          { value: "3", label: "Medium" },
          { value: "5", label: "High" },
        ]}
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
