"use client";

import clsx from "clsx";

import type { SwitchProps } from "./Switch.types";

import styles from "./Switch.module.css";

export function Switch({
  label,
  size = "md",
  error = false,
  errorMessage,
  className,
  id,
  ...props
}: SwitchProps) {
  const switchId = id ?? props.name;

  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={switchId}
        className={clsx(styles.label, styles[`size-${size}`], {
          [styles.error]: error,
        })}
      >
        <input
          {...props}
          id={switchId}
          type="checkbox"
          role="switch"
          className={clsx(styles.input, className)}
        />

        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>

        {label && <span className={styles.labelText}>{label}</span>}
      </label>

      {error && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
}
