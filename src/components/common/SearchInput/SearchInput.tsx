"use client";

import { Input } from "@/components/ui";
import clsx from "clsx";
import styles from "./SearchInput.module.css";
import type { SearchInputProps } from "./SearchInput.types";

export function SearchInput({
  size = "md",
  fullWidth = false,
  clearable = true,
  onClear,
  className,
  inputClassName,
  value,
  onChange,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const hasValue = typeof value === "string" && value.length > 0;

  const handleClear = () => {
    onClear?.();
  };

  return (
    <div
      className={clsx(
        styles.wrapper,
        fullWidth && styles.fullWidth,
        styles[`size-${size}`],
        className,
      )}
    >
      {/* Search Icon */}
      <span className={styles.icon} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>

      <Input
        type="search"
        size={size}
        fullWidth
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputClassName={clsx(styles.input, inputClassName)}
        {...props}
      />

      {/* Clear Button */}
      {clearable && hasValue && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
