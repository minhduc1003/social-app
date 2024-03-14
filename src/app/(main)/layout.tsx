'use client'
import { ReactNode } from "react";
import Heading from "./components/Heading";
import SideBarMenu from "./components/SideBarMenu";
import RootProvider from "@/redux/Provider";
import WrapMainLayout from "./components/homePage/WrapMainLayout";
import NextNProgressClient from "./components/NextNProgressClient";


export default function MainLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <RootProvider>
        <Heading />
        <WrapMainLayout>
          <SideBarMenu />
          <NextNProgressClient>

          {children}
          </NextNProgressClient>
        </WrapMainLayout>
      </RootProvider>
    </>
  );
}
