import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Fade,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  const [openNewForm, setOpenNewForm] = useState(false);
  const [openTrackForm, setOpenTrackForm] = useState(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 440,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right top, #c6f1ff, #d3d2ff)",
        overflow: "hidden",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#1565c0" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ClinicEase Portal
          </Typography>
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "calc(100vh - 64px)" }}
      >
        <Fade in={true} timeout={1000}>
          <Box textAlign="center">
            <Typography
              variant="h2"
              fontWeight="bold"
              color="primary.dark"
              gutterBottom
            >
              Welcome to ClinicEase
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={5}>
              Your gateway to simplified healthcare form submissions.
            </Typography>

            <Stack spacing={3} direction="row" justifyContent="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 10,
                  fontWeight: "bold",
                  backgroundColor: "#1976d2",
                  boxShadow: 3,
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
                onClick={() => setOpenNewForm(true)}
              >
                Become our Client
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<SearchIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 10,
                  fontWeight: "bold",
                  color: "#388e3c",
                  borderColor: "#388e3c",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#e8f5e9",
                  },
                }}
                onClick={() => setOpenTrackForm(true)}
              >
                Check Status
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Grid>

      {/* Modal for New Form */}
      <Modal open={openNewForm} onClose={() => setOpenNewForm(false)}>
        <Box
          sx={{
            ...modalStyle,
            width: 500, // increased modal width
            borderRadius: 4, // rounded corners
            boxShadow: 24,
            p: 4,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            align="center"
            sx={{ color: "#333" }}
          >
            Submit New Application
          </Typography>

          <Stack spacing={2} mt={2}>
            <TextField
              label="Full Name"
              fullWidth
              size="medium"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <TextField
              label="Short Name"
              fullWidth
              size="medium"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <TextField
              label="Mobile"
              fullWidth
              size="medium"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              size="medium"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <TextField
              label="Address"
              fullWidth
              size="medium"
              multiline
              rows={2}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 3,
                py: 1.2,
                backgroundColor: "#1976d2",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Modal for Track Application */}
      <Modal open={openTrackForm} onClose={() => setOpenTrackForm(false)}>
        <Box
          sx={{
            ...modalStyle,
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            background: "linear-gradient(to right, #e0f7fa, #ffffff)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            🚀 Track Application
          </Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Mobile Number"
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <span style={{ paddingRight: 8, color: "#888" }}>📱</span>
                ),
              }}
            />
            <TextField
              label="Tracking ID"
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <span style={{ paddingRight: 8, color: "#888" }}>🔍</span>
                ),
              }}
            />
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ borderRadius: 3, py: 1 }}
            >
              Track Now
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default HomePage;
