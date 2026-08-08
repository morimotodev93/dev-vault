import clsx from "clsx";
import styles from "./Heading.module.css";
import type { HeadingProps } from "./Heading.types";

const defaultTagMap = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export function Heading({
  as,
  level = 2,
  size = "lg",
  color = "default",
  weight = "semibold",
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as ?? defaultTagMap[level];

  return (
    <Component
      className={clsx(
        styles.heading,
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
