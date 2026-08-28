import { Link } from "@/components/primitives";
import clsx from "clsx";
import styles from "./LinkButton.module.css";
import type { LinkButtonProps } from "./LinkButton.types";

export function LinkButton({
  href,
  children,
  variant = "default",
  size = "base",
  weight = "normal",
  radius = "md",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      appearance="content"
      underline={false}
      className={clsx(
        styles.linkButton,
        styles[variant],
        styles[size],
        styles[weight],
        styles[`radius-${radius}`],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
