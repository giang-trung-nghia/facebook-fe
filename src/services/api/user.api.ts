import { IPagingRequest } from "../../models/base/PagingRequest.model";
import { IPagingResponse } from "../../models/base/PagingResponse.model";
import { IUser, IFriendOfUser } from "../../models/users/user.model";
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
    `/user/paging?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}` +
      `${body.sort ? `&sort=${body.sort}` : ""}` +
      `${body.sortBy ? `&sortBy=${body.sortBy}` : ""}` +
      `${body.searchKey ? `&searchKey=${body.searchKey}` : ""}` +
      `${body.searchBy ? `&searchBy=${body.searchBy}` : ""}`
  );
};

export const getFriends = async (
  id: string,
  body: IPagingRequest
): Promise<IPagingResponse<IFriendOfUser>> => {
  return await getApi(`/user/friends?id=${id}` +
    `&pageNumber=${body.pageNumber}` +
    `&pageSize=${body.pageSize}`
  )
};

export const getAddFriendOffers = async (
  id: string,
  body: IPagingRequest
): Promise<IPagingResponse<IFriendOfUser>> => {
  return await getApi(
    `/user/add-friend-offers?id=${id}` +
      `&pageNumber=${body.pageNumber}` +
      `&pageSize=${body.pageSize}`
  );
};

export const getStrangePeople = async (
  id: string,
  body: IPagingRequest
): Promise<IPagingResponse<IUser>> => {
  return await getApi(
    `/user/strange-people?id=${id}` +
      `&pageNumber=${body.pageNumber}` +
      `&pageSize=${body.pageSize}`
  );
};
