import React from "react";
import FbFriendCard from "./FbFriendCard";
import { Box } from "@mui/material";
import {
  IFriendOfUser,
} from "../../../models/users/user.model";
import {
  AddFriendOfferAction,
  FriendAction,
} from "../../../utils/enum/friend.enum";
import { acceptFriendRequest } from "../../../services/api/relationship.api";

interface FriendListProps {
  friends: IFriendOfUser[];
  setFriends: (friends: IFriendOfUser[]) => void;
}

const FbFriendList: React.FC<FriendListProps> = ({ friends, setFriends }) => {
  const handleFriendAction = (action: FriendAction, user: IFriendOfUser) => {
    console.log(`Action: ${action}, Friend: ${user.id}`);
    switch (action) {
      case FriendAction.FAVORITE:
        alert(`Đã thêm ${user.id} vào danh sách yêu thích`);
        break;
      case FriendAction.UNFOLLOW:
        alert(`Đã bỏ theo dõi ${user.id}`);
        break;
      case FriendAction.UNFRIEND:
        alert(`Đã hủy kết bạn với ${user.id}`);
        break;
      case FriendAction.SEND_MESSAGE:
        
      default:
        break;
    }
  };

  const handleAddFriendOfferAction = (
    action: AddFriendOfferAction,
    user: IFriendOfUser
  ) => {
    switch (action) {
      case AddFriendOfferAction.ACCEPT: {
        handleAcceptFriend(user.relationship.id);
        break;
      }
      case AddFriendOfferAction.DENIED:
        break;
      default:
        break;
    }
  };

  const handleAcceptFriend = async (id: string) => {
    await acceptFriendRequest(id).then((res) => {
      const data: IFriendOfUser[] = friends.map((e) => {
        if (e.relationship.id == id) {
          return {
            ...e,
            relationship: {
              ...e.relationship,
              status: res.status,
            },
          };
        } else return e;
      });
      setFriends(data);
    });
  };

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      {friends.map((friend) => (
        <FbFriendCard
          key={friend.id}
          user={friend}
          onAction={handleFriendAction}
          onAddFriendOfferAction={handleAddFriendOfferAction}
        />
      ))}
    </Box>
  );
};

export default FbFriendList;
