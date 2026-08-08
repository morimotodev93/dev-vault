import { ElementType, HTMLAttributes } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type HeadingColor = "default" | "muted" | "subtle";
export type HeadingWeight = "medium" | "semibold" | "bold";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: ElementType;
  level?: HeadingLevel; // セマンティクス用（h1〜h6）
  size?: HeadingSize; // 見た目のサイズ
  color?: HeadingColor;
  weight?: HeadingWeight;
};
