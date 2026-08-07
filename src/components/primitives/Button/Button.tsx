import clsx from "clsx";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isLoading && styles.isLoading,
        className,
      )}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
}
