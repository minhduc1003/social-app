import { takeLatest } from "redux-saga/effects";
import { getUserData } from "@/redux/feature/userSlice";
import handleGetUserById from "./userHandler";
export default function* userSaga() {
  yield takeLatest(getUserData.type, handleGetUserById);
}
