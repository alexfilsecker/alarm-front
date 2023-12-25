import { createSlice } from '@reduxjs/toolkit';
import login from './authActions';

type AuthState = {
  isAuthenticated: boolean;
  loadingAuth: boolean;
  authErrorMessage: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  loadingAuth: false,
  authErrorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.isAuthenticated = false;
      state.loadingAuth = true;
      state.authErrorMessage = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loadingAuth = false;
      state.authErrorMessage = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('🚀 - action:', action);
      state.isAuthenticated = false;
      state.loadingAuth = false;
      if (action.payload !== undefined && typeof action.payload === 'string') {
        state.authErrorMessage = action.payload;
      }
    });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
