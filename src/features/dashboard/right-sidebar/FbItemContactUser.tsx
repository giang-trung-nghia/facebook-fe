import React, { useEffect, useState } from "react";
import { FBUserBadgeAvatar } from "../../../components/commons/FbUserBadgeAvatar";
import { IFriendOfUser } from "../../../models/users/user.model";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { openChatGlobal, selectChats } from "../../../store/slices/chatSlice";
import { IChat } from "../../../models/chat/chat.model";
import { getChatByRelationshipId } from "../../../services/api/chat.api";

interface ItemContactUserProp {
  friend: IFriendOfUser;
}

export const FbItemContactUser: React.FC<ItemContactUserProp> = ({
  friend,
}) => {
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
  
  const handleClick = async () => {
    // call to get conservation id from relationship id
    const friendChat = await getChatByRelationshipId(friend.relationship.id);
    const existingChat = chats.find((chat) => chat.id == friendChat.id);

    if (!existingChat) {
      const newChat: IChat = {
        id: friendChat.id,
        members: [
          {
            id: friend.id,
            nickname: friend.name,
            name: friend.name,
            profilePicture: friend.profilePicture,
          },
        ],
        name: friend.name,
        lastMessageTime: new Date(),
      };
      
      dispatch(openChatGlobal(newChat));
    }
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200"
      onClick={handleClick}
    >
      <FBUserBadgeAvatar alt={friend.name} avatarUrl={friend.profilePicture} />
      <Typography> {friend.name}</Typography>
    </div>
  );
};
