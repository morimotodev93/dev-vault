import { ElementType, HTMLAttributes } from "react";

export type SurfacePadding = "none" | "sm" | "md" | "lg" | "xl";
export type SurfaceRadius = "none" | "sm" | "md" | "lg" | "full";
export type SurfaceVariant = "default" | "subtle" | "muted" | "elevated";

export type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  padding?: SurfacePadding;
  radius?: SurfaceRadius;
  variant?: SurfaceVariant;
  bordered?: boolean;
};
