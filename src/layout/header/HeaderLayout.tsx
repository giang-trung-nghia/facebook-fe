// HeaderLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FbChatManager } from "../../features/chat/FbChatManager";

const HeaderLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "56px" }}>
        <Outlet />
      </main>
      <FbChatManager/>
    </>
  );
};

export default HeaderLayout;
