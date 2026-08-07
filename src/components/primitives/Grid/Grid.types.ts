import type { HTMLAttributes, ReactNode } from "react";

export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  /** 列数（例: 1, 2, 3, 4...） */
  col?: number;
  /** ギャップ（primitives.css の --space-* に対応） */
  gap?: GridGap;
  /** 行方向のギャップだけ変えたい場合（省略時は gap と同じ） */
  rowGap?: GridGap;
  /** 列方向のギャップだけ変えたい場合（省略時は gap と同じ） */
  columnGap?: GridGap;
  children: ReactNode;
  className?: string;
};
