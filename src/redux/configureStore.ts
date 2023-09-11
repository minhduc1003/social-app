import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./feature/globalSlice";
import logger from "redux-logger";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "./feature/authSlice";
import addNewArticleSlice from "./feature/addNewArticleSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
const reducer = combineReducers({
  global: globalSlice,
  auth: authSlice,
  addNewArticle: addNewArticleSlice,
});
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;
export type rootState = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;
export const appSelecter: TypedUseSelectorHook<rootState> = useSelector;
