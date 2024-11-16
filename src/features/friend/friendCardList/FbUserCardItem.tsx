import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

interface FbFriendCardItemProps {
  id: string; // Unique identifier for each friend
  avatarUrl: string;
  friendName: string;
  mutualFriends: number;
  onAddFriend: (id: string) => void; // Pass ID to handle the logic
}

const FbUserCardItem: React.FC<FbFriendCardItemProps> = ({
  id,
  avatarUrl,
  friendName,
  mutualFriends,
  onAddFriend,
}) => {
  const handleAddFriend = () => {
    onAddFriend(id); // Trigger the onAddFriend callback with the friend's ID
  };

  return (
    <Card sx={{ minWidth: "200px", margin: 1 }}>
      <CardMedia
        sx={{ height: 140, width: "200px" }}
        image={avatarUrl}
        title={friendName}
      />
      <CardContent sx={{ p: "0 8px" }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ overflow: "hidden", textWrap: "nowrap" }}
        >
          {friendName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {mutualFriends} mutual friend{mutualFriends > 1 ? "s" : ""}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: "8px" }}>
        <Button size="small" variant="contained" onClick={handleAddFriend}>
          Add Friend
        </Button>
      </CardActions>
    </Card>
  );
};

export default FbUserCardItem;
