import React from "react";
import { FBUserBadgeAvatar } from "../../../components/commons/FbUserBadgeAvatar";
import { IUser } from "../../../models/users/user.model";
import { Typography } from "@mui/material";

interface ItemContactUserProp {
  user: IUser;
}

export const FbItemContactUser: React.FC<ItemContactUserProp> = ({ user }) => {
  const handleClick = () => {
    // trigger open chat box by user.id
  } 
  return (
    <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200"
    onClick={handleClick}>
      <FBUserBadgeAvatar alt={user.name} avatarUrl={user.profilePicture} />
      <Typography> {user.name}</Typography>
    </div>
  );
};
