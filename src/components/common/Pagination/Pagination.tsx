import clsx from "clsx";
import Link from "next/link";

import styles from "./Pagination.module.css";
import type { PaginationProps } from "./Pagination.types";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

function generatePagination(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);

    return [1, "ellipsis", ...rightRange];
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex);

  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}

export function Pagination({
  currentPage,
  totalPages,
  searchParams,
  siblingCount = 1,
  size = "md",
  showLabels = false,
  className,
  ...props
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = generatePagination(currentPage, totalPages, siblingCount);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const createPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    return `/snippets?${params.toString()}`;
  };

  return (
    <nav
      className={clsx(styles.wrapper, styles[`size-${size}`], className)}
      aria-label="Pagination"
      {...props}
    >
      {/* Prev */}
      <div>
        {canGoPrev ? (
          <Link
            href={createPageHref(currentPage - 1)}
            className={clsx(styles.item, styles.navButton)}
            aria-label="Previous page"
          >
            <span aria-hidden="true">←</span>
            {showLabels && <span className={styles.label}>Prev</span>}
          </Link>
        ) : (
          <span
            className={clsx(styles.item, styles.navButton, styles.disabled)}
            aria-disabled="true"
            aria-label="Previous page"
          >
            <span aria-hidden="true">←</span>
            {showLabels && <span className={styles.label}>Prev</span>}
          </span>
        )}
      </div>

      {/* Page numbers */}
      <ul className={styles.list}>
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`} className={styles.ellipsis}>
                …
              </li>
            );
          }

          const isActive = page === currentPage;

          return (
            <li key={page}>
              {isActive ? (
                <span
                  className={clsx(styles.item, styles.active)}
                  aria-current="page"
                  aria-label={`Page ${page}`}
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={createPageHref(page)}
                  className={styles.item}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* Next */}
      <div>
        {canGoNext ? (
          <Link
            href={createPageHref(currentPage + 1)}
            className={clsx(styles.item, styles.navButton)}
            aria-label="Next page"
          >
            {showLabels && <span className={styles.label}>Next</span>}
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span
            className={clsx(styles.item, styles.navButton, styles.disabled)}
            aria-disabled="true"
            aria-label="Next page"
          >
            {showLabels && <span className={styles.label}>Next</span>}
            <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </nav>
  );
}
