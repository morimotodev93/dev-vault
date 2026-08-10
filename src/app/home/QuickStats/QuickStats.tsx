import { Container, Heading, Stack, Text } from "@/components/primitives";
import clsx from "clsx";
import styles from "./QuickStats.module.css";

export function QuickStats() {
  return (
    <>
      <Container
        as="section"
        id="quick-stats"
        className={clsx(styles.stats, "l-auto-grid")}
      >
        {/* Total Snippets */}
        <Stack className={styles.totalSnippets}>
          <Heading size="sm">Total Snippets</Heading>
          <Text size="sm">24</Text>
        </Stack>
        {/* Favorites */}
        <Stack className={styles.favorites}>
          <Heading size="sm">Favorites</Heading>
          <Text size="sm">8</Text>
        </Stack>
      </Container>
    </>
  );
}
