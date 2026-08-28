import { DeleteButton } from "@/app/collections/_components";
import { Link, Stack } from "@/components/primitives";
import { LinkButton } from "@/components/ui";

import styles from "./CollectionDetailActions.module.css";

type DetailActionsProps = {
  id: string;
};

export function CollectionDetailActions({ id }: DetailActionsProps) {
  return (
    <Stack gap={2} wrap align="center" justify="end" direction="row">
      <DeleteButton id={id} />
      <LinkButton size="sm" weight="medium" href={`/collections/${id}/edit`}>
        Edit
      </LinkButton>
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
