import React from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const SignIn: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
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

        <Button variant="contained" color="primary" fullWidth className="mt-4">
          Log In
        </Button>

        <Typography variant="body2" className="mt-3 text-center">
          Don't have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
