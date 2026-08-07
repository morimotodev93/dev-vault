import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import clsx from "clsx";
import styles from "./Container.module.css";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component {...props} className={clsx(styles.container, className)}>
      {children}
    </Component>
  );
}
