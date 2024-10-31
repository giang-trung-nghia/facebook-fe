import React from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import IconGoogle from "../../assets/icons/google.png";
import { useNavigate } from "react-router-dom";
import { SignInRoute } from "../../routes/auth.route";
import { API_BASE_URL } from "../../utils/constants/common.constant";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const onClickSignIn = () => {
    navigate(SignInRoute.path);
  };

  const onClickSignInGoogle = () => {
    window.location.href = `${API_BASE_URL}/auth/login-google`;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: "3rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" component="h1" className="text-center mb-4">
          Sign Up
        </Typography>

        <TextField
          variant="outlined"
          label="Email or Phone Number"
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: "1rem" }}
        >
          Sign Up
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: "1rem",
            display: "flex",
            alignItems: "center",
            background: "#fff",
            color: "#000",
          }}
          onClick={onClickSignInGoogle}
        >
          <img
            src={IconGoogle}
            alt="Google Icon"
            style={{ width: "20px", height: "20px", marginRight: "0.5rem" }}
          />
          Continue with Google
        </Button>
        <Box sx={{ display: "flex", mt: "1rem" }}>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            Allready have an account?
          </Typography>
          <Typography
            onClick={onClickSignIn}
            variant="body2"
            sx={{ color: "#1976D2", ml: "0.2rem", cursor: "pointer" }}
          >
            Sign In
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
