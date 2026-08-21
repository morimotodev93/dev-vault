// components/icon/ui/ChevronRight.tsx
import clsx from "clsx";

type ChevronRightProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function ChevronRightIcon({
  className,
  width = 24,
  height = 24,
}: ChevronRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(
        "lucide lucide-chevrons-right-icon lucide-chevrons-right",
        className,
      )}
    >
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </svg>
  );
}
