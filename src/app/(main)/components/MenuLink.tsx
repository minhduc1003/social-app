"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { menu } from "../types/menuLinkType";
import style from "../styles/sideBarMenu.module.scss";

export function MenuLink({ navLinks }: { navLinks: menu }) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.to;

        return (
          <Link
            className={isActive ? `${style.menuActive}` : `${style.menuBlock}`}
            href={link.to}
            key={link.name}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
