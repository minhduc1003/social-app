"use client";
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./configureStore";
import { useRouter } from "next/navigation";
import { getCookies } from "@/utils/cookies";
const RootProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const handleGetCookies = async()=>{
    try {
      await getCookies()
    } catch (error) {
      router.push("/login");      
    }
  }
  useEffect(() => {
    handleGetCookies()
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default RootProvider;
