import clsx from "clsx";
import styles from "./Surface.module.css";
import type { SurfaceProps } from "./Surface.types";

export function Surface({
  as: Component = "div",
  padding = "md",
  radius = "md",
  variant = "default",
  bordered = false,
  className,
  children,
  ...props
}: SurfaceProps) {
  return (
    <Component
      className={clsx(
        styles.surface,
        styles[`padding-${padding}`],
        styles[`radius-${radius}`],
        styles[`variant-${variant}`],
        bordered && styles.bordered,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
