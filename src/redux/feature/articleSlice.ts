import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TArticle } from "../saga/article/type";
type initialState = {
  article: TArticle;
};
export const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
  } as initialState,
  reducers: {
    updateArticles: (state, action: PayloadAction<TArticle>) => ({
      ...state,
      article: action.payload,
    }),
    getArticles: () => {},
  },
});
export const { updateArticles, getArticles } = articleSlice.actions;
export default articleSlice.reducer;
