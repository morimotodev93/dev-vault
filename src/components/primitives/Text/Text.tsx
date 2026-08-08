import clsx from "clsx";
import styles from "./Text.module.css";
import type { TextProps } from "./Text.types";

export function Text({
  as: Component = "p",
  size = "base",
  color = "default",
  weight = "normal",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={clsx(
        styles.text,
        styles[`size-${size}`],
        styles[`color-${color}`],
        styles[`weight-${weight}`],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
