import type { HTMLAttributes, ReactNode } from "react";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";

export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  /** 並び方向 */
  direction?: StackDirection;
  /** アイテム間のギャップ（--space-*） */
  gap?: StackGap;
  /** 交差軸の揃え */
  align?: StackAlign;
  /** 主軸の揃え */
  justify?: StackJustify;
  /** 折り返しを許可するか */
  wrap?: boolean;
  /** 幅いっぱい */
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};
