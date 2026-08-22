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
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="snippet-sidebar"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(styles.sidebarToggle, isOpen && styles.open)}
      >
        {isOpen ? (
          <Surface
            padding="sm"
            radius="full"
            className={styles.sidebarToggleCircle}
          >
            <ChevronsRightIcon className={styles.sidebarToggleIcon} />
          </Surface>
        ) : (
          <Surface
            padding="sm"
            radius="full"
            className={styles.sidebarToggleCircle}
          >
            <ChevronsLeftIcon className={styles.sidebarToggleIcon} />
          </Surface>
        )}
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
