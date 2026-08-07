import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 見た目のバリエーション */
  variant?: ButtonVariant;
  /** サイズ */
  size?: ButtonSize;
  /** 幅いっぱいにする */
  fullWidth?: boolean;
  /** ローディング状態（将来拡張用） */
  isLoading?: boolean;
  /** 子要素 */
  children: ReactNode;
  /** 追加のclassName（clsxでマージ） */
  className?: string;
};
