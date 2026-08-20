// SnippetSidebar.tsx
"use client";

import {
  SnippetFilter,
  SnippetSearch,
  SnippetSort,
} from "@/app/snippets/_components";
import { Stack } from "@/components/primitives";
import clsx from "clsx";
import { useState } from "react";
import styles from "./SnippetSidebar.module.css";

export function SnippetSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="snippet-sidebar"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.sidebarToggle}
      >
        {isOpen ? "→" : "←"}
      </button>

      <div
        id="snippet-sidebar"
        className={clsx(styles.snippetContent, isOpen && styles.open)}
      >
        <Stack gap={6} className={styles.snippetControl}>
          <SnippetSearch />
          <SnippetFilter />
          <SnippetSort />
        </Stack>
      </div>
    </>
  );
}
