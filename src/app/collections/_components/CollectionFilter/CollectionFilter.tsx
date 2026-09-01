"use client";

import { Button, Stack } from "@/components/primitives";
import { Select, Switch } from "@/components/ui";
import {
  COLLECTION_CATEGORY_OPTIONS,
  COLLECTION_INTEREST_OPTIONS,
  COLLECTION_LANGUAGE_OPTIONS,
  COLLECTION_PRACTICALITY_OPTIONS,
  COLLECTION_PRIORITY_OPTIONS,
} from "@/constants/collection";

import { updateSearchParam } from "@/lib/navigation/updateSearchParam";
import { useRouter, useSearchParams } from "next/navigation";

export function CollectionFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("category");
    params.delete("language");
    params.delete("priority");
    params.delete("interest");
    params.delete("practicality");
    params.delete("favorite");

    const queryString = params.toString();

    router.push(queryString ? `/collections?${queryString}` : "/collections");
  };

  return (
    <Stack>
      {/* Category */}
      <Select
        value={searchParams.get("category") ?? ""}
        options={[...COLLECTION_CATEGORY_OPTIONS]}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "/collections",
            "category",
            event.target.value,
          )
        }
      />

      {/* Language */}
      <Select
        value={searchParams.get("language") ?? ""}
        options={[...COLLECTION_LANGUAGE_OPTIONS]}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "/collections",
            "language",
            event.target.value,
          )
        }
      />

      {/* Priority */}
      <Select
        value={searchParams.get("priority") ?? ""}
        options={[...COLLECTION_PRIORITY_OPTIONS]}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "/collections",
            "priority",
            event.target.value,
          )
        }
      />

      {/* Interest */}
      <Select
        value={searchParams.get("interest") ?? ""}
        options={[...COLLECTION_INTEREST_OPTIONS]}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "/collections",
            "interest",
            event.target.value,
          )
        }
      />

      {/* Practicality */}
      <Select
        value={searchParams.get("practicality") ?? ""}
        options={[...COLLECTION_PRACTICALITY_OPTIONS]}
        onChange={(event) =>
          updateSearchParam(
            router,
            searchParams,
            "/collections",
            "practicality",
            event.target.value,
          )
        }
      />

      <Stack direction="row" wrap justify="between" align="center">
        {/* Favorite */}
        <Switch
          label="Favorite"
          checked={searchParams.get("favorite") === "true"}
          onChange={(event) =>
            updateSearchParam(
              router,
              searchParams,
              "/collections",
              "favorite",
              event.target.checked ? "true" : "",
            )
          }
        />

        {/* Clear Button */}
        <Button size="sm" onClick={handleClear}>
          Filter Clear
        </Button>
      </Stack>
    </Stack>
  );
}
