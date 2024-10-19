import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
// import Home from "@/pages/Home";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
