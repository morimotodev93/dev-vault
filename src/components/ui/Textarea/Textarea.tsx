"use client";

import clsx from "clsx";
import { useId } from "react";
import styles from "./Textarea.module.css";
import type { TextareaProps } from "./Textarea.types";

export function Textarea({
  size = "md",
  fullWidth = false,
  error = false,
  errorMessage,
  label,
  className,
  textareaClassName,
  id,
  disabled,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <div
      className={clsx(styles.wrapper, fullWidth && styles.fullWidth, className)}
    >
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={error && errorMessage ? errorId : undefined}
        className={clsx(
          styles.textarea,
          styles[size],
          error && styles.error,
          textareaClassName,
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
