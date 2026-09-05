// constants/headerNavigation.ts

import type { AppNavigation } from "@/types/navigation";

export const navigationConfig: AppNavigation = {
  headerNav: [
    {
      id: "snippets",
      label: "Snippets",
      href: "/snippets",
      icon: "code",
    },
    {
      id: "collections",
      label: "Collections",
      href: "/collections",
      icon: "folder",
    },
    {
      id: "about",
      label: "About",
      href: "/about",
      icon: "user",
    },
  ],

  hamburgerNav: [
    {
      id: "main",
      title: "Menu",
      items: [
        {
          id: "snippets",
          label: "Snippets",
          href: "/snippets",
          icon: "code",
        },
        {
          id: "collections",
          label: "Collections",
          href: "/collections",
          icon: "folder",
        },
        {
          id: "about",
          label: "About",
          href: "/about",
          icon: "user",
        },
      ],
    },
  ],

  actionButton: [
    {
      id: "new-snippet",
      label: "New Snippet",
      href: "/snippets/new",
      icon: "plus",
    },
    {
      id: "new-collection",
      label: "New Collection",
      href: "/collections/new",
      icon: "plus",
    },
  ],
};
