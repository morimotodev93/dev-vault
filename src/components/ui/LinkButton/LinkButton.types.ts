import type { AnchorHTMLAttributes, ReactNode } from "react";

export type LinkButtonVariant =
  "default" | "muted" | "subtle" | "primary" | "button";

export type LinkButtonSize = "sm" | "base" | "lg";

export type LinkButtonWeight = "normal" | "medium" | "semibold";

export type LinkButtonRadius = "none" | "sm" | "md" | "lg" | "full";

export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  weight?: LinkButtonWeight;
  radius?: LinkButtonRadius;
};
