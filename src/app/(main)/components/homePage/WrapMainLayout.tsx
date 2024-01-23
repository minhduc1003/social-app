"use client";
import React, { ReactNode, useEffect } from "react";
import style from "../../styles/homePageStyle/homePage.module.scss";
import { appSelecter } from "@/redux/configureStore";
import { useDispatch } from "react-redux";
import { dispatchType } from "@/redux/configureStore";
import { getArticles } from "@/redux/feature/articleSlice";
import { usePathname } from "next/navigation";
const WrapMainLayout = ({ children }: { children: ReactNode }) => {
  const { menuActive } = appSelecter((state) => state.global);
  const pathname = usePathname();
  const dispartch = useDispatch<dispatchType>();
  useEffect(() => {
    dispartch(getArticles());
  }, []);
  return (
    <main
      className={`${style.wrapper} ${pathname === "/" || pathname.includes("/messages") || pathname.includes('/friendRequest') ? style.col3 : style.col2
        } ${menuActive ? style.menuActive : ""}`}
    >
      {children}
    </main>
  );
};

export default WrapMainLayout;
