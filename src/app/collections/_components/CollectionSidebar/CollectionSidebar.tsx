"use client";

import { CollectionFilter } from "@/app/collections/_components/CollectionFilter";
import { CollectionSearch } from "@/app/collections/_components/CollectionSearch";
import { CollectionSort } from "@/app/collections/_components/CollectionSort";
import { ChevronsLeftIcon, ChevronsRightIcon } from "@/components/icon";
import { Stack, Surface } from "@/components/primitives";
import clsx from "clsx";
import { useState } from "react";
import styles from "./CollectionSidebar.module.css";

export function CollectionSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={styles.aside}>
      {/* Sidebar Toggle */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="collection-sidebar"
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
        id="collection-sidebar"
        className={clsx(styles.collectionContent, isOpen && styles.open)}
      >
        <Stack gap={6} className={styles.collectionControl}>
          <CollectionSearch />
          <CollectionFilter />
          <CollectionSort />
        </Stack>
      </div>
    </aside>
  );
}
