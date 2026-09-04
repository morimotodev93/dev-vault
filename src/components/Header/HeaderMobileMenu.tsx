import { navigationIconMap } from "@/components/icon/navigation/iconMap";
import { Stack, Text } from "@/components/primitives";
import { navigationConfig } from "@/constants/Headernavigation";
import clsx from "clsx";
import NextLink from "next/link";
import styles from "./HeaderMobileMenu.module.css";

type HeaderMobileMenuProps = {
  onNavigate: () => void;
};
export function HeaderMobileMenu({ onNavigate }: HeaderMobileMenuProps) {
  return (
    <>
      {/* Menu */}
      <nav className={styles.menu} aria-label="Mobile navigation">
        <Stack gap={6}>
          {/* Link */}
          <ul className={styles.list}>
            {navigationConfig.headerNav.map((item) => {
              const Icon = item.icon ? navigationIconMap[item.icon] : null;
              return (
                <li key={item.id} className={styles.item}>
                  <NextLink
                    href={item.href}
                    onClick={onNavigate}
                    className={clsx(styles.link)}
                  >
                    {Icon && <Icon className={styles.icon} />}
                    <Text className={styles.label}>{item.label}</Text>
                  </NextLink>
                </li>
              );
            })}
          </ul>
          {/* Action Button */}
          <ul className={styles.list}>
            {navigationConfig.actionButton.map((item) => {
              const Icon = item.icon ? navigationIconMap[item.icon] : null;
              return (
                <li key={item.id} className={styles.item}>
                  <NextLink
                    href={item.href}
                    onClick={onNavigate}
                    className={clsx(styles.link, styles.action)}
                  >
                    {Icon && <Icon className={styles.icon} />}
                    <Text className={styles.label}>{item.label}</Text>
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </Stack>
      </nav>
    </>
  );
}
