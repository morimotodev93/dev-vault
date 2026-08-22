import { HTMLAttributes, ReactNode } from "react";

export type TagVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "destructive"
  | "outline";
export type TagSize = "sm" | "md" | "lg";
export type TagColor =
  | "default"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "destructive"
  | "info";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: TagVariant;
  /** semantic color; variant の色を上書きする */
  color?: TagColor;
  size?: TagSize;
  /** お気に入りや選択状態などに使う */
  active?: boolean;
  /** クリック可能にする場合 */
  onClick?: () => void;
};
