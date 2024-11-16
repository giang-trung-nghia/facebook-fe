import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import FbTabList from "../../components/composit/FbTabList";
import { EWallpaperTab } from "../../utils/enum/wallpaper.enum";
import FbUserCardList from "../friend/friendCardList/FbUserCardList";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import CameraIcon from "../../assets/icons/photo-camera.png";
const listWallpaperTab = [
  { key: EWallpaperTab.POST, label: "Post" },
  { key: EWallpaperTab.ABOUT_ME, label: "About Me" },
  { key: EWallpaperTab.FRIEND, label: "Friend" },
  { key: EWallpaperTab.IMAGE, label: "Image" },
  { key: EWallpaperTab.VIDEO, label: "Video" },
  { key: EWallpaperTab.REEL, label: "Reel" },
  { key: EWallpaperTab.MORE, label: "More" },
];

export const WallpaperInformation: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<EWallpaperTab>(
    EWallpaperTab.POST
  );

  const [showUserList, setShowUserList] = useState<boolean>(false);

  const [friends, setFriends] = useState([
    {
      id: "1",
      avatarUrl: "/path/to/avatar1.jpg",
      friendName: "John Doe",
      mutualFriends: 5,
    },
    {
      id: "2",
      avatarUrl: "/path/to/avatar2.jpg",
      friendName: "Jane Smith",
      mutualFriends: 3,
    },
    {
      id: "3",
      avatarUrl: "/path/to/avatar3.jpg",
      friendName: "Michael Johnson",
      mutualFriends: 2,
    },
    {
      id: "4",
      avatarUrl: "/path/to/avatar4.jpg",
      friendName: "Alice Brown",
      mutualFriends: 6,
    },
    {
      id: "5",
      avatarUrl: "/path/to/avatar5.jpg",
      friendName: "Charlie Lee",
      mutualFriends: 4,
    },
  ]);

  const handleAddFriend = (id: string) => {
    console.log(`Add friend with ID: ${id}`);
    // Implement the logic for adding a friend based on the ID here
  };

  const handleChangeTab = (val: EWallpaperTab) => {
    console.log(setCurrentTab(val));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <Box sx={{ flex: "1" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar
                sx={{ width: "30px", height: "30px", cursor: "pointer" }}
                variant="rounded"
                src={CameraIcon}
              />
            }
          >
            <Avatar
              alt={user?.name}
              src={user?.profilePicture}
              sx={{ width: 150, height: 150 }}
            />
          </Badge>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "2",
            alignItems: "start",
          }}
        >
          <Typography>User name</Typography>
          <Typography>Friend</Typography>
          <AvatarGroup max={5} total={1100}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
            alignItems: "end",
            flex: "1",
          }}
        >
          <Button variant="contained" fullWidth>
            New Post
          </Button>
          <Button variant="contained" fullWidth>
            Edit wallpaper
          </Button>
          <Box>
            <IconButton onClick={() => setShowUserList(!showUserList)}>
              <ArrowDropDownOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {showUserList && (
        <Box sx={{ width: "100%", mt: "8px" }}>
          <FbUserCardList friends={friends} onAddFriend={handleAddFriend} />
        </Box>
      )}
      <Divider sx={{ width: "100%", mt: "2rem", mb: "1rem" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          gap: "1rem",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <FbTabList<EWallpaperTab>
          tabs={listWallpaperTab}
          currentTab={currentTab}
          onChange={handleChangeTab}
        ></FbTabList>
      </Box>
    </>
  );
};
