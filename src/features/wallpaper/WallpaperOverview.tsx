import {Box} from "@mui/material";
import {WallpaperInformation} from "./WallpaperInformation";
import {Outlet} from "react-router-dom";

export const WallpaperOverview: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f2f4f7",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%",
          padding: "0.5rem",
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #dedede"
        }}
      >
        <WallpaperInformation/>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "70%",
        padding: "0 0.5rem",
        backgroundColor: "#fff",
        mt: "1rem",
        borderRadius: "8px",
        border: "1px solid #dedede"
      }}>
        <Outlet/>
      </Box>
    </Box>
  )
}
