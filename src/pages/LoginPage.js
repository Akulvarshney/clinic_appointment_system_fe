import React, { useState } from "react";
import axios from "axios";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [LoginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMsg("");
    if (!LoginId || !password) {
      setErrorMsg("LoginId and password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          loginId: LoginId,
          password,
        }
      );
      console.log("Login success:", response.data);
      navigate("/dashboard");
      // redirect or show success message
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #f0f9ff)",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "transparent",
          boxShadow: "none",
          py: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 5 } }}>
          <Typography
            variant="h6"
            sx={{ color: "#1e3a8a", fontWeight: "bold" }}
          >
            Sitemark
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "#1e3a8a",
              border: "1px solid #1e3a8a",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#eff6ff",
              },
            }}
          >
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Login Form */}
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          pb: 10,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: isMobile ? "100%" : 400,
            p: 4,
            borderRadius: "18px",
            backgroundColor: "#ffffff",
            boxShadow: "0 12px 28px rgba(59, 130, 246, 0.12)",
          }}
        >
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#1e3a8a", fontSize: "1.7rem" }}
              >
                Sign in
              </Typography>
              <Typography variant="body2" sx={{ color: "#475569" }}>
                Enter your credentials to continue
              </Typography>
            </Box>

            {errorMsg && (
              <Alert severity="error" sx={{ fontSize: "0.85rem" }}>
                {errorMsg}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Login Id"
              value={LoginId}
              onChange={(e) => setLoginId(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  height: 42,
                },
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  height: 42,
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              sx={{
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                fontWeight: "600",
                fontSize: "0.9rem",
                borderRadius: "10px",
                py: 1.1,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #2563eb, #1e40af)",
                },
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <Box textAlign="center">
              <Button
                variant="text"
                size="small"
                sx={{
                  color: "#3b82f6",
                  fontSize: "0.8rem",
                  textTransform: "none",
                }}
              >
                Forgot your password?
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
