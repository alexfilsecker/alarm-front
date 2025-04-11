import { createSlice } from "@reduxjs/toolkit";

import { getUserInfo, saveRefreshToken, saveToken } from "../../../utils/auth";

import login from "./authActions";

export type UserInfo = {
  username: string;
};

type AuthState = {
  userInfo: UserInfo | null;
  loadingAuth: boolean;
  authErrorMessage: string | null;
};

const initialState: AuthState = {
  userInfo: getUserInfo(),
  loadingAuth: false,
  authErrorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loadingAuth = true;
      state.authErrorMessage = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      saveToken(action.payload.token);
      saveRefreshToken(action.payload.refreshToken);
      state.userInfo = getUserInfo();
      state.loadingAuth = false;
      state.authErrorMessage = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loadingAuth = false;
      if (action.payload !== undefined) {
        state.authErrorMessage = action.payload.message;
      }
    });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
