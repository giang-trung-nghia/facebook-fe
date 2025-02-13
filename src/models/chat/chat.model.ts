import { IBaseUser } from "../users/user.model";

export interface IChat {
  id: string; // conservation id
  members: IChatMember[];
  lastMessageTime: Date;
}

export interface IChatMember extends IBaseUser {
  nickname: string;
}

export interface IMessages {
  id: string;
  content: string;
  createdDate: Date;
}
