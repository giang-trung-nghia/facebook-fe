import React from "react";
import { Newfeed } from "./center/Newfeed";
import { LeftSidebar } from "./left-sidebar/LeftSidebar";
import { RightSidebar } from "./right-sidebar/RightSidebar";
import { Box } from "@mui/material";

export const DashboardOverview = () => {
  return (
    <div className="flex justify-between gap-20 h-svh bg-slate-100">
      <Box sx={{ flex: 2 }}>
        <LeftSidebar />
      </Box>
      <Box sx={{ flex: 3 }}>
        <Newfeed />
      </Box>
      <Box sx={{ flex: 2 }}>
        <RightSidebar />
      </Box>
    </div>
  );
};
