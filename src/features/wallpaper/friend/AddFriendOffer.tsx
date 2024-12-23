import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import FbFriendList from "../../friend/friendList/FbFriendList";
import { IFriendOfUser } from "../../../models/users/user.model";
import { getAddFriendOffers } from "../../../services/api/user.api";
import { IPagingRequest } from "../../../models/base/PagingRequest.model";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/auth/authSlice";

export const AddFriendOffer = () => {
  const user = useSelector(selectUser);
  const [offers, setOffers] = useState<IFriendOfUser[]>([]);

  useEffect(() => {
    (async () => {
      await getOffers();
    })();
  }, []);

  const getOffers = async () => {
    const body: IPagingRequest = {
      pageNumber: 1,
      pageSize: 20,
    };
    if (!user) return;

    await getAddFriendOffers(user?.id, body).then((res) => {
      const data: IFriendOfUser[] = res.data.map((e) => {
        return {
          id: e.id,
          profilePicture: e.profilePicture,
          name: e.name,
          relationship: e.relationship,
          mutualFriends: Math.floor(Math.random() * 100),
        };
      });
      setOffers(data);
    });
  };
  return (
    <Box>
      <FbFriendList friends={offers} setFriends={setOffers} />
    </Box>
  );
};
