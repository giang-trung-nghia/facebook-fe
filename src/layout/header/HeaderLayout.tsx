// HeaderLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const HeaderLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HeaderLayout;
