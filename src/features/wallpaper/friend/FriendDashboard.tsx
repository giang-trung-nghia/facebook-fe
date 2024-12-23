import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { EFriendTab } from "../../../utils/enum/friend.enum";
import { FbTabList } from "../../../components/composit";
import {
  AddFriendOfferRoute,
  FollowingRoute,
  FriendDashboardRoute,
} from "../../../routes/wallpaper/friend/friend.route";
import { selectUser } from "../../../store/slices/auth/authSlice";
import { useSelector } from "react-redux";
import { YourFriend } from "./YourFriend";
import FbSearchBox from "../../../components/commons/FbSearchBox";
import { AddFriendOffer } from "./AddFriendOffer";

const listFriendTab = [
  { key: EFriendTab.ALL, label: "All" },
  { key: EFriendTab.RECENT, label: "Recent Added" },
  { key: EFriendTab.WORK, label: "Work" },
  { key: EFriendTab.COLLEGE, label: "College" },
  { key: EFriendTab.CITY, label: "City" },
  { key: EFriendTab.FOLLOWING, label: "Following" },
  { key: EFriendTab.AddFriendOffer, label: "Add friend offers" },
];

export const FriendDashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<EFriendTab>(EFriendTab.ALL);

  const handleChangeTab = (val: EFriendTab) => {
    setCurrentTab(val);
    switch (val) {
      case EFriendTab.ALL: {
        navigate(FriendDashboardRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EFriendTab.RECENT: {
        navigate(FriendDashboardRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EFriendTab.WORK: {
        navigate(FriendDashboardRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EFriendTab.COLLEGE: {
        navigate(FriendDashboardRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EFriendTab.CITY: {
        navigate(FriendDashboardRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EFriendTab.FOLLOWING: {
        navigate(FollowingRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
      case EFriendTab.AddFriendOffer: {
        navigate(AddFriendOfferRoute.link.replace(":id", user?.id ?? "0"));
        break;
      }
    }
  };
  const handleSearch = (val: string) => {
    console.log(val);
  };

  return (
    <Box
      sx={{
        width: "100%",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          p: "0.5rem 1rem 0 0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant={"h6"}>Friend</Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <FbSearchBox onSearch={handleSearch} />
            <Button onClick={() => handleChangeTab(EFriendTab.AddFriendOffer)}>
              Invite offer
            </Button>
            <Button>Find friend</Button>
          </Box>
        </Box>
        <FbTabList<EFriendTab>
          tabs={listFriendTab}
          currentTab={currentTab}
          onChange={handleChangeTab}
        ></FbTabList>
      </Box>
      <Box sx={{margin: "0.5rem 0"}}>
        {currentTab == EFriendTab.AddFriendOffer ? (
          <AddFriendOffer />
        ) : currentTab == EFriendTab.FOLLOWING ? (
          <Outlet />
        ) : (
          <YourFriend />
        )}
      </Box>
    </Box>
  );
};
