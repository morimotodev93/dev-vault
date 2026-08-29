import { MenuIcon, XIcon } from "@/components/icon";
import { Button } from "@/components/primitives";

import styles from "./HeaderHamburger.module.css";

type HeaderHamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function HeaderHamburger({ isOpen, onClick }: HeaderHamburgerProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={styles.button}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      {isOpen ? (
        <XIcon className={styles.icon} />
      ) : (
        <MenuIcon className={styles.icon} />
      )}
    </Button>
  );
}
