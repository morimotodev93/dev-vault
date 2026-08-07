// hooks/useBreakpoint.ts

import { BREAKPOINT } from "@/constants";
import { useMediaQuery } from "./useMediaQuery";

export function useBreakpoint() {
  const isTablet = useMediaQuery(`(min-width:${BREAKPOINT.tablet}px)`);

  const isLaptop = useMediaQuery(`(min-width:${BREAKPOINT.laptop}px)`);

  const isDesktop = useMediaQuery(`(min-width:${BREAKPOINT.desktop}px)`);

  const isWide = useMediaQuery(`(min-width:${BREAKPOINT.wide}px)`);

  return {
    isTablet,
    isLaptop,
    isDesktop,
    isWide,
  };
}
