import type { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  errorMessage?: string;
}
