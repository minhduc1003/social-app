import { call, put, CallEffect } from "redux-saga/effects";
import { TArticle } from "./type";
import { updateArticles } from "../../feature/articleSlice";
import { getArticlesApi } from "./articleApi";
type data = {
  data: TArticle;
};
export default function* handleGetArticles() {
  try {
    const res: data = yield call(getArticlesApi);
    yield put(updateArticles(res.data));
  } catch (error) {
    console.log(error);
  }
}
