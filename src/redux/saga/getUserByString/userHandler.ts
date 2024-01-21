import { call, put, CallEffect } from "redux-saga/effects";
import { getFilter } from "./filterUserSagaApi";
import { user } from "./type";
import { PayloadAction } from "@reduxjs/toolkit";
import { setIsLoadingUserData, updateFilter } from "@/redux/feature/userSlice";
type data = {
  data: user[];
};
export default function* handleGetUserByString(action: PayloadAction<string>) {
  try {
    yield put(setIsLoadingUserData(true));
    const { payload } = action;
    const res: data = yield call(getFilter, payload);
    yield put(updateFilter(res.data));
    yield put(setIsLoadingUserData(false));
  } catch (error) {
    console.log(error);
  }
}
