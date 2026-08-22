"use client";

import { ChevronDownIcon } from "@/components/icon";
import clsx from "clsx";
import { useId } from "react";
import styles from "./Select.module.css";
import type { SelectProps } from "./Select.types";

export function Select({
  size = "md",
  color = "default",
  showChevron = true,
  chevronSize = size,
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
            styles[`color-${color}`],
            showChevron && styles.withChevron,
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

        {showChevron && (
          <span
            className={clsx(styles.chevron, styles[`chevron-${chevronSize}`])}
            aria-hidden="true"
          >
            <ChevronDownIcon />
          </span>
        )}
      </div>

      {error && errorMessage && (
        <p id={errorId} className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
