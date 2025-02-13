import React from "react";
import { FBUserBadgeAvatar } from "../../components/commons/FbUserBadgeAvatar";
import { IUser } from "../../models/users/user.model";
import { FbTooltipLight } from "../../components/commons/FbTooltipLight";

interface ChatBubbleProps {
  user: IUser;
  onExpand: () => void;
}

const FbChatBubble: React.FC<ChatBubbleProps> = ({ user, onExpand }) => {
  const handleClick = () => {
    onExpand();
  };

  return (
    <FbTooltipLight
      title={user.name}
      placement="left"
      distance={1}
      disableAnimation
    >
      <div>
        <FBUserBadgeAvatar
          avatarUrl={user.profilePicture}
          onClick={handleClick}
        />
      </div>
    </FbTooltipLight>
  );
};

export default FbChatBubble;
