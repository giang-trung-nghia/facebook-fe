import { getApi } from "./base.api";

export const getUser = async (id: string) => {
  const result = await getApi(`/user/${id}`);
  return result;
};
