import { Heading, Stack, Text } from "@/components/primitives";
import clsx from "clsx";
import styles from "./QuickStats.module.css";

interface QuickStatsProps {
  totalSnippets: number;
  favoriteSnippets: number;
  totalCollections: number;
  favoriteCollections: number;
}

export function QuickStats({
  totalSnippets,
  favoriteSnippets,
  totalCollections,
  favoriteCollections,
}: QuickStatsProps) {
  return (
    <>
      <section id="quick-stats" className={clsx(styles.stats, "l-auto-grid")}>
        {/* Total Snippets */}
        <Stack direction="row" gap={1} className={styles.total}>
          <Heading size="sm">Total Snippets</Heading>
          <Text>{totalSnippets}</Text>
        </Stack>
        {/* Favorite Snippets */}
        <Stack direction="row" gap={1} className={styles.favorites}>
          <Heading size="sm">Favorite Snippets</Heading>
          <Text>{favoriteSnippets}</Text>
        </Stack>
        {/* Total Collections */}
        <Stack direction="row" gap={1} className={styles.total}>
          <Heading size="sm">Total Collections</Heading>
          <Text>{totalCollections}</Text>
        </Stack>
        {/* Favorite Collections */}
        <Stack direction="row" gap={1} className={styles.favorites}>
          <Heading size="sm">Favorite Collections</Heading>
          <Text>{favoriteCollections}</Text>
        </Stack>
      </section>
    </>
  );
}
