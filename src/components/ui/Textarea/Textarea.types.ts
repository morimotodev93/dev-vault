import type { ReactNode, TextareaHTMLAttributes } from "react";

export type TextareaSize = "sm" | "md" | "lg";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** サイズ（主に padding / font-size） */
  size?: TextareaSize;
  /** 幅いっぱい */
  fullWidth?: boolean;
  /** エラー状態 */
  error?: boolean;
  /** エラーメッセージ（任意） */
  errorMessage?: string;
  /** ラベル（任意） */
  label?: ReactNode;
  /** 追加の className（wrapper） */
  className?: string;
  /** textarea 自体に付与する className */
  textareaClassName?: string;
};
