"use client";

import { Container, Stack } from "@/components/primitives";
import NextLink from "next/link";
import { useState } from "react";

import styles from "./Header.module.css";
import { HeaderHamburger } from "./HeaderHamburger";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderNavigation } from "./HeaderNavigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container className="h-full">
        <Stack
          className="h-full"
          direction="row"
          align="center"
          justify="between"
        >
          {/* Text Logo */}
          <NextLink className={styles.logoLink} href="/">
            <h1 className={styles.logoText}>Dev Vault</h1>
          </NextLink>

          <div className={styles.headerInner}>
            {/* Tablet */}
            <HeaderNavigation />

            {/* Mobile */}
            <HeaderHamburger
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
          </div>
        </Stack>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && <HeaderMobileMenu />}
    </header>
  );
}
