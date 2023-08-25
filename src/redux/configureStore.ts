import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./feature/globalSlice";
import logger from "redux-logger";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const reducer = combineReducers({
  global: globalSlice,
});
export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger),
});
export type rootState = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;
export const appSelecter: TypedUseSelectorHook<rootState> = useSelector;
