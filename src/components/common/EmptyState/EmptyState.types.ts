import type { HTMLAttributes, ReactNode } from "react";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  /** メインタイトル */
  title: string;
  /** 補足説明 */
  description?: string;
  /** 上部に表示するアイコンやイラスト */
  icon?: ReactNode;
  /** 下部に配置するアクション（ボタンなど） */
  action?: ReactNode;
  /** サイズ感 */
  size?: "sm" | "md" | "lg";
};
