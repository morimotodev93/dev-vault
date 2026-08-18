import clsx from "clsx";

import type { CheckboxProps } from "./Checkbox.types";

import styles from "./Checkbox.module.css";

export function Checkbox({
  label,
  size = "md",
  error = false,
  errorMessage,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id ?? props.name;

  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={checkboxId}
        className={clsx(styles.label, styles[`size-${size}`], {
          [styles.error]: error,
        })}
      >
        <input
          {...props}
          id={checkboxId}
          type="checkbox"
          className={clsx(styles.checkbox, className)}
        />

        {label && <span className={styles.labelText}>{label}</span>}
      </label>

      {error && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
}
