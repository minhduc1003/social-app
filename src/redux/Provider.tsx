"use client";
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./configureStore";
import { useRouter } from "next/navigation";
import { getCookies } from "@/utils/cookies";
const RootProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const cookies = getCookies();
  useEffect(() => {
    if (!cookies) {
      router.push("/login");
    }
  }, [cookies, router]);
  return <Provider store={store}>{children}</Provider>;
};

export default RootProvider;
