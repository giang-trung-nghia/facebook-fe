import React, { useEffect, useState } from 'react'
import { IFriendOfUser } from '../../../models/users/user.model';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/slices/auth/authSlice';
import { IPagingRequest } from '../../../models/base/PagingRequest.model';
import { getFriends } from '../../../services/api/user.api';
import FbFriendList from '../../friend/friendList/FbFriendList';

export const YourFriend: React.FC = () => {
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
      const data: IFriendOfUser[] = res.data.map((e) => {
        return {
          id: e.id,
          profilePicture: e.profilePicture,
          name: e.name,
          relationship: e.relationship,
          mutualFriends: Math.floor(Math.random() * 100),
        };
      });
      setFriends(data);
    });
  };

  return (
    <FbFriendList friends={friends} setFriends={setFriends} />
  )
}
