"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./configureStore";
const RootProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RootProvider;
