"use client";
import { Select } from "@/components/ui";
import {
  COLLECTION_SORT_OPTIONS,
  DEFAULT_COLLECTION_SORT,
} from "@/constants/collection";
import { updateSearchParam } from "@/lib/navigation/updateSearchParam";
import { useRouter, useSearchParams } from "next/navigation";

export function CollectionSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      value={searchParams.get("sort") ?? DEFAULT_COLLECTION_SORT}
      options={[...COLLECTION_SORT_OPTIONS]}

      onChange={(event) =>
        updateSearchParam(
          router,
          searchParams,
          "/collections",
          "sort",
          event.target.value === DEFAULT_COLLECTION_SORT
            ? ""
            : event.target.value,
        )
      }
    />
  );
}
