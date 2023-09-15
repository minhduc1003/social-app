import { all, fork } from "redux-saga/effects";
import AuthSaga from "./auth/authSaga";
import ArticaleSaga from "./article/articleSaga";

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(ArticaleSaga)]);
}
