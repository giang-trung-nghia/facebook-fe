import {useSelector} from "react-redux";
import {selectUser, setUser} from "../store/slices/auth/authSlice";
import {useEffect} from "react";
import {getUser} from "../services/api/user.api";
import {useDispatch} from "react-redux";
import { Route, Routes } from "react-router";
import { DashboardOverview } from "../features/dashboard/DashboardOverview";

export const Dashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (user) {
        await getUser(user.id).then((res) => {
          dispatch(setUser(res));
        });
      }
    })();
  }, []);

  return (
    <Routes>
      <Route path={"/"} element={<DashboardOverview/>}>
        {/* <Route path={AboutDashboardRoute.path} element={<About/>}/> */}
        {/* <Route path={FriendDashboardRoute.path} element={<Friend/>}/> */}
      </Route>
    </Routes>
  );
};
