// components/icon/util/Plus.tsx
import clsx from "clsx";

type IconProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function PlusIcon({ className, width = 24, height = 24 }: IconProps) {
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
      className={clsx("lucide lucide-plus-icon lucide-plus", className)}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />{" "}
    </svg>
  );
}
