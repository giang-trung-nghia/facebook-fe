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
        console.log(authState.accessToken);

        await getUser(user.id);
      }
    })();
  }, []);

  const handleClick = () => {
    showSnackbar("This is a message", "info");
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
