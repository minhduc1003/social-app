import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { user } from "../saga/auth/type";

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
    getUser: () => {},
  },
});
export const { updateUser, getUser, updateToken } = auth.actions;
export default auth.reducer;
