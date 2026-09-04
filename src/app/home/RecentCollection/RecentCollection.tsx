import { Heading, Link, Stack } from "@/components/primitives";
import clsx from "clsx";
import styles from "./RecentCollection.module.css";

import { CollectionCard } from "@/app/collections/_components";
import type { CollectionCardItem } from "@/types/collection";

type RecentCollectionsProps = {
  recentCollections: CollectionCardItem[];
};

export function RecentCollection({
  recentCollections,
}: RecentCollectionsProps) {
  return (
    <section className={styles.recentCollections}>
      <Stack gap={6}>
        <Heading>Recent Collections</Heading>

        <div className={clsx(styles.collectionsList, "l-auto-grid")}>
          {recentCollections.map((collection) => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
        </div>

        <Link
          href="/collections"
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
