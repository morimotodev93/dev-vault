// components/icon/ui/ChevronDown.tsx
import clsx from "clsx";

type ChevronDownProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function ChevronDownIcon({
  className,
  width = 24,
  height = 24,
}: ChevronDownProps) {
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
        "lucide lucide-chevron-down-icon lucide-chevron-down",
        className,
      )}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
