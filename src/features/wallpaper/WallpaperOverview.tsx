import { Box } from "@mui/material";
import { WallpaperInformation } from "./WallpaperInformation";
import { WallpaperFeed } from "./WallpaperFeed";

export const WallpaperOverview: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "70%",
        backgroundColor: "#eee",
      }}
    >
      <WallpaperInformation />
      <WallpaperFeed />
    </Box>
  );
};
