import { ElementType, HTMLAttributes } from "react";

export type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
export type TextColor = "default" | "muted" | "subtle";
export type TextWeight = "normal" | "medium" | "semibold";

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
};
