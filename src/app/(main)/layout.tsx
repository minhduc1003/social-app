import { ReactNode } from "react";
import Heading from "./components/Heading";
import SideBarMenu from "./components/SideBarMenu";
import RootProvider from "@/redux/Provider";

export default function mainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RootProvider>
        <Heading />
        {children}
      </RootProvider>
    </>
  );
}
