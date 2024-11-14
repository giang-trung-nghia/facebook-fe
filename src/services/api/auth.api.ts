import { IToken } from "../../models/auth/token.model";
import { postApi } from "./base.api";

export const postSignIn = async (
  email: string,
  password: string
): Promise<IToken> => {
  return await postApi("auth/sign-in", {
    email,
    password,
  });
};

export const signUp = async (body: any) => {
  return await postApi("auth/sign-up", body);
};

export const logOut = async (refreshToken: string) => {
  return await postApi("auth/sign-out", refreshToken);
};

export const postRefreshToken = async (token: IToken): Promise<IToken> => {
  return await postApi("auth/refresh-token", token);
};
