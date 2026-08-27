import clsx from "clsx";
import styles from "./Grid.module.css";
import type { GridProps } from "./Grid.types";

const BREAKPOINTS = ["mobile", "tablet", "laptop", "desktop", "wide"] as const;

function toCssValue(value: number, useSpaceScale: boolean) {
  return useSpaceScale ? `var(--space-${value})` : value;
}

function getBaseValue(
  value: GridProps["col"] | GridProps["gap"],
  fallback: number,
) {
  return typeof value === "number" ? value : (value?.mobile ?? fallback);
}

function getResponsiveStyle(
  name: "grid-cols" | "grid-gap" | "grid-row-gap" | "grid-column-gap",
  value: GridProps["col"] | GridProps["gap"],
  useSpaceScale: boolean,
  fallback: number,
) {
  if (value === undefined) return {};

  const baseValue = getBaseValue(value, fallback);

  if (typeof value === "number") {
    return {
      [`--${name}`]: toCssValue(value, useSpaceScale),
    };
  }

  let currentValue = baseValue;

  const styles: Record<string, string | number> = {
    [`--${name}`]: toCssValue(baseValue, useSpaceScale),
  };

  for (const breakpoint of BREAKPOINTS) {
    currentValue = value[breakpoint] ?? currentValue;

    styles[`--${name}-${breakpoint}`] = toCssValue(currentValue, useSpaceScale);
  }

  return styles;
}

export function Grid({
  col = 1,
  gap = 4,
  rowGap,
  columnGap,
  className,
  children,
  style,
  ...props
}: GridProps) {
  const hasRowGap = rowGap !== undefined;
  const hasColumnGap = columnGap !== undefined;

  return (
    <div
      className={clsx(
        styles.grid,
        hasRowGap && styles.hasRowGap,
        hasColumnGap && styles.hasColumnGap,
        className,
      )}
      style={
        {
          ...getResponsiveStyle("grid-cols", col, false, 1),
          ...getResponsiveStyle("grid-gap", gap, true, 4),
          ...(hasRowGap &&
            getResponsiveStyle(
              "grid-row-gap",
              rowGap,
              true,
              getBaseValue(gap, 4),
            )),
          ...(hasColumnGap &&
            getResponsiveStyle(
              "grid-column-gap",
              columnGap,
              true,
              getBaseValue(gap, 4),
            )),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
