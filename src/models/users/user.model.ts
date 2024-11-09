export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  dob?: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
