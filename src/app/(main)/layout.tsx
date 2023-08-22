import { ReactNode } from "react";
import Heading from "./components/Heading";
import SideBarMenu from "./components/SideBarMenu";

export default function mainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Heading />
      <main style={{ display: "flex", overflow: "visible" }}>
        <SideBarMenu />
        {children}
      </main>
    </>
  );
}
