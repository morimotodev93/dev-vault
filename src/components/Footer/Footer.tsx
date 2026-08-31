import { GithubIcon } from "@/components/icon";
import { Container, Link, Stack, Text } from "@/components/primitives";
import clsx from "clsx";
import styles from "./Footer.module.css";
export function Footer() {
  return (
    <>
      <footer className={clsx("w-full", styles.footer)}>
        <Container>
          <Stack direction="row" gap={6} align="center" justify="center">
            <Link
              external
              aria-label="Dev Vault GitHub repository"
              href="https://github.com/morimotodev93/dev-vault"
            >
              <GithubIcon className={styles.icon} />
            </Link>
            <span className={styles.slash}>/</span>
            <Text color="muted" size="xs">
              Dev Vault
            </Text>
          </Stack>
        </Container>
      </footer>
    </>
  );
}
