import { Heading, Link, Stack } from "@/components/primitives";
import clsx from "clsx";
import styles from "./RecentSnippets.module.css";

import { SnippetCard } from "@/app/snippets/_components";
import type { Snippet } from "@/generated/prisma/client";

type RecentSnippetsProps = {
  recentSnippets: Snippet[];
};

export function RecentSnippets({ recentSnippets }: RecentSnippetsProps) {
  return (
    <section>
      <Stack gap={6}>
        <Heading>Recent Snippets</Heading>

        <div className={clsx(styles.snippetsList, "l-auto-grid")}>
          {recentSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} {...snippet} />
          ))}
        </div>

        <Link
          href="/snippets"
          appearance="content"
          className={clsx("u-self-center", "w-fit")}
        >
          <Heading as={"h3"} color="subtle">
            All View
          </Heading>
        </Link>
      </Stack>
    </section>
  );
}
