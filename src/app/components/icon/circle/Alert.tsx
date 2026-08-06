// components/icon/circle/Alert.tsx
import clsx from "clsx";

type CircleProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function AlertIcon({ className, width = 24, height = 24 }: CircleProps) {
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
        "lucide lucide-circle-alert-icon lucide-circle-alert",
        className,
      )}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />{" "}
    </svg>
  );
}
