import React from "react";
import style from "../styles/sideBarMenu.module.scss";
import Link from "next/link";
import { MenuLink } from "./MenuLink";
import { menu } from "../types/menuLinkType";

const menus: menu = [
  {
    id: 0,
    name: "Feed",
    icon: ``,
    to: "/",
  },
  {
    id: 1,
    name: "Messages",
    icon: ``,
    to: "/messages",
  },
  {
    id: 2,
    name: "Profile",
    icon: ``,
    to: "/profile",
  },
  {
    id: 3,
    name: "Settings",
    icon: ``,
    to: "/settings",
  },
  {
    id: 4,
    name: "Logout",
    icon: ``,
    to: "",
  },
];

const SideBarMenu = () => {
  return (
    <aside className={style.aside}>
      <MenuLink navLinks={menus}></MenuLink>
    </aside>
  );
};

export default SideBarMenu;
