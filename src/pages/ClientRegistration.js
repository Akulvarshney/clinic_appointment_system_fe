import React from "react";
import axios from "axios";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
} from "@mui/material";
import Sidebar from "../components/SideBar.js";

const ClientRegistration = () => {
  const [formData, setFormData] = React.useState({
    Firstname: "",
    Secondname: "",
    address: "",
    mobile: "",
    dob: "",
    gender: "",
    occupation: "",
    email: "",
    emergencyContact: "",
  });

  const [errorMsg, seterrorMsg] = React.useState("");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    seterrorMsg("");
    try {
      if (
        !formData.Firstname ||
        !formData.address ||
        !formData.mobile ||
        !formData.gender ||
        !formData.dob
      ) {
        seterrorMsg("Please Enter all the Mandatory fields");
        return;
      }
      // Add organization_id in formdata
      const response = await axios.post("http://localhost:3000/api/", formData);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to right, #e6f0ff, #f8fbff)",
      }}
    >
      <Box sx={{ flexGrow: 1, p: 4, maxWidth: "calc(100% - 260px)" }}>
        <Typography
          variant="h4"
          sx={{ color: "#0047ab", fontWeight: "bold", mb: 4 }}
        >
          Client Registration
        </Typography>

        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 3, background: "#ffffffcc" }}
        >
          <Grid container spacing={3}>
            {/* Basic Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="Firstname"
                label="First Name"
                value={formData.Firstname}
                onChange={handleChange}
                fullWidth
                required
                sx={{ minWidth: 300 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Secondname"
                label="Second Name"
                value={formData.Secondname}
                onChange={handleChange}
                fullWidth
                required
                sx={{ minWidth: 300 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="mobile"
                label="Mobile Number"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                fullWidth
                required
                sx={{ minWidth: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
                sx={{ minWidth: 600 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ minWidth: 380 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dob"
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                select
                required
                sx={{ minWidth: 210 }}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="occupation"
                label="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                fullWidth
                sx={{ minWidth: 300 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="emergencyContact"
                label="Emergency Contact"
                value={formData.emergencyContact}
                onChange={handleChange}
                fullWidth
                sx={{ minWidth: 300 }}
              />
            </Grid>

            <Divider sx={{ my: 3, width: "100%" }} />

            {/* Medical & Emergency Info */}
          </Grid>
          {errorMsg && (
            <Alert severity="error" sx={{ fontSize: "0.85rem" }}>
              {errorMsg}
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 4,
              background: "#007bff",
              ":hover": { background: "#0056b3" },
              px: 4,
              py: 1,
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ClientRegistration;
