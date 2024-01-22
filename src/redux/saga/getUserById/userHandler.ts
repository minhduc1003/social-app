import { call, put, CallEffect } from "redux-saga/effects";
import { getUser } from "./userApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { setIsLoadingUserData, updateUser } from "@/redux/feature/userSlice";
import { user } from "@/app/(Auth)/types/type";
type data = {
  data: user;
};
export default function* handleGetUserById(action: PayloadAction<string>) {
  try {
    yield put(setIsLoadingUserData(true));
    const { payload } = action;
    const res: data = yield call(getUser, payload);
    yield put(updateUser(res.data));
    yield put(setIsLoadingUserData(false));
  } catch (error) {
    console.log(error);
  }
}
