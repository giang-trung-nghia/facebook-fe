import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "../store/slices/auth/authSlice";
import { useEffect } from "react";
import { getUser } from "../services/api/user.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const Dashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (user) {
        await getUser(user.id).then((res) => {
          console.log(res);

          dispatch(setUser(res));
        });
      }
    })();
  }, []);

  const handleClick = () => {
    if (user) {
      getUser(user.id).then((res) => {
        toast.success("This is a message from: " + res.name);
      });
    }
  };
  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        Show Snackbar
      </Button>
    </Box>
  );
};
