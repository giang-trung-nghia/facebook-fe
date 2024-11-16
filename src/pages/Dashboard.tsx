import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth, selectUser } from "../store/slices/auth/authSlice";
import { useEffect } from "react";
import { getUser } from "../services/api/user.api";
import { Header } from "../layout/Header";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const authState = useSelector(selectAuth);

  useEffect(() => {
    (async () => {
      if (user) {
        await getUser(user.id);
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
      <Header />

      <Button variant="contained" onClick={handleClick}>
        Show Snackbar
      </Button>
    </Box>
  );
};
