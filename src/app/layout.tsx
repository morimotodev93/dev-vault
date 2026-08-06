import { jakarta, jetbrains } from "@/lib/fonts";
import {
  notoSansJP,
  notoSansKR,
  notoSansSC,
  notoSansTC,
} from "@/lib/fonts.cjk";
import "@/styles/global.css";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Vault",
  description: "Your personal knowledge base for reusable code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        jakarta.variable,
        jetbrains.variable,
        notoSansJP.variable,
        notoSansKR.variable,
        notoSansSC.variable,
        notoSansTC.variable,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
