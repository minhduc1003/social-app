import { call, put, CallEffect } from "redux-saga/effects";
import { getUser } from "./authApi";

import { updateUser } from "@/redux/feature/authSlice";
import { user } from "@/app/(Auth)/types/type";
type data = {
  data: user;
};
export default function* handleGetUser() {
  try {
    const res: data = yield call(getUser);
    yield put(updateUser(res.data));
  } catch (error) {
    console.log(error);
  }
}
