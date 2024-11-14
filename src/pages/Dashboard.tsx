import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth, selectUser } from "../store/slices/auth/authSlice";
import { useSnackbar } from "../components/commons/SnackbarContent";
import { useEffect } from "react";
import { getUser } from "../services/api/user.api";
import { Header } from "../layout/Header";

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const authState = useSelector(selectAuth);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    (async () => {
      if (user) {
        await getUser(user.id);
      }
    })();
  }, []);

  const handleClick = () => {
    if(user) {
      getUser(user.id).then((res) => {
        showSnackbar("This is a message from: " + res.name, "info");
      });
      getUser(user.id).then((res) => {
        showSnackbar("This is a message from: " + res.name, "info");
      });
      getUser('7601e672-f450-49bc-402b-08dd00936131').then((res) => {
        showSnackbar("This is a message from: " + res.name, "info");
      });
      getUser('7601e672-f450-49bc-402b-08dd00936132').then((res) => {
        showSnackbar("This is a message from: " + res.name, "info");
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
