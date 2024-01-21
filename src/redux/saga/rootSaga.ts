import { all, fork } from "redux-saga/effects";
import AuthSaga from "./auth/authSaga";
import ArticaleSaga from "./article/articleSaga";
import userSaga from "./getUserById/userSaga";
import filterUserSaga from "./getUserByString/filterUserSaga";

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(ArticaleSaga), fork(userSaga), fork(filterUserSaga)]);
}
