import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/auth/authSlice";

export const Dashboard = () => {
  const user = useSelector(selectUser);

  return (
    <Box>
      Welcome to Dashboard
      <Box>{user?.id}</Box>
    </Box>
  );
};
