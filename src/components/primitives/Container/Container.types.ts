import type { ComponentPropsWithRef, ElementType } from "react";

export type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, "as">;
