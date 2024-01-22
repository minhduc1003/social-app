import { user } from "@/app/(Auth)/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAuthSlice = {
  user: user | undefined;
  token: string;
};
export const auth = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
  } as TAuthSlice,
  reducers: {
    updateUser: (state, action: PayloadAction<user>) => ({
      ...state,
      user: action.payload,
    }),
    updateToken: (state, action: PayloadAction<string>) => ({
      ...state,
      token: action.payload,
    }),
    getUser: () => { },
  },
});
export const { updateUser, getUser, updateToken } = auth.actions;
export default auth.reducer;
