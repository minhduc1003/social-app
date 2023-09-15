import { getArticles } from "@/redux/feature/articleSlice";
import { takeLatest } from "redux-saga/effects";
import handleGetArticles from "./articleHandler";
export default function* ArticaleSaga() {
  yield takeLatest(getArticles.type, handleGetArticles);
}
