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

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  /** お気に入りや選択状態などに使う */
  active?: boolean;
  /** クリック可能にする場合 */
  onClick?: () => void;
};
