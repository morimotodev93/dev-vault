import clsx from "clsx";
import NextLink from "next/link";
import styles from "./LinkButton.module.css";
import type { LinkButtonProps } from "./LinkButton.types";

export function LinkButton({
  href,
  children,
  variant = "default",
  size = "md",
  weight = "medium",
  radius = "md",
  external = false,
  className,
  ...props
}: LinkButtonProps) {
  const isExternal = external || href.startsWith("http");

  const classNames = clsx(
    styles.linkButton,
    styles[variant],
    styles[size],
    styles[weight],
    styles[`radius-${radius}`],
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classNames} {...props}>
      {children}
    </NextLink>
  );
}
