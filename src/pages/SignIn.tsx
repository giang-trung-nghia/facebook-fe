import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SignUpRoute } from "../routes/auth.route";
import { postSignIn } from "../services/api/auth.api";
import IconGoogle from "../assets/icons/google.png";
import { API_BASE_URL, BE_BASE_DOMAIN } from "../utils/constants/common.constant";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: any) => {
      console.log(event);
      
      if (event.origin === BE_BASE_DOMAIN) {
        const { token } = event.data;
        if (token) {
          navigate("/dashboard");
        }
      }
    };
    console.log("add window event message");
    window.addEventListener("message", handleMessage);

    return () => {
      console.log("remove window event message");
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  const onClickSignIn = async () => {
    const res = await postSignIn(email, password);
    console.log(res);
  };

  const onClickSignUp = () => {
    navigate(SignUpRoute.path);
  };

  const onClickSignInGoogle = () => {
    const googleLoginUrl = `${API_BASE_URL}/auth/sign-in-google`;

    const popup = window.open(
      googleLoginUrl,
      "popup",
      "width=600,height=600,left=200,top=200"
    );

    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        // Popup đóng lại, kiểm tra nếu đăng nhập thành công
        // Lấy JWT từ localStorage hoặc gọi API để lấy token
        const token = localStorage.getItem("jwtToken");
        if (token) {
          console.log("Login successful:", token);
          // Xử lý đăng nhập thành công
        } else {
          console.log("Login failed or canceled");
        }
      }
    }, 1000);
  };

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
          Sign In
        </Typography>

        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          label="Email or Phone Number"
          fullWidth
          margin="normal"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={onClickSignIn}
        >
          Sign in
        </Button>
        <Box sx={{ width: "100%", mt: "1rem" }}>
          <Divider>
            <Typography variant="caption">Or</Typography>
          </Divider>
        </Box>
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
            Don't have an account?
          </Typography>
          <Typography
            onClick={onClickSignUp}
            variant="body2"
            sx={{ color: "#1976D2", ml: "0.2rem", cursor: "pointer" }}
          >
            Sign Up
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
