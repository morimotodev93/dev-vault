import { Tag } from "@/components/common";
import {
  Button,
  Container,
  Heading,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";
import clsx from "clsx";
import styles from "./RecentSnippets.module.css";

export function RecentSnippets() {
  return (
    <>
      <Container as="section" className={styles.recentSnippets}>
        <Stack gap={6}>
          <Heading>Recent Snippets</Heading>

          <div className={clsx(styles.snippetsList, "l-auto-grid")}>
            {/* Snippets Card */}
            <Surface radius="sm" bordered className={styles.snippetsCard}>
              <Stack>
                <Heading size="sm">Title</Heading>
                <Text>Description</Text>
                <Stack gap={1}>
                  {/* Language Tag Area*/}
                  <Stack direction="row" gap={1}>
                    <Tag size="sm">Type Script</Tag>
                    <Tag size="sm">Test</Tag>
                  </Stack>
                  {/* Update & Favorit Button Area */}
                  <Stack direction="row" align="center" justify="between">
                    <Text size="sm">Updated: 2026/08/11</Text>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.favoritButton}
                    >
                      ★
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Surface>
            {/* Snippets Card Grid Test */}
            <Surface radius="sm" bordered className={styles.snippetsCard}>
              <Stack>
                <Heading size="sm">Title</Heading>
                <Text>Description</Text>
                <Stack gap={1}>
                  {/* Language Tag Area*/}
                  <Stack direction="row" gap={1}>
                    <Tag size="sm">Type Script</Tag>
                    <Tag size="sm">Test</Tag>
                  </Stack>
                  {/* Update & Favorit Button Area */}
                  <Stack direction="row" align="center" justify="between">
                    <Text size="sm">Updated: 2026/08/11</Text>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.favoritButton}
                    >
                      ★
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Surface>
          </div>
        </Stack>
      </Container>
    </>
  );
}
