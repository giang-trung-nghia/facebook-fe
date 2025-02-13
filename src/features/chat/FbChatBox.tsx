import { Box, IconButton, Input, Typography } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import CallIcon from "@mui/icons-material/Call";
import { FBUserBadgeAvatar } from "../../components/commons/FbUserBadgeAvatar";
import { IBaseUser } from "../../models/users/user.model";
import { FbTooltipLight } from "../../components/commons/FbTooltipLight";
import FbInput from "../../components/commons/FbInput";
import SendIcon from "@mui/icons-material/Send";

interface ChatBoxProps {
  user: IBaseUser;
  onMinimize: () => void;
  onClose: () => void;
}

const FbChatBox: React.FC<ChatBoxProps> = ({ user, onMinimize, onClose }) => {
  const onHandleText = () => {};

  return (
    <div className="chat-box">
      <Box
        sx={{
          padding: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0px 2px 5px #ccc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "50%",
            gap: "0.25rem",
          }}
        >
          <FBUserBadgeAvatar avatarUrl={user.profilePicture} size="sm" />
          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "14px",
            }}
          >
            {user.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <FbTooltipLight
            title={"Call"}
            placement="top"
            distance={10}
            disableAnimation
          >
            <IconButton size="small" color="primary">
              <CallIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
          </FbTooltipLight>
          <FbTooltipLight
            title={"Facetime"}
            placement="top"
            distance={10}
            disableAnimation
          >
            <IconButton size="small" color="primary">
              <VideoChatIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
          </FbTooltipLight>
          <FbTooltipLight
            title={"Minimize chat"}
            placement="top"
            distance={10}
            disableAnimation
          >
            <IconButton onClick={onMinimize} size="small" color="primary">
              <RemoveIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
          </FbTooltipLight>
          <FbTooltipLight
            title={"Close chat"}
            placement="top"
            distance={10}
            disableAnimation
          >
            <IconButton onClick={onClose} size="small" color="primary">
              <CloseIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
          </FbTooltipLight>
        </Box>
      </Box>
      <div className="chat-content">Send hello to {user.name}</div>
      <div className="chat-footer">
        <FbInput placeholder={"Type a message"} onHandleText={onHandleText} />
        <IconButton sx={{marginLeft:"4px"}} color="primary">
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default FbChatBox;
