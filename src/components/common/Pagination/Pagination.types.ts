import type { HTMLAttributes } from "react";

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  /** 現在のページ（1始まり） */
  currentPage: number;
  /** 総ページ数 */
  totalPages: number;

  /** 現在のQuery Parameter */
  searchParams?: string;

  /** ページング先のパス */
  basePath?: string;

  /** 左右に表示する隣接ページ数 */
  siblingCount?: number;
  /** サイズ */
  size?: "sm" | "md" | "lg";
  /** 前へ・次へボタンのラベルを表示するか */
  showLabels?: boolean;
};
