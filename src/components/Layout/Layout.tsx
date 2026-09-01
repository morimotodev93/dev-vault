"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useHeaderScrollController } from "@/components/Header/useHeaderScrollController";
import clsx from "clsx";

import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { hidden } = useHeaderScrollController();

  return (
    <div
      className={clsx(styles.layout, {
        [styles.headerHidden]: hidden,
      })}
    >
      <Header hidden={hidden} />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
