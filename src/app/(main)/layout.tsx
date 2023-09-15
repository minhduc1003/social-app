import { ReactNode } from "react";
import Heading from "./components/Heading";
import SideBarMenu from "./components/SideBarMenu";
import RootProvider from "@/redux/Provider";
import WrapMainLayout from "./components/homePage/WrapMainLayout";

export default function mainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RootProvider>
        <Heading />
        <WrapMainLayout>
          <SideBarMenu />
          {children}
        </WrapMainLayout>
      </RootProvider>
    </>
  );
}
