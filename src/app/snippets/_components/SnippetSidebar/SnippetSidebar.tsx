// SnippetSidebar.tsx
"use client";

import {
  SnippetFilter,
  SnippetSearch,
  SnippetSort,
} from "@/app/snippets/_components";
import { ChevronsLeftIcon, ChevronsRightIcon } from "@/components/icon";
import { Stack, Surface } from "@/components/primitives";
import clsx from "clsx";
import { useState } from "react";
import styles from "./SnippetSidebar.module.css";

export function SnippetSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={styles.aside}>
      {/* Sidebar Toggle */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="snippet-sidebar"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(styles.sidebarToggle, isOpen && styles.open)}
      >
        <Surface
          padding="sm"
          radius="full"
          className={styles.sidebarToggleCircle}
        >
          {isOpen ? (
            <ChevronsRightIcon className={styles.sidebarToggleIcon} />
          ) : (
            <ChevronsLeftIcon className={styles.sidebarToggleIcon} />
          )}
        </Surface>
      </button>

      {/* Sidebar Content */}
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
    </aside>
  );
}
