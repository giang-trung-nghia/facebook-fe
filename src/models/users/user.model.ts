import { Gender } from "../../utils/enum/app.enum";

export interface IUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  profilePicture?: string;
  dob?: Date | null;
  gender?: Gender;
  location?: string;
  workAt?: string;
  university?: string;
}

export interface IStrangeUser {
  id: string;
  name: string;
  profilePicture?: string;
  mutualFriends: number;
  isAdded: boolean;
  relationshipId?: string;
}
