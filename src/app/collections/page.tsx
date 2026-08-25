import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

import styles from "./collection.module.css";

export default function Collection() {
  return (
    <>
      <main className={styles.main}>
        <Container>
          <Stack gap={6}>
            <Heading as={"h2"} level={2} size="lg">
              Collection List
            </Heading>
            {/* mobile (Base) */}
            {/* Search, Filter, Sort */}
          </Stack>
          <Spacer mobile={32} desktop={48} />
          {/* Collection Menu */}
          {/* totalCount === 0 ? () */}
          {/* Temporary Button */}
          <Link appearance="content" href="/collections/new">
            <Surface radius="md" bordered>
              <Stack justify="center" align="center">
                <Text size="sm">New Snippet</Text>
              </Stack>
            </Surface>
          </Link>
          <Spacer mobile={48} desktop={80} />
        </Container>
      </main>
    </>
  );
}
