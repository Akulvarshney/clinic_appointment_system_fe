import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, MenuItem, Alert } from "@mui/material";
import Sidebar from "../components/SideBar";
import { Tabs, message } from "antd";
import { BACKEND_URL } from "../assets/constants";

const { TabPane } = Tabs;

const DoctorManagement = () => {
  const [formData, setFormData] = useState({
    roleId: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    address: "",
    emergency_contact: "",
    password: "",
    phone: "",
    login_id: "",
    license_number: "", // Doctor-specific
  });

  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [roles, setRoles] = useState([]);
  const orgId = localStorage.getItem("selectedOrgId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/clientAdmin/userMgmt/getRoles`,
          {
            params: { orgId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoles(response.data.response);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First Name is required";
    if (!formData.roleId) newErrors.roleId = "Role is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (formData.phone.length !== 10)
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.login_id) newErrors.login_id = "Login ID is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.license_number)
      newErrors.license_number = "License number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    validate();

    try {
      // alert("hey");
      const response = await axios.post(
        `${BACKEND_URL}/clientAdmin/userMgmt/createDoctor`,
        {
          roleId: formData.roleId,
          emailId: formData.email,
          firstName: formData.first_name,
          lastName: formData.last_name,
          // DOB: new Date(formData.dob).toISOString(),
          ...(formData.dob && { DOB: new Date(formData.dob).toISOString() }),
          gender: formData.gender,
          address: formData.address,
          emergencyContact: formData.emergency_contact,
          password: formData.password,
          phone: formData.phone,
          login_id: formData.login_id,
          orgId: orgId,
          license_number: formData.license_number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if ([200, 201].includes(response.status)) {
        setFormData({
          roleId: "",
          email: "",
          first_name: "",
          last_name: "",
          gender: "",
          dob: "",
          address: "",
          emergency_contact: "",
          password: "",
          phone: "",
          login_id: "",
          license_number: "",
        });
        setErrors({});
        setSuccessMsg("Doctor created successfully.");
        message.success("Doctor added successfully.");
      } else {
        message.error("Failed to add doctor.");
      }
    } catch (error) {
      setSuccessMsg("");
      if (error.response) {
        setErrorMsg(error.response.data.message);
      }
      message.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f4f9ff" }}>
      <div className="flex-1 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
          Doctor Management
        </h1>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Create Doctor" key="1">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="First Name *"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  fullWidth
                />
                <div className="flex flex-row gap-4">
                  <TextField
                    label="License Number *"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    error={!!errors.license_number}
                    helperText={errors.license_number}
                    //fullWidth
                    sx={{ width: 225 }}
                  />
                  <TextField
                    select
                    label="Role *"
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                    error={!!errors.roleId}
                    helperText={errors.roleId}
                    //fullWidth
                    sx={{ width: 225 }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="flex flex-row gap-4">
                  <TextField
                    select
                    label="Gender *"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={!!errors.gender}
                    helperText={errors.gender}
                    fullWidth
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                  <TextField
                    type="date"
                    label="Date of Birth"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </div>
                <TextField
                  label="Email *"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
                <TextField
                  label="Phone *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  fullWidth
                />

                <TextField
                  label="Login ID *"
                  name="login_id"
                  value={formData.login_id}
                  onChange={handleChange}
                  error={!!errors.login_id}
                  helperText={errors.login_id}
                  fullWidth
                />
                <TextField
                  label="Password *"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Emergency Contact"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  fullWidth
                />
              </div>

              {errorMsg && (
                <Alert sx={{ mt: 2 }} severity="error">
                  {errorMsg}
                </Alert>
              )}
              {successMsg && (
                <Alert sx={{ mt: 2 }} severity="success">
                  {successMsg}
                </Alert>
              )}

              <div className="mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save Doctor
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="Doctor Listing" key="2">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-4">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-100 text-blue-900 font-semibold">
                  <tr>
                    <th className="px-6 py-4 border-b">Role</th>
                    <th className="px-6 py-4 border-b">Email</th>
                    <th className="px-6 py-4 border-b">Name</th>
                    <th className="px-6 py-4 border-b">Phone</th>
                    <th className="px-6 py-4 border-b">Login ID</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-3">{doc.roleId}</td>
                      <td className="px-6 py-3">{doc.email}</td>
                      <td className="px-6 py-3">
                        {doc.first_name} {doc.last_name}
                      </td>
                      <td className="px-6 py-3">{doc.phone}</td>
                      <td className="px-6 py-3">{doc.login_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Box>
  );
};

export default DoctorManagement;
