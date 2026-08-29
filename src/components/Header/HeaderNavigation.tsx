import { Link, Text } from "@/components/primitives";

import { navigationIconMap } from "@/components/icon/navigation/iconMap";
import { navigationConfig } from "@/constants/Headernavigation";

import clsx from "clsx";
import styles from "./HeaderNavigation.module.css";

export function HeaderNavigation() {
  return (
    <nav className={clsx("h-full", styles.headerNav)}>
      <ul className={clsx("h-full", styles.headerNav__list)}>
        {navigationConfig.headerNav.map((item) => {
          const Icon = item.icon ? navigationIconMap[item.icon] : null;

          return (
            <li
              key={item.id}
              className={clsx(
                "u-flex-column",
                "u-align-center",
                "h-full",
                styles.headerNav__item,
              )}
            >
              <Text size="xs" className={styles.headerNav__label}>
                {item.label}
              </Text>

              <Link
                href={item.href}
                appearance="content"
                className={styles.headerNav__link}
              >
                {Icon && <Icon />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
