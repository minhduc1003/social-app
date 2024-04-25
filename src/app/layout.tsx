import RootProvider from "@/redux/Provider";
import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Heading from "./(main)/components/Heading";
import NextNProgressClient from "./(main)/components/NextNProgressClient";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social",
  description: "Social app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <RootProvider>{children}</RootProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
