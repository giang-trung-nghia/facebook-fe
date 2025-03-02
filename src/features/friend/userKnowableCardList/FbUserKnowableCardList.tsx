import React, { useEffect, useState } from "react";
import FbUserKnowableCardItem from "./FbUserKnowableCardItem";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/auth/authSlice";
import { ICreateRelationship } from "../../../models/relationship/relationship.model";
import {
  ERelationshipStatus,
  ERelationshipType,
} from "../../../utils/enum/relationship.enum";
import {
  createRelationship,
  deleteRelationship,
} from "../../../services/api/relationship.api";
import { IStrangeUser } from "../../../models/users/user.model";
import { IPagingRequest } from "../../../models/base/PagingRequest.model";
import { getStrangePeople } from "../../../services/api/user.api";

interface FbFriendCardListProps {
  onAddFriend?: (id: string) => void;
}

const FbUserKnowableCardList: React.FC<FbFriendCardListProps> = ({ onAddFriend }) => {
  const user = useSelector(selectUser);
  const [strangeUsers, setStrangeUsers] = useState<IStrangeUser[]>([]);

  useEffect(() => {
    (async () => {
      await fetchUsersMaybeYouKnow();
    })();
  }, []);

  const fetchUsersMaybeYouKnow = async () => {
    const body: IPagingRequest = {
      pageNumber: 1,
      pageSize: 20,
    };
    if (!user) return;

    await getStrangePeople(user?.id, body).then((res) => {
      const data: IStrangeUser[] = res.data.map((e) => {
        return {
          id: e.id,
          profilePicture: e.profilePicture,
          name: e.name,
          isAdded: false,
          mutualFriends: Math.floor(Math.random() * 100),
        };
      });
      setStrangeUsers(data.filter((e) => e.id !== user?.id));
    });
  };

  const handleAddFriend = async (id: string) => {
    onAddFriend && onAddFriend(id);

    if (!user?.id) return;

    const body: ICreateRelationship = {
      fromUserId: user?.id,
      toUserId: id,
      status: ERelationshipStatus.Pending,
      relationshipType: ERelationshipType.Friend,
    };
    await createRelationship(body).then((res) => {
      const newListStrangeUser = strangeUsers.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            isAdded: true,
            relationshipId: res.id,
          };
        } else return e;
      });
      setStrangeUsers(newListStrangeUser);
    });
  };

  const handleCancelAddFriend = async (user: IStrangeUser) => {
    console.log(user);
    if (!user.relationshipId) return;

    await deleteRelationship(user.relationshipId).then((res) => {
      const newListStrangeUser = strangeUsers.map((e) => {
        if (e.id === user.id) {
          return {
            ...e,
            isAdded: false,
            relationshipId: undefined,
          };
        } else return e;
      });
      setStrangeUsers(newListStrangeUser);
    });
  };

  const handleRemoveItem = (id: string) => {
    const newUsersList = strangeUsers.filter((e) => e.id !== id);
    setStrangeUsers(newUsersList);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: "8px 16px",
        }}
      >
        <Typography>Maybe you know this people</Typography>
        <Button variant={"text"}>See mores</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {strangeUsers.map((user) => (
          <FbUserKnowableCardItem
            key={user.id}
            user={user}
            onAddFriend={handleAddFriend}
            onCancelAddFriend={handleCancelAddFriend}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FbUserKnowableCardList;
