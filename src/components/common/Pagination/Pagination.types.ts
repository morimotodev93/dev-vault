import type { HTMLAttributes } from "react";

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  /** 現在のページ（1始まり） */
  currentPage: number;
  /** 総ページ数 */
  totalPages: number;
  /** ページ変更時のコールバック */
  onPageChange: (page: number) => void;
  /** 左右に表示する隣接ページ数 */
  siblingCount?: number;
  /** サイズ */
  size?: "sm" | "md" | "lg";
  /** 前へ・次へボタンのラベルを表示するか */
  showLabels?: boolean;
};
