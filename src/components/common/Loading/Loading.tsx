import clsx from "clsx";
import styles from "./Loading.module.css";
import type { LoadingProps } from "./Loading.types";

export function Loading({
  size = "md",
  variant = "spinner",
  label = "Loading...",
  showLabel = false,
  fullPage = false,
  className,
  ...props
}: LoadingProps) {
  return (
    <div
      className={clsx(
        styles.wrapper,
        fullPage && styles.fullPage,
        styles[`size-${size}`],
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      {...props}
    >
      {variant === "spinner" ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <span className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      )}

      <span className={clsx(styles.label, !showLabel && styles.srOnly)}>
        {label}
      </span>
    </div>
  );
}
