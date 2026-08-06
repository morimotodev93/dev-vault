// components/icon/navigation/Code.tsx
import clsx from "clsx";

type IconProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function CodeIcon({ className, width = 24, height = 24 }: IconProps) {
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
      className={clsx("lucide lucide-code-icon lucide-code", className)}
    >
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />{" "}
    </svg>
  );
}
