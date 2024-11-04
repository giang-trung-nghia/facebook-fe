import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/auth/authSlice";
import { useSnackbar } from "../components/commons/SnackbarContent";

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const showSnackbar = useSnackbar();

  const handleClick = () => {
    showSnackbar("This is a message", "info");
  };
  return (
    <Box>
      Welcome to Dashboard
      <Box>{user?.id}</Box>
      <Button variant="contained" onClick={handleClick}>
        Show Snackbar
      </Button>
    </Box>
  );
};
