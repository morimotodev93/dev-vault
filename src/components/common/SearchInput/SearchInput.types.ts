import type { InputProps } from "@/components/ui/Input/Input.types";

export type SearchInputProps = Omit<InputProps, "type" | "label"> & {
  /** クリアボタンを表示するか（値があるとき） */
  clearable?: boolean;
  /** クリア時のコールバック */
  onClear?: () => void;
};
