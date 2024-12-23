import { IPagingRequest } from "../../models/base/PagingRequest.model";
import { IPagingResponse } from "../../models/base/PagingResponse.model";
import {
  ICreateRelationship,
  IRelationship,
} from "../../models/relationship/relationship.model";
import { deleteApi, getApi, postApi, putApi } from "./base.api";

export const getRelationship = async (id: string): Promise<IRelationship> => {
  return await getApi(`/relationship/${id}`);
};

export const createRelationship = async (
  relationship: ICreateRelationship
): Promise<IRelationship> => {
  return await postApi(`/relationship`, relationship, undefined, true);
};

export const updateRelationship = async (
  id: string,
  relationship: IRelationship
): Promise<IRelationship> => {
  return await putApi(`/relationship/${id}`, relationship);
};

export const deleteRelationship = async (id: string): Promise<number> => {
  return await deleteApi(`/relationship/${id}`, true);
};

export const getRelationshipsPaging = async (
  body: IPagingRequest
): Promise<IPagingResponse<IRelationship>> => {
  return await getApi(
    `/user/paging?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}` +
      `${body.sort ? `&sort=${body.sort}` : ""}` +
      `${body.sortBy ? `&sortBy=${body.sortBy}` : ""}` +
      `${body.searchKey ? `&searchKey=${body.searchKey}` : ""}` +
      `${body.searchBy ? `&searchBy=${body.searchBy}` : ""}`
  );
};

export const acceptFriendRequest = async (id: string): Promise<IRelationship> => {
  return await putApi(`/relationship/accept-friend?id=${id}`, null);
};
