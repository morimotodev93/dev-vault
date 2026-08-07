import clsx from "clsx";
import type { ElementType } from "react";

import styles from "./Spacer.module.css";
import type { SpacerProps } from "./Spacer.types";

function normalize(value?: string | number): string | undefined {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export function Spacer<T extends ElementType = "div">({
  as,
  size,
  width,
  height,
  desktop,
  mobile,
  horizontal = false,
  className,
  style,
  ...props
}: SpacerProps<T>) {
  const Component = as || "div";

  // CSS変数としてスタイルを注入
  const customProperties = {
    "--spacer-size": normalize(size),
    "--spacer-width": normalize(width),
    "--spacer-height": normalize(height),
    "--spacer-desktop": normalize(desktop),
    "--spacer-mobile": normalize(mobile),
  } as React.CSSProperties;

  return (
    <Component
      className={clsx(
        styles.spacer,
        horizontal ? styles.horizontal : styles.vertical,
        className,
      )}
      style={{
        ...customProperties,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}
