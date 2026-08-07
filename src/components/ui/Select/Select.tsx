"use client";

import clsx from "clsx";
import { useId } from "react";
import styles from "./Select.module.css";
import type { SelectProps } from "./Select.types";

export function Select({
  size = "md",
  fullWidth = false,
  error = false,
  errorMessage,
  label,
  options,
  placeholder,
  className,
  selectClassName,
  id,
  disabled,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div
      className={clsx(styles.wrapper, fullWidth && styles.fullWidth, className)}
    >
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={error && errorMessage ? errorId : undefined}
          className={clsx(
            styles.select,
            styles[size],
            error && styles.error,
            selectClassName,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <span className={styles.chevron} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {error && errorMessage && (
        <p id={errorId} className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
