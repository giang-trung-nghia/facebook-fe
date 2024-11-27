import React from "react";
import FbUserCardItem from "./FbUserCardItem";
import {Box, Button, Typography} from "@mui/material";

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
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      border: "2px solid #ccc",
      borderRadius: "8px",
    }}>
      <Box sx={{display:"flex", flexDirection: "row", alignItems: "center", justifyContent:"space-between", p: "8px 16px"}}>
        <Typography>Maybe you know this people</Typography>
        <Button variant={'text'}>See mores</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
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
    </Box>
  );
};

export default FbUserCardList;
