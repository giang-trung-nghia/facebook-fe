import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { FbTabList } from "../../components/composit";
import { EWallpaperTab } from "../../utils/enum/wallpaper.enum";
import FbUserKnowableCardList from "../friend/userKnowableCardList/FbUserKnowableCardList.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../store/slices/auth/authSlice";
import CameraIcon from "../../assets/icons/photo-camera.png";
import FbUserInformationForm from "../friend/userInformationForm/FbUserInformationForm.tsx";
import { useNavigate } from "react-router-dom";
import {
  AboutDashboardRoute,
  WallpaperRoute,
} from "../../routes/wall.route.ts";
import { getFriends, getUser } from "../../services/api/user.api.ts";
import { FriendDashboardRoute } from "../../routes/wallpaper/friend/friend.route.ts";
import { IPagingRequest } from "../../models/base/PagingRequest.model.ts";
import { IFriendOfUser } from "../../models/users/user.model.ts";
import { IPagingResponse } from "../../models/base/PagingResponse.model.ts";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<EWallpaperTab>(
    EWallpaperTab.POST
  );
  const [showEditInformationModal, setShowEditInformationModal] =
    useState(false);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [friends, setFriends] = useState<IPagingResponse<IFriendOfUser>>();
  const [isMe, setIsMe] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await fetchUser();
      await fetchFriends();
    })();
  }, []);
  
    const fetchFriends = async () => {
      const body: IPagingRequest = {
        pageNumber: 1,
        pageSize: 5,
      };
      if (!user) return;
  
      await getFriends(user?.id, body).then((res) => {
        const data: IFriendOfUser[] = res.data.map((e) => {
          return {
            id: e.id,
            profilePicture: e.profilePicture,
            name: e.name,
            relationship: e.relationship,
            mutualFriends: Math.floor(Math.random() * 100),
          };
        });
        setFriends((prev) => ({
          ...prev,
          data,
          total: res.total,
          totalPage: res.totalPage,
          page: res.page,
          pageSize: res.pageSize
        }));
      });
    };

  const fetchUser = async () => {
    if (user) {
      await getUser(user?.id).then((res) => {
        dispatch(setUser(res));
      });
    }
  };

  const handleChangeTab = (val: EWallpaperTab) => {
    setCurrentTab(val);
    switch (val) {
      case EWallpaperTab.POST: {
        navigate(WallpaperRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EWallpaperTab.ABOUT_ME: {
        navigate(AboutDashboardRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EWallpaperTab.FRIEND: {
        navigate(FriendDashboardRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EWallpaperTab.IMAGE: {
        break;
      }
    }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flex: "3",
            gap: "1rem",
          }}
        >
          <Box>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Avatar
                  sx={{
                    padding: "4px",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    backgroundColor: "#f2f4f7",
                    ":hover": { backgroundColor: "rgb(225,226,231)" },
                  }}
                  variant="circular"
                  src={CameraIcon}
                  onClick={() => console.log("Camera clicked")}
                />
              }
            >
              <Avatar
                alt={user?.name}
                src={user?.profilePicture}
                sx={{
                  width: 150,
                  height: 150,
                  cursor: "pointer",
                }}
                onClick={() => console.log("Avatar clicked")}
              />
            </Badge>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography>{user?.name}</Typography>
            <Typography>{friends?.total} Friends</Typography>
            <AvatarGroup max={5} total={friends?.total}>
              {friends?.data.map((f) => (
                <Avatar key={f.id} alt={f.name} src={f.profilePicture}/>
              ))}
            </AvatarGroup>
          </Box>
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
          <Button
            variant="contained"
            fullWidth
            onClick={() => setShowEditInformationModal(true)}
          >
            Edit wallpaper
          </Button>
          <Box>
            <Button
              onClick={() => setShowUserList(!showUserList)}
              color={"primary"}
            >
              <ArrowDropDownOutlined />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "8px",
          display: showUserList ? "visible" : "none",
        }}
      >
        <FbUserKnowableCardList />
      </Box>
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
      {user && (
        <FbUserInformationForm
          user={user}
          showDialog={showEditInformationModal}
          setShowDialog={setShowEditInformationModal}
        />
      )}
    </>
  );
};
