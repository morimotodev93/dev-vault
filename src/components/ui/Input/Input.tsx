"use client";

import clsx from "clsx";
import { useId } from "react";
import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

export function Input({
  size = "md",
  fullWidth = false,
  error = false,
  errorMessage,
  label,
  className,
  inputClassName,
  id,
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div
      className={clsx(styles.wrapper, fullWidth && styles.fullWidth, className)}
    >
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={error && errorMessage ? errorId : undefined}
        className={clsx(
          styles.input,
          styles[size],
          error && styles.error,
          inputClassName,
        )}
        {...props}
      />

      {error && errorMessage && (
        <p id={errorId} className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
