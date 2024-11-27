import {WallpaperOverview} from "../features/wallpaper/WallpaperOverview";
import {Route, Routes} from "react-router-dom";
import About from "./About.tsx";
import {WallpaperAboutDashboardRoute} from "../routes/wall.route.ts";

export const Wallpaper: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<WallpaperOverview/>}>
        <Route path={WallpaperAboutDashboardRoute.path} element={<About/>}/>
      </Route>
    </Routes>
  );
};
