import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  /** サイズ */
  size?: SelectSize;
  /** 幅いっぱい */
  fullWidth?: boolean;
  /** エラー状態 */
  error?: boolean;
  /** エラーメッセージ（任意） */
  errorMessage?: string;
  /** ラベル（任意） */
  label?: ReactNode;
  /** 選択肢 */
  options: SelectOption[];
  /** プレースホルダー（value="" の option） */
  placeholder?: string;
  /** 追加の className（wrapper） */
  className?: string;
  /** select 自体に付与する className */
  selectClassName?: string;
};
