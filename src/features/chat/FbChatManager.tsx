import React, { useEffect, useState } from "react";
import FbChatBox from "./FbChatBox";
import FbChatBubble from "./FbChatBubble";
import { IBaseUser } from "../../models/users/user.model";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/auth/authSlice";
import { closeChatGlobal, selectChats } from "../../store/slices/chatSlice";
import { useDispatch } from "react-redux";

export const FbChatManager: React.FC = () => {
  const user = useSelector(selectUser);
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();
  const [openChats, setOpenChats] = useState<IBaseUser[]>([]);
  const [minimizedChats, setMinimizedChats] = useState<IBaseUser[]>([]);

  useEffect(() => {
    chats.map((e) => {
      return {
        id: e.id,
        name: e.name,
        profilePicture: e.members.filter((m) => m.id !== user?.id).at(0)
          ?.profilePicture,
      };
    });
    setOpenChats(chats);
  }, [chats]);

  const openChat = (id: string, name: string) => {
    if (openChats.length < 3) {
      setOpenChats([...openChats, { id, name }]);
    } else {
      setMinimizedChats([...minimizedChats, { id, name }]);
    }
  };

  const closeChat = (id: string) => {
    setOpenChats(openChats.filter((chat) => chat.id !== id));
    dispatch(closeChatGlobal(id));
  };

  const minimizeChat = (id: string) => {
    const chatToMinimize = openChats.find((chat) => chat.id === id);
    if (chatToMinimize) {
      setOpenChats(openChats.filter((chat) => chat.id !== id));
      setMinimizedChats([...minimizedChats, chatToMinimize]);
    }
  };

  const expandChat = (id: string) => {
    const chatToExpand = minimizedChats.find((chat) => chat.id === id);
    if (chatToExpand) {
      if (openChats.length < 3) {
        setOpenChats([...openChats, chatToExpand]);
        setMinimizedChats(minimizedChats.filter((chat) => chat.id !== id));
      }
    }
  };

  return (
    <div className="chat-manager">
      <div className="chat-box-container w-svw">
        {openChats.map((user) => (
          <FbChatBox
            key={user.id}
            user={user}
            onMinimize={() => minimizeChat(user.id)}
            onClose={() => closeChat(user.id)}
          />
        ))}
      </div>

      <div className="chat-bubble-container">
        {minimizedChats.map((chat) => (
          <FbChatBubble
            key={chat.id}
            user={chat}
            onExpand={() => expandChat(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};
