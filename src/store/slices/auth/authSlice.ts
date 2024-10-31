import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthActionTypes,
  AuthState,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import { AppState } from "../..";

const initialState: AuthState = {
  user: null,
  isLogin: false,
  accessToken: "",
  refreshToken: "",
  isLoading: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case LOGIN_FAILURE: {
      return { ...state, isLoading: false, accessToken: "", refreshToken: "" };
    }
    case LOGOUT: {
      return {
        ...state,
        accessToken: "",
        refreshToken: "",
        isLogin: false,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      return { ...state, user: action.payload };
    },
    clearAuth: () => initialState,
  },
});

export const selectUser = (state: AppState) => state.auth.user;

export const { setAuth, clearAuth } = authSlice.actions;

export const authReducerSlice = authSlice.reducer;
