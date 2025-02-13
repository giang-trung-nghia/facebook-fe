import { IChat } from "../../models/chat/chat.model";
import { getApi, postApi } from "./base.api";

export const getChat = async (id: string): Promise<IChat> => {
  return await getApi(`/conservation/${id}`);
};

export const getChatByRelationshipId = async (id: string): Promise<IChat> => {
  return await getApi(`/conservation/relationship/${id}`);
};

export const createChatByRelationshipId = async (id: string): Promise<IChat> => {
  return await postApi(`/conservation`, {});
};
