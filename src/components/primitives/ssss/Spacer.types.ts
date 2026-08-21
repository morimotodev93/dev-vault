import type { ComponentPropsWithRef, CSSProperties, ElementType } from "react";

type CSSLength = string | number;

export interface SpacerOwnProps {
  /** 縦横共通またはデフォルトのサイズ */
  size?: CSSLength;
  /** 横幅指定 */
  width?: CSSLength;
  /** 高さ指定 */
  height?: CSSLength;
  /** デスクトップ時のサイズ */
  desktop?: CSSLength;
  /** モバイル時のサイズ */
  mobile?: CSSLength;
  /** 横方向のスペーサーにするか */
  horizontal?: boolean;
  className?: string;
  style?: CSSProperties;
}

// ポリモーフィック対応の型定義
export type SpacerProps<T extends ElementType = "div"> = SpacerOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof SpacerOwnProps | "as">;
