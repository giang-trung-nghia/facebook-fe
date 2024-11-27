import { IUser } from "../../../models/users/user.model";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export interface AuthState {
  user: IUser | null;
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

interface Logout {
  type: typeof LOGOUT;
  payload: {};
}

export type AuthActionTypes =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | Logout;
