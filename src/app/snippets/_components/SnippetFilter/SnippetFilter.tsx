"use client";

import { Select } from "@/components/ui";
import { useRouter, useSearchParams } from "next/navigation";

export function SnippetFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLanguageChange = (language: string) => {
    const params = new URLSearchParams(searchParams);

    if (language) {
      params.set("language", language);
    } else {
      params.delete("language");
    }

    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/snippets?${queryString}` : "/snippets");
  };

  return (
    // Language
    <Select
      value={searchParams.get("language") ?? ""}
      options={[
        { value: "", label: "ALL Languagees" },
        { value: "typescript", label: "TypeScript" },
        { value: "javascript", label: "JavaScript" },
        { value: "css", label: "CSS" },
        { value: "html", label: "HTML" },
        { value: "python", label: "Python" },
        { value: "sql", label: "SQL" },
      ]}
      onChange={(event) => handleLanguageChange(event.target.value)}
    ></Select>
  );
}
