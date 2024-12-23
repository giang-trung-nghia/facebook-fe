import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import UserAvtDefault from "../../../assets/icons/user.png";
import CloseIcon from "@mui/icons-material/Close";
import { IStrangeUser } from "../../../models/users/user.model";

interface FbFriendCardItemProps {
  user: IStrangeUser;
  onAddFriend: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onCancelAddFriend: (user: IStrangeUser) => void;
}

const FbUserKnowableCardItem: React.FC<FbFriendCardItemProps> = ({
  user,
  onAddFriend,
  onRemoveItem,
  onCancelAddFriend,
}) => {
  const handleAddFriend = () => {
    onAddFriend(user.id);
  };

  const handleCancelAddFriend = () => {
    user && onCancelAddFriend(user);
  };

  const removeItem = () => {
    onRemoveItem(user.id);
  };

  return (
    <Card sx={{ minWidth: "160px", margin: 1, boxShadow: 3 }}>
      <CardMedia
        sx={{ height: 140, width: "160px", position: "relative" }}
        image={user.profilePicture ?? UserAvtDefault}
        title={user.name}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: "0.5rem",
            top: "0.5rem",
            background: "#33333388",
            color: "#dddddddd",
          }}
          size="small"
          onClick={removeItem}
        >
          <CloseIcon />
        </IconButton>
      </CardMedia>
      <CardContent sx={{ p: "4px 8px" }}>
        <Typography
          gutterBottom
          variant="body1"
          sx={{ overflow: "hidden", textWrap: "nowrap" }}
        >
          {user.name}
        </Typography>
        <div className="h-5">
          {user.mutualFriends != 0 && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {user.mutualFriends} mutual friend
              {user.mutualFriends > 1 ? "s" : ""}
            </Typography>
          )}
        </div>
      </CardContent>
      <CardActions sx={{ px: "8px" }}>
        {user.isAdded ? (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleCancelAddFriend}
            startIcon={<PersonRemoveIcon />}
          >
            Cancel
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={handleAddFriend}
            startIcon={<PersonAddIcon />}
          >
            Add Friend
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default FbUserKnowableCardItem;
