import {WallpaperOverview} from "../features/wallpaper/WallpaperOverview";
import {Route, Routes} from "react-router-dom";
import About from "./About.tsx";
import {AboutDashboardRoute} from "../routes/wall.route.ts";
import { FriendDashboardRoute } from "../routes/wallpaper/friend/friend.route.ts";
import { Friend } from "./Friend.tsx";

export const Wallpaper: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<WallpaperOverview/>}>
        <Route path={AboutDashboardRoute.path} element={<About/>}/>
        <Route path={FriendDashboardRoute.path} element={<Friend/>}/>
      </Route>
    </Routes>
  );
};
