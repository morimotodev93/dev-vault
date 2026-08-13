import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

import { SnippetCard } from "@/app/snippets/_components";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
import styles from "./snippet.module.css";

export default async function Snippet() {
  const snippets = await prisma.snippet.findMany();

  return (
    <>
      <Container>
        <Stack gap={8}>
          {/* Snippets List */}
          <Stack gap={6}>
            <Heading as={"h2"} size="lg">
              Snippets List
            </Heading>
            <div className={clsx(styles.snippetsList, "l-auto-grid")}>
              {/* Snippets Card */}
              {snippets.map((snippet) => (
                <SnippetCard key={snippet.id} {...snippet} />
              ))}
            </div>
            <Stack gap={2} align="center" justify="end" direction="row">
              {/* New Snippets */}
              <Link href="/snippets/new">
                <Surface radius="md" bordered>
                  <Stack justify="center" align="center">
                    <Text>New Snippet</Text>
                  </Stack>
                </Surface>
              </Link>
            </Stack>
          </Stack>
          <Spacer />
        </Stack>
      </Container>
    </>
  );
}
