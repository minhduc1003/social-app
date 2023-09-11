import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TAddNewArticlesAction = {
  isOpenModal: boolean;
  isOpenImage: boolean;
};
export const addNewArticle = createSlice({
  name: "addNewArticle",
  initialState: {
    isOpenImage: false,
    isOpenModal: false,
  } as TAddNewArticlesAction,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenModal: action.payload,
    }),
    openImage: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenImage: action.payload,
    }),
  },
});
export const { openImage, openModal } = addNewArticle.actions;
export default addNewArticle.reducer;
