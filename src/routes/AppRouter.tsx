import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import { SignInRoute, SignUpRoute } from "./auth.route";
import { DashboardRoute } from "./dashboard.route";
import { Dashboard } from "../pages/Dashboard";
// import Home from "@/pages/Home";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Navigate to={SignInRoute.path} />} />
        <Route path={SignInRoute.path} element={<SignIn />} />
        <Route path={SignUpRoute.path} element={<SignUp />} />
        <Route path={DashboardRoute.path} element={<Dashboard />} />
        <Route path={"*"} element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
