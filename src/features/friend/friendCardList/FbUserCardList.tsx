import React from "react";
import FbUserCardItem from "./FbUserCardItem";
import { Box } from "@mui/material";

interface FbFriendCardListProps {
  friends: {
    id: string;
    avatarUrl: string;
    friendName: string;
    mutualFriends: number;
  }[];
  onAddFriend: (id: string) => void;
}

const FbUserCardList: React.FC<FbFriendCardListProps> = ({
  friends,
  onAddFriend,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto", // Allow horizontal scrolling
      }}
    >
      {friends.map((friend) => (
        <FbUserCardItem
          key={friend.id} // Use unique id as the key
          id={friend.id}
          avatarUrl={friend.avatarUrl}
          friendName={friend.friendName}
          mutualFriends={friend.mutualFriends}
          onAddFriend={onAddFriend} // Pass the function down
        />
      ))}
    </Box>
  );
};

export default FbUserCardList;
