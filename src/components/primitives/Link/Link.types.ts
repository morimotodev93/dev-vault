import { AnchorHTMLAttributes, ReactNode } from "react";

export type LinkVariant = "default" | "muted" | "subtle" | "primary" | "button";

export type LinkSize = "sm" | "base" | "lg";
export type LinkWeight = "normal" | "medium" | "semibold";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
  size?: LinkSize;
  weight?: LinkWeight;
  underline?: boolean | "hover";
  external?: boolean;
};
