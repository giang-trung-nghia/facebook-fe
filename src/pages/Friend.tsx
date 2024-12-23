import React from "react";
import { Route, Routes } from "react-router";
import { FollowingRoute, AddFriendOfferRoute } from "../routes/wallpaper/friend/friend.route";
import { FriendDashboard } from "../features/wallpaper/friend/FriendDashboard";
import { AddFriendOffer } from "../features/wallpaper/friend/AddFriendOffer";
import { Following } from "../features/wallpaper/friend/Following";

export const Friend: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<FriendDashboard/>}>
        <Route path={AddFriendOfferRoute.path} element={<AddFriendOffer/>}/>
        <Route path={FollowingRoute.path} element={<Following/>}/>
      </Route>
    </Routes>
  );
};
