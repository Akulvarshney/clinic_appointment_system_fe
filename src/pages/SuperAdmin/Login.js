import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  Stack,
  TextField,
  Alert,
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../assets/constants";
import { useAuth } from "../../layouts/AuthContext";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMsg("");
    if (!loginId || !password) {
      setErrorMsg("LoginId and password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/noAuth/auth/superadmin/login`,
        {
          login_id: loginId,
          password,
        }
      );

      console.log("Login success:", response.data);

      const { token, user } = response.data;

      login(user, token);
      // Save user & token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "SUPERADMIN") {
        navigate("/superadmin/dashboard");
      } else {
        navigate("/dashboard");
      }
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
    <Box>
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
                SuperAdmin Login Page
              </Typography>
            </Box>

            {errorMsg && (
              <Alert severity="error" className="error-alert">
                {errorMsg}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Login Id"
              value={loginId}
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
              }}
              className="button-gradient-hover"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <Box textAlign="center" className="flex flex-col">
              <Button variant="text" size="small" className="small-text-button">
                Forgot your password?
              </Button>

              <Button
                onClick={() => navigate("/login")}
                variant="text"
                size="small"
                className="small-text-button"
              >
                Login as Client
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
