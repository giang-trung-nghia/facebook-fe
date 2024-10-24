import { postApi } from "./base.api";

export const postSignIn = async (email: string, password: string) => {
  return await postApi(`auth/sign-in`, {
    email,
    password,
  });
};

export const postSignUp = async (email: string, password: string) => {
    return await postApi(`auth/sign-up`, {
      email,
      password,
    });
  };