import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /** サイズ */
  size?: InputSize;
  /** 幅いっぱい */
  fullWidth?: boolean;
  /** エラー状態 */
  error?: boolean;
  /** エラーメッセージ（任意） */
  errorMessage?: string;
  /** ラベル（任意） */
  label?: ReactNode;
  /** 追加の className */
  className?: string;
  /** input 自体に付与する className */
  inputClassName?: string;
};
