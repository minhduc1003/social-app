import { getUser } from "@/redux/feature/authSlice";
import handleGetUser from "./autHandler";
import { takeLatest } from "redux-saga/effects";
export default function* AuthSaga() {
  yield takeLatest(getUser.type, handleGetUser);
}
