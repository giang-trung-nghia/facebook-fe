import React from "react";
import { ListContactUser } from "./FbListContactUser";
import { Avatar, Typography } from "@mui/material";

export const RightSidebar = () => {
  return (
    <div className="w-full p-4">
      <div className="session border-t-2 pt-1 mt-4">
        <ListContactUser />
      </div>
      <div className="session border-t-2 pt-1 mt-4">
        Group chat
        <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200">
          <Avatar src="" />
          <Typography>Create new group chat</Typography>
        </div>
      </div>
    </div>
  );
};
