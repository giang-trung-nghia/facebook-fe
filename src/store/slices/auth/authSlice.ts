import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { AppState } from "../..";

const initialState: AuthState = {
  user: null,
  isLogin: false,
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    setUser: (state, action: PayloadAction<any>) => {
      return { ...state, user: action.payload };
    },
    clearAuth: () => initialState,
  },
});

export const selectUser = (state: AppState) => state.auth.user;
export const selectAuth = (state: AppState) => state.auth;

export const { setAuth, setUser, clearAuth } = authSlice.actions;

export const authReducerSlice = authSlice.reducer;
