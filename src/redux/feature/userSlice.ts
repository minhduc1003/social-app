import { user } from "@/app/(Auth)/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type initialState = {
  userData: user;
  isLoadingUserData: boolean;
  filterUser: user[] | [];
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    isLoadingUserData: false,
    filterUser: []
  } as initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<string | string[]>) => { },
    updateUser: (state, action: PayloadAction<user>) => ({
      ...state,
      userData: action.payload,
    }),
    getFilterData: (state, action: PayloadAction<string | string[]>) => { },
    updateFilter: (state, action: PayloadAction<user[]>) => ({
      ...state,
      filterUser: action.payload,
    }),
    setIsLoadingUserData: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingUserData: action.payload,
    }),
  },
});
export const { getUserData, updateUser, setIsLoadingUserData, getFilterData, updateFilter } = userSlice.actions;
export default userSlice.reducer;
