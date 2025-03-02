import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { IFriendOfUser } from "../../../models/users/user.model";
import { IPagingRequest } from "../../../models/base/PagingRequest.model";
import { getFriends } from "../../../services/api/user.api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/auth/authSlice";
import { FbItemContactUser } from "./FbItemContactUser";

export const ListContactUser = () => {
  const user = useSelector(selectUser);
  const [friends, setFriends] = useState<IFriendOfUser[]>([]);

  useEffect(() => {
    (async () => {
      await fetchFriends();
    })();
  }, []);

  const fetchFriends = async () => {
    const body: IPagingRequest = {
      pageNumber: 1,
      pageSize: 20,
    };
    if (!user) return;

    await getFriends(user?.id, body).then((res) => {
      const data: IFriendOfUser[] = res.data
      // .map((e) => {
      //   return {
      //     id: e.id,
      //     profilePicture: e.profilePicture,
      //     name: e.name,
      //     relationship: e.relationship,
      //     mutualFriends: e.mutualFriends
      //   };
      // });
      setFriends(data);
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="span">Contact users</div>
        <div className="btn">
          <IconButton size="small">
            <SearchIcon />
          </IconButton>
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>
      {friends.map((friend) => (
        <FbItemContactUser key={friend.id} friend={friend} />
      ))}
    </div>
  );
};
