import type { ComponentType } from "react";

import {
  CodeIcon,
  FolderIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "@/components/icon";

import type { NavigationIcon } from "@/types/navigation";

export const navigationIconMap = {
  code: CodeIcon,
  folder: FolderIcon,
  plus: PlusIcon,
  settings: SettingsIcon,
  user: UserIcon,
} satisfies Record<NavigationIcon, ComponentType>;
