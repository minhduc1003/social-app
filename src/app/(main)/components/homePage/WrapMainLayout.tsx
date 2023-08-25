"use client";
import React, { ReactNode } from "react";
import style from "../../styles/homePageStyle/homePage.module.scss";
import { appSelecter } from "@/redux/configureStore";

const WrapMainLayout = ({ children }: { children: ReactNode }) => {
  const { menuActive } = appSelecter((state) => state.global);
  return (
    <main className={`${style.wrapper} ${menuActive ? style.menuActive : ""}`}>
      {children}
    </main>
  );
};

export default WrapMainLayout;
