import type { HTMLAttributes } from "react";

export type LoadingSize = "sm" | "md" | "lg";
export type LoadingVariant = "spinner" | "dots";

export type LoadingProps = HTMLAttributes<HTMLDivElement> & {
  /** サイズ */
  size?: LoadingSize;
  /** 見た目の種類 */
  variant?: LoadingVariant;
  /** ローディングテキスト（任意） */
  label?: string;
  /** テキストをスクリーンリーダー以外に表示するか */
  showLabel?: boolean;
  /** 親要素いっぱいに中央配置するか */
  fullPage?: boolean;
};
