"use client";

type HeaderProps = {
  hidden: boolean;
};

import { Container, Stack } from "@/components/primitives";
import NextLink from "next/link";
import { useState } from "react";

import clsx from "clsx";
import styles from "./Header.module.css";
import { HeaderHamburger, HeaderMobileMenu, HeaderNavigation } from "./index";

export function Header({ hidden }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={clsx(styles.header, {
        [styles.hidden]: hidden,
      })}
    >
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
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <button
            type="button"
            className={styles.overlay}
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Mobile Menu */}
          <HeaderMobileMenu />
        </>
      )}
    </header>
  );
}
