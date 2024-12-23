import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/auth/authSlice.ts";
import {
  AboutCareerRoute,
  AboutOverviewRoute,
  AboutPlaceRoute,
} from "../../../routes/wall.route.ts";
import { FbNavList } from "../../../components/composit";

const AboutDashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const navListInit = [
    {
      link: AboutOverviewRoute.link.replace(":id", user?.id ?? "0"),
      label: AboutOverviewRoute.name,
    },
    {
      link: AboutPlaceRoute.link.replace(":id", user?.id ?? "0"),
      label: AboutPlaceRoute.name,
    },
    {
      link: AboutCareerRoute.link.replace(":id", user?.id ?? "0"),
      label: AboutCareerRoute.name,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "start",
        width: "100%",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          borderRight: "1px solid #ccc",
          p: "0.5rem 1rem 0 0.5rem",
          width: "15rem",
        }}
      >
        <Typography variant={"h6"} sx={{ pl: "1rem" }}>
          About
        </Typography>
        <FbNavList items={navListInit} />
      </Box>
      <Box sx={{ p: "0.5rem 1rem 0 0", width: "100%", flex: "4" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AboutDashboard;
