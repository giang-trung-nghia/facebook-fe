import { IPagingRequest } from "../../models/base/pagingRequest.model";
import { IPagingResponse } from "../../models/base/pagingResponse.model";
import { IUser } from "../../models/users/user.model";
import { deleteApi, getApi, postApi, putApi } from "./base.api";

export const getUser = async (id: string): Promise<IUser> => {
  return await getApi(`/user/${id}`);
};

export const insertApi = async (id: string, user: IUser): Promise<IUser> => {
  return await postApi(`/user/${id}`, user);
};

export const updateUser = async (id: string, user: IUser): Promise<IUser> => {
  return await putApi(`/user/${id}`, user);
};

export const deleteUser = async (id: string): Promise<number> => {
  return await deleteApi(`/user/${id}`);
};

export const getUsersPaging = async (
  body: IPagingRequest
): Promise<IPagingResponse<IUser>> => {
  return await getApi(
    `/user/paging?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`+
    `${body.sort ? `&sort=${body.sort}` : ""}`+
    `${body.sortBy ? `&sortBy=${body.sortBy}` : ""}`+
    `${body.searchKey ? `&searchKey=${body.searchKey}` : ""}`+
    `${body.searchBy ? `&searchBy=${body.searchBy}` : ""}`
  );
};
