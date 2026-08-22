// components/icon/ui/ChevronLeft.tsx
import clsx from "clsx";

type ChevronsLeftProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function ChevronsLeftIcon({
  className,
  width = 24,
  height = 24,
}: ChevronsLeftProps) {
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
        "lucide lucide-chevrons-left-icon lucide-chevrons-left",
        className,
      )}
    >
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </svg>
  );
}
