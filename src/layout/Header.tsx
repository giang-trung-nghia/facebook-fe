import {
  Avatar,
  Box,
  IconButton,
  Input,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import FacebookIcon from "../assets/icons/facebook.png";
import UserIcon from "../assets/icons/user.png";
import { FbIcon } from "../components/commons/FbIcon";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useState } from "react";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "../services/api/auth.api";
import { useNavigate } from "react-router";
import { SignInRoute } from "../routes/auth.route";

export const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    logOut(refreshToken ?? "");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    navigate(SignInRoute.path);
    handleClose();
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
        height: "56px",
        p: "0 16px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flex: "1" }}>
        <FbIcon src={FacebookIcon} alt="Logo" />
        <Box>
          <Input size="medium"></Input>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "3",
        }}
      >
        <IconButton
          sx={{ width: "120px", height: "40px", borderRadius: "12px" }}
          color="primary"
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          sx={{ width: "120px", height: "40px", borderRadius: "12px" }}
          color="primary"
        >
          <OndemandVideoIcon />
        </IconButton>
        <IconButton
          sx={{ width: "120px", height: "40px", borderRadius: "12px" }}
          color="primary"
        >
          <StorefrontOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{ width: "120px", height: "40px", borderRadius: "12px" }}
          color="primary"
        >
          <PeopleAltOutlinedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: "1",
        }}
      >
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <MessageOutlinedIcon />
        </IconButton>
        <IconButton>
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <Avatar
          alt="Remy Sharp"
          src={UserIcon}
          sx={{ width: 40, height: 40, cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Paper
            sx={{
              width: "30vw",
              maxWidth: 300,
              boxShadow: "none",
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <WallpaperIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Wallpaper" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Paper>
        </Menu>
      </Box>
    </Box>
  );
};
