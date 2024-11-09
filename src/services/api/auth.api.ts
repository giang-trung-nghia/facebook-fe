import { IToken } from "../../models/auth/token.model";
import { postApi } from "./base.api";

export const postSignIn = async (
  email: string,
  password: string
): Promise<IToken> => {
  return await postApi(`auth/sign-in`, {
    email,
    password,
  });
};

export const postSignUp = async (body: any) => {
  return await postApi(`auth/sign-up`, body);
};
