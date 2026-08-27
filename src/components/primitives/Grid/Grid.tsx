import clsx from "clsx";
import styles from "./Grid.module.css";
import type { GridBreakpoint, GridProps } from "./Grid.types";

const breakpoints: GridBreakpoint[] = [
  "mobile",
  "tablet",
  "laptop",
  "desktop",
  "wide",
];

const valueToVar = (value: number | undefined, useSpaceScale = false) =>
  value === undefined
    ? undefined
    : useSpaceScale
      ? `var(--space-${value})`
      : value;

function getResponsiveStyle(
  name: "grid-cols" | "grid-gap" | "grid-row-gap" | "grid-column-gap",
  value: GridProps["col"] | GridProps["gap"],
  useSpaceScale = false,
) {
  if (value === undefined) return {};

  if (typeof value === "number") {
    return { [`--${name}`]: valueToVar(value, useSpaceScale) };
  }

  let currentValue: number | undefined;

  return Object.fromEntries(
    breakpoints.map((breakpoint) => {
      currentValue = value[breakpoint] ?? currentValue;
      return [
        `--${name}-${breakpoint}`,
        valueToVar(currentValue, useSpaceScale),
      ];
    }),
  );
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
          ...getResponsiveStyle("grid-cols", col),
          ...getResponsiveStyle("grid-gap", gap, true),
          ...(hasRowGap && getResponsiveStyle("grid-row-gap", rowGap, true)),
          ...(hasColumnGap &&
            getResponsiveStyle("grid-column-gap", columnGap, true)),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
