import { all, fork } from "redux-saga/effects";
import AuthSaga from "./auth/authSaga";

export default function* rootSaga() {
  yield all([fork(AuthSaga)]);
}
