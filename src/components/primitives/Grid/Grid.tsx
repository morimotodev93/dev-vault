import clsx from "clsx";
import styles from "./Grid.module.css";
import type { GridProps } from "./Grid.types";

const gapToVar = (value?: number) =>
  value === undefined ? undefined : `var(--space-${value})`;

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
          "--grid-cols": col,
          "--grid-gap": gapToVar(gap),
          ...(hasRowGap && { "--grid-row-gap": gapToVar(rowGap) }),
          ...(hasColumnGap && { "--grid-column-gap": gapToVar(columnGap) }),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
