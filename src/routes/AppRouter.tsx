import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import { Dashboard } from "../pages/Dashboard";
import { Bounce, ToastContainer } from "react-toastify";
import { DashboardRoute } from "./dashboard.route";
import { SignInRoute, SignUpRoute } from "./auth.route";
import { WallPaperRoute } from "./wall.route";
import { Wallpaper } from "../pages/Wallpaper";
import { SettingRoute } from "./setting.route";
import { Setting } from "../pages/Setting";
import HeaderLayout from "../layout/header/HeaderLayout";

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={SignInRoute.path} />} />
          <Route path={SignInRoute.path} element={<SignIn />} />
          <Route path={SignUpRoute.path} element={<SignUp />} />
          <Route element={<HeaderLayout />}>
            <Route path={DashboardRoute.path} element={<Dashboard />} />
            <Route path={WallPaperRoute.path} element={<Wallpaper />} />
            <Route path={SettingRoute.path} element={<Setting />} />
          </Route>

          <Route path={"*"} element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover
        transition={Bounce}
        limit={5}
        theme="light"
      />
    </>
  );
};

export default AppRouter;
