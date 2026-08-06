import { AppNavigation } from "@/types/navigation";

export const navigationConfig: AppNavigation = {
  // デスクトップヘッダーの横並びメニュー
  headerNav: [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: "home",
    },
    {
      id: "snippets",
      label: "All Snippets",
      href: "/snippets",
      icon: "code",
    },
    {
      id: "favorites",
      label: "Favorites",
      href: "/favorites",
      icon: "star",
    },
  ],

  // ハンバーガーメニュー（モバイル・折りたたみ時）のグループ別一覧
  hamburgerNav: [
    {
      id: "main",
      title: "Menu",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/dashboard",
          icon: "home",
        },
        {
          id: "snippets",
          label: "All Snippets",
          href: "/snippets",
          icon: "code",
        },
        {
          id: "categories",
          label: "Categories",
          href: "/categories",
          icon: "folder",
          children: [
            {
              id: "cat-frontend",
              label: "Frontend",
              href: "/categories/frontend",
            },
            {
              id: "cat-backend",
              label: "Backend",
              href: "/categories/backend",
            },
            {
              id: "cat-utility",
              label: "Utilities",
              href: "/categories/utility",
            },
          ],
        },
      ],
    },
    {
      id: "filters",
      title: "Quick Filters",
      items: [
        {
          id: "favorites",
          label: "Favorites",
          href: "/favorites",
          icon: "star",
        },
        {
          id: "priority",
          label: "High Priority",
          href: "/snippets?priority=high",
          icon: "alert-circle",
        },
      ],
    },
    {
      id: "system",
      title: "Preferences",
      items: [
        {
          id: "settings",
          label: "Settings",
          href: "/settings",
          icon: "settings",
        },
        {
          id: "docs",
          label: "Documentation",
          href: "/docs",
          icon: "help-circle",
          isExternal: true,
        },
      ],
    },
  ],

  // HeaderやMenu内で最も目立たせる「アクションボタン」
  actionButton: {
    id: "new-snippet",
    label: "New Snippet",
    href: "/snippets/new",
    icon: "plus",
  },
};
