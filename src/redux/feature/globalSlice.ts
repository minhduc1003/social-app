import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TglobalSlice = {
  menuActive: boolean;
  isDarkMode: boolean;
};
export const global = createSlice({
  name: "global",
  initialState: {
    menuActive: false,
    isDarkMode: false,
  } as TglobalSlice,
  reducers: {
    changeMenuActive: (state, action: PayloadAction<boolean>) => ({
      ...state,
      menuActive: action.payload,
    }),
  },
});
export const { changeMenuActive } = global.actions;
export default global.reducer;
