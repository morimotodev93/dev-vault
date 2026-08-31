// components/Header/headerScrollController.ts
"use client";

import { useEffect, useState } from "react";

export function useHeaderScrollController() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > previousScrollY && currentScrollY > 100) {
        setHidden(true);
      } else if (currentScrollY < previousScrollY) {
        setHidden(false);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { hidden };
}
