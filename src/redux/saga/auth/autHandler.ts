import { call, put, CallEffect } from "redux-saga/effects";
import { getUser } from "./authApi";

import { updateUser } from "@/redux/feature/authSlice";
import { user } from "@/app/(Auth)/types/type";

export default function* handleGetUser() {
  try {
    const res: user = yield call(getUser);
    yield put(updateUser(res.data));
  } catch (error) {
    console.log(error);
  }
}
