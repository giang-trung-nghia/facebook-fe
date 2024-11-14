import { IUser } from "../../models/users/user.model";
import { getApi } from "./base.api";

export const getUser = async (id: string): Promise<IUser> => {
  return await getApi(`/user/${id}`);
};
