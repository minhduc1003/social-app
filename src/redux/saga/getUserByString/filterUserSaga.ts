import { takeLatest } from "redux-saga/effects";
import { getFilterData } from "@/redux/feature/userSlice";
import handleGetUserByString from "./userHandler";

export default function* filterUserSaga() {
  yield takeLatest(getFilterData.type, handleGetUserByString);
}
