"use client";

import { SearchInput } from "@/components/common";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SnippetSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const [value, setValue] = useState(query);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const searchQuery = value.trim();

    if (searchQuery) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }

    // 新しい検索は1ページ目から
    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/snippets?${queryString}` : "/snippets");
  };

  const handleClear = () => {
    setValue("");

    const params = new URLSearchParams(searchParams);

    params.delete("query");
    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/snippets?${queryString}` : "/snippets");
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        name="query"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search snippets..."
        clearable
        onClear={handleClear}
        fullWidth
      />
    </form>
  );
}
