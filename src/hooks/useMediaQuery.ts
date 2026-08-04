// hooks/useMediaQuery.ts
import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook (React 18+ / Next.js 対応)
 * 2026年時点の推奨実装（useSyncExternalStore）
 */
export function useMediaQuery(
  query: string,
  serverDefault: boolean = false, // SSR時のデフォルト（hydration mismatch 防止）
): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      // クライアントでのみ実行される想定だが、念のためガード
      if (typeof window === "undefined") {
        return () => {};
      }

      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", callback);

      return () => {
        mediaQueryList.removeEventListener("change", callback);
      };
    },
    [query],
  );

  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return serverDefault;
    }
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => serverDefault;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
