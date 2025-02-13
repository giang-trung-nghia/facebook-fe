import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import React from "react";
import UserIcon from "../../assets/icons/user.png";

const BadgeAvatar = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

interface BadgeAvatarProp {
  avatarUrl?: string;
  alt?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const FBUserBadgeAvatar: React.FC<BadgeAvatarProp> = ({
  avatarUrl = UserIcon,
  alt,
  onClick,
  size
}) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "30px";
      case "md":
        return "40px";
      case "lg":
        return "60px";
      default:
        return "40px";
    }
  };

  return (
    <BadgeAvatar
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      onClick={onClick}
    >
      <Avatar alt={alt} src={avatarUrl} sx={{ width: getSize(), height: getSize() }} />
    </BadgeAvatar>
  );
};
