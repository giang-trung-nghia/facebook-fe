import { Box } from "@mui/material";
import { WallpaperOverview } from "../features/wallpaper/WallpaperOverview";

export const Wallpaper: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ccc",
      }}
    >
      <WallpaperOverview />
    </Box>
  );
};
