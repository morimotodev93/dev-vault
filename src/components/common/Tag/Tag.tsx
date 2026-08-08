import clsx from "clsx";
import styles from "./Tag.module.css";
import type { TagProps } from "./Tag.types";

export function Tag({
  children,
  variant = "default",
  size = "md",
  active = false,
  onClick,
  className,
  ...props
}: TagProps) {
  const isInteractive = typeof onClick === "function";

  return (
    <span
      className={clsx(
        styles.tag,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        active && styles.active,
        isInteractive && styles.interactive,
        className,
      )}
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </span>
  );
}
