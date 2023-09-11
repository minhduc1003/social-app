import { call, put, CallEffect } from "redux-saga/effects";
import { getUser } from "./authApi";
import { user } from "./type";
import { updateUser } from "@/redux/feature/authSlice";

export default function* handleGetUser() {
  try {
    const res: user = yield call(getUser);
    yield put(updateUser(res.data));
  } catch (error) {
    console.log(error);
  }
}
