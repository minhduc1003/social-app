import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./feature/globalSlice";
import logger from "redux-logger";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "./feature/authSlice";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import articleSlice from "./feature/articleSlice";
import modalSlice from "./feature/modal";
import userSlice from "./feature/userSlice";
const reducer = combineReducers({
  global: globalSlice,
  auth: authSlice,
  modal: modalSlice,
  article: articleSlice,
  user: userSlice,
});
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;
export type rootState = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;
export const appSelecter: TypedUseSelectorHook<rootState> = useSelector;
