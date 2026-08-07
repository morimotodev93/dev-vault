import clsx from "clsx";
import styles from "./Stack.module.css";
import type { StackProps } from "./Stack.types";

const gapToVar = (value?: number) =>
  value === undefined ? undefined : `var(--space-${value})`;

const alignClassMap = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
  baseline: styles.alignBaseline,
} as const;

const justifyClassMap = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
  evenly: styles.justifyEvenly,
} as const;

export function Stack({
  direction = "column",
  gap = 4,
  align = "stretch",
  justify = "start",
  wrap = false,
  fullWidth = false,
  className,
  children,
  style,
  ...props
}: StackProps) {
  return (
    <div
      className={clsx(
        styles.stack,
        styles[direction],
        alignClassMap[align],
        justifyClassMap[justify],
        wrap && styles.wrap,
        fullWidth && styles.fullWidth,
        className,
      )}
      style={
        {
          "--stack-gap": gapToVar(gap),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
