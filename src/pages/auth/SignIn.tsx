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
import { SignUpRoute } from "../../routes/auth.route";
import { postSignIn } from "../../services/api/auth.api";
import IconGoogle from "../../assets/icons/google.png";
import {
  API_BASE_URL,
  BE_BASE_DOMAIN,
} from "../../utils/constants/common.constant";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { AuthState } from "../../store/slices/auth/types";
import { IJwtPayload } from "../../models/auth/jwtPayload.model";
import { toast } from "react-toastify";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.origin === BE_BASE_DOMAIN) {
        const { accessToken, refreshToken } = event.data;

        if (accessToken && refreshToken) {
          handleSignInSuccess(accessToken, refreshToken);
        }
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  const onClickSignIn = async () => {
    await postSignIn(email, password).then((res) => {
      handleSignInSuccess(res.accessToken, res.refreshToken);
    });
  };

  const handleSignInSuccess = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const payload: IJwtPayload = jwtDecode(accessToken);
    if (payload.id) {
      const auth: AuthState = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        isLogin: true,
        user: {
          id: payload.id,
        },
      };
      dispatch(setAuth(auth));
      navigate("/dashboard");
    } else {
      toast.error("can't get user id after login");
    }
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
        const token = localStorage.getItem("accessToken");
        if (token) {
          console.log("Login successful:", token);
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
          label="Email"
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
