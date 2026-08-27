import { DeleteButton } from "@/app/collections/_components";
import { Link, Stack } from "@/components/primitives";

import styles from "./CollectionDetailActions.module.css";

type DetailActionsProps = {
  id: string;
};

export function CollectionDetailActions({ id }: DetailActionsProps) {
  return (
    <Stack gap={2} wrap align="center" justify="end" direction="row">
      <DeleteButton id={id} />
      <Link
        href={`/collections/${id}/edit`}
        appearance="content"
        className={styles.linkButton}
      >
        Edit
      </Link>
      <Link
        href="/collections/new"
        appearance="content"
        className={styles.linkButton}
      >
        New Collection
      </Link>
      <Link
        href="/collections"
        appearance="content"
        className={styles.linkButton}
      >
        Collection List
      </Link>
    </Stack>
  );
}
