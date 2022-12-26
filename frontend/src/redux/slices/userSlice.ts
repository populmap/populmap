import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userStateType {
  email: string;
  exp: number;
  iat: number;
  loginType: string;
  userId: number;
  userName: string;
  pageSelected: number;
}

const initialState: userStateType = {
  email: "",
  exp: -1,
  iat: -1,
  loginType: "",
  userId: -1,
  userName: "",
  pageSelected: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfoUpdate: (state, action: PayloadAction<userStateType>) => {
      return action.payload;
    },
    userPageSelected: (state, action: PayloadAction<number>) => {
      state.pageSelected = action.payload;
    },
    userInitialize: () => {
      return initialState;
    },
  },
});

export const { userInfoUpdate, userInitialize, userPageSelected } =
  userSlice.actions;
export default userSlice.reducer;
