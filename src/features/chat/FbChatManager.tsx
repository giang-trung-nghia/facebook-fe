import React, { useEffect, useState } from "react";
import FbChatBox from "./FbChatBox";
import FbChatBubble from "./FbChatBubble";
import { IBaseUser, IFriendOfUser, IUser } from "../../models/users/user.model";
import { IPagingResponse } from "../../models/base/PagingResponse.model";
import { getFriends } from "../../services/api/user.api";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/auth/authSlice";
import { IPagingRequest } from "../../models/base/PagingRequest.model";

export const FbChatManager: React.FC = () => {
  const user = useSelector(selectUser);
  const [openChats, setOpenChats] = useState<IBaseUser[]>([]);
  const [minimizedChats, setMinimizedChats] = useState<IBaseUser[]>([]);
  const [friends, setFriends] = useState<IPagingResponse<IFriendOfUser>>();

  useEffect(() => {
    (async () => {
      await fetchFriends();
    })();
  }, []);

  const fetchFriends = async () => {
    const body: IPagingRequest = {
      pageNumber: 1,
      pageSize: 5,
    };
    if (!user) return;

    await getFriends(user?.id, body).then((res) => {
      const data: IFriendOfUser[] = res.data.map((e) => {
        return {
          id: e.id,
          profilePicture: e.profilePicture,
          name: e.name,
          relationship: e.relationship,
          mutualFriends: Math.floor(Math.random() * 100),
        };
      });
      setOpenChats([
        {
          id: data[0].id,
          name: data[0].name,
          profilePicture: data[0].profilePicture,
        },
        {
          id: data[1].id,
          name: data[1].name,
          profilePicture: data[1].profilePicture,
        },
      ]);
      setMinimizedChats([
        {
          id: data[2].id,
          name: data[2].name,
          profilePicture: data[2].profilePicture,
        },
        {
          id: data[3].id,
          name: data[3].name,
          profilePicture: data[3].profilePicture,
        },
      ]);

      setFriends((prev) => ({
        ...prev,
        data,
        total: res.total,
        totalPage: res.totalPage,
        page: res.page,
        pageSize: res.pageSize,
      }));
    });
  };

  const openChat = (id: string, name: string) => {
    if (openChats.length < 3) {
      setOpenChats([...openChats, { id, name }]);
    } else {
      setMinimizedChats([...minimizedChats, { id, name }]);
    }
  };

  const closeChat = (id: string) => {
    setOpenChats(openChats.filter((chat) => chat.id !== id));
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
