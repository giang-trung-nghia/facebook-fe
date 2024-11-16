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
import { Bounce, ToastContainer } from "react-toastify";

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={SignInRoute.path} />} />
          <Route path={SignInRoute.path} element={<SignIn />} />
          <Route path={SignUpRoute.path} element={<SignUp />} />
          <Route path={DashboardRoute.path} element={<Dashboard />} />
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
