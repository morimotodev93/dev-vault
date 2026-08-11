import { Heading, Text } from "@/components/primitives";
import clsx from "clsx";
import styles from "./EmptyState.module.css";
import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({
  title,
  description,
  icon,
  action,
  size = "md",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={clsx(styles.wrapper, styles[`size-${size}`], className)}
      role="status"
      {...props}
    >
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={styles.content}>
        <Heading
          level={3}
          size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
          className={styles.title}
        >
          {title}
        </Heading>

        {description && (
          <Text
            size={size === "sm" ? "sm" : "base"}
            color="muted"
            className={styles.description}
          >
            {description}
          </Text>
        )}
      </div>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
