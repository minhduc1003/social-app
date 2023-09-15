import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TModalsAction = {
  isOpenModal: boolean;
  isOpenImage: boolean;
  isOpenAddArticle: boolean;
  isOpenChangeDetailProfile: boolean;
  isOpenBasicInfo: boolean;
};
export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenImage: false,
    isOpenModal: false,
    isOpenAddArticle: false,
    isOpenChangeDetailProfile: false,
    isOpenBasicInfo: false,
  } as TModalsAction,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenModal: action.payload,
    }),
    openImage: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenImage: action.payload,
    }),
    openAddArticle: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenAddArticle: action.payload,
    }),
    openChangeDetailProfile: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenChangeDetailProfile: action.payload,
    }),
    openBasicInfo: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenBasicInfo: action.payload,
    }),
  },
});
export const {
  openImage,
  openModal,
  openAddArticle,
  openChangeDetailProfile,
  openBasicInfo,
} = modalSlice.actions;
export default modalSlice.reducer;
