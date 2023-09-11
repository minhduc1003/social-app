import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type user =
  | {
      name: string;
      email: string;
      password: string;
      photo: string;
      phone: string;
      bio: string;
      permission: string;
    }
  | undefined;
type TAuthSlice = {
  user: user;
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
export const { updateUser, getUser,updateToken } = auth.actions;
export default auth.reducer;
