"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { menu } from "../types/menuLinkType";
import style from "../styles/sideBarMenu.module.scss";
import axios from "axios";
import { deleteCookies } from "@/utils/cookies";
import { useRouter } from "next/navigation";
export function MenuLink({ navLinks }: { navLinks: menu }) {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await axios.get('http://localhost:3009/api/user/logout')
    deleteCookies()
    router.push('/login')
  }
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.to;
        if (link.name === "Logout") {
          return (
            <div key={link.name} className={style.menuBlock} onClick={handleLogout}> {link.name}</div>
          )
        } else {
          return (
            <Link
              className={isActive ? `${style.menuActive}` : `${style.menuBlock}`}
              href={link.to}
              key={link.name}
            >
              {link.name}
            </Link>
          )
        }
      })}
    </>
  );
}
