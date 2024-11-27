import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {
  WallpaperAboutCareerRoute,
  WallpaperAboutOverviewRoute,
  WallpaperAboutPlaceRoute
} from "../routes/wall.route.ts";
import AboutOverview from "../features/wallpaper/about/AboutOverview.tsx";
import AboutPlace from "../features/wallpaper/about/AboutPlace.tsx";
import AboutCareer from "../features/wallpaper/about/AboutCareer.tsx";
import AboutDashboard from "../features/wallpaper/about/AboutDashboard.tsx";

const About: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AboutDashboard/>}>
        <Route path={WallpaperAboutOverviewRoute.path} element={<AboutOverview/>}/>
        <Route path={WallpaperAboutPlaceRoute.path} element={<AboutPlace/>}/>
        <Route path={WallpaperAboutCareerRoute.path} element={<AboutCareer/>}/>
      </Route>
    </Routes>
  );
};

export default About;