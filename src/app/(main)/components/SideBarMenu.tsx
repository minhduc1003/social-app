"use client";
import style from "../styles/sideBarMenu.module.scss";
import { MenuLink } from "./MenuLink";
import { menu } from "../types/menuLinkType";
import { appSelecter } from "@/redux/configureStore";

const SideBarMenu = () => {
  const { menuActive } = appSelecter((state) => state.global);
  const { user } = appSelecter((state) => state.auth);
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
      to: `/profile/${user?._id}`,
    },
    {
      id: 3,
      name: `Friend Request ${user?.notification && user?.notification.length > 0 ? `(${user?.notification.length})` : ""}`,
      icon: ``,
      to: `/friendRequest/${user?._id}`,
    },
    {
      id: 4,
      name: "Logout",
      icon: ``,
      to: "",
    },
  ];
  return (
    <aside className={`${style.aside} ${menuActive ? style.active : ""}`}>
      <MenuLink navLinks={menus}></MenuLink>
    </aside>
  );
};

export default SideBarMenu;
