import clsx from "clsx";
import NextLink from "next/link";
import styles from "./Link.module.css";
import type { LinkProps } from "./Link.types";

export function Link({
  href,
  children,
  variant = "default",
  appearance = "default",
  size = "base",
  weight = "normal",
  underline = "hover",
  external = false,
  className,
  ...props
}: LinkProps) {
  const isExternal = external || href.startsWith("http");

  const classNames = clsx(
    styles.link,
    styles[`variant-${variant}`],
    styles[`appearance-${appearance}`],
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    underline === true && styles.underline,
    underline === "hover" && styles.underlineHover,
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
