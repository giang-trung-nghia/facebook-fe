import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IFriendOfUser } from "../../../models/users/user.model";
import UserAvtDefault from "../../../assets/icons/user.png";
import {
  AddFriendOfferAction,
  FriendAction,
} from "../../../utils/enum/friend.enum";
import { ERelationshipStatus } from "../../../utils/enum/relationship.enum";

interface FriendCardProps {
  user: IFriendOfUser;
  onAction: (action: FriendAction, user: IFriendOfUser) => void;
  onAddFriendOfferAction: (action: AddFriendOfferAction, user: IFriendOfUser) => void;
}

const FbFriendCard: React.FC<FriendCardProps> = ({
  user,
  onAction,
  onAddFriendOfferAction,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: FriendAction) => {
    onAction(action, user);
    handleCloseMenu();
  };

  const handleAddFriendOfferAction = (action: AddFriendOfferAction) => {
    onAddFriendOfferAction(action, user);
    handleCloseMenu();
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "none",
        backgroundColor: "#fff",
        border: "1px solid #ccc"
      }}
    >
      {/* Avatar và Thông tin */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          image={user.profilePicture ?? UserAvtDefault}
          alt={user.name}
          sx={{
            width: 80,
            height: 80,
            borderRadius: "8px",
            objectFit: "cover",
            marginRight: "12px",
          }}
        />
        <CardContent sx={{ padding: "0 !important" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {user.name}
          </Typography>
         {user.mutualFriends && <Typography variant="body2" color="text.secondary">
            {user.mutualFriends} mutual friend
            {user.mutualFriends > 1 ? "s" : ""}
          </Typography>}
        </CardContent>
      </Box>

      {/* Action Button */}
      {user.relationship.status == ERelationshipStatus.Accepted ? (
        <Box>
          <IconButton onClick={handleOpenMenu}>
            <MoreHorizIcon />
          </IconButton>

          {/* Menu Dropdown */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            <MenuItem onClick={() => handleAction(FriendAction.FAVORITE)}>
              <ListItemIcon>
                <StarBorderIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Favourite</ListItemText>
            </MenuItem>

            <MenuItem onClick={() => handleAction(FriendAction.UNFOLLOW)}>
              <ListItemIcon>
                <UnfoldLessIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Unfollow</ListItemText>
            </MenuItem>

            <MenuItem onClick={() => handleAction(FriendAction.UNFRIEND)}>
              <ListItemIcon>
                <PersonRemoveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Unfriend</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "0.5rem",
            width: "30%"
          }}
        >
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={() =>
              handleAddFriendOfferAction(AddFriendOfferAction.ACCEPT)
            }
          >
            Accept
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() =>
              handleAddFriendOfferAction(AddFriendOfferAction.ACCEPT)
            }
          >
            Cancel
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default FbFriendCard;
