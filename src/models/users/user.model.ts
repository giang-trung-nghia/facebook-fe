import { Gender } from "../../utils/enum/app.enum";
import { IRelationship } from "../relationship/relationship.model";

export interface IBaseUser {
  id: string;
  name: string;
  profilePicture?: string;
}

export interface IUser extends IBaseUser {
  email?: string;
  phone?: string;
  dob?: Date | null;
  gender?: Gender;
  location?: string;
  workAt?: string;
  university?: string;
}

export interface IFriendOfUser extends IUser {
  mutualFriends?: number;
  relationship: IRelationship;
}

export interface IStrangeUser extends IBaseUser {
  mutualFriends: number;
  isAdded: boolean;
  relationshipId?: string;
}

export interface IAddFriendOffer extends IBaseUser {
  mutualFriends: number;
  relationship: IRelationship;
}
