import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import Sidebar from "../components/SideBar";
import { Tabs, message } from "antd";

const { TabPane } = Tabs;

const UserManagement = () => {
  const [formData, setFormData] = useState({
    roleId: "",
    email: "",
    name: "",
    password: "",
    phone: "",
    login_id: "",
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const roles = [
    { id: "admin", name: "Admin" },
    { id: "manager", name: "Manager" },
    { id: "employee", name: "Employee" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.roleId) newErrors.roleId = "Role is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.login_id) newErrors.login_id = "Login ID is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUsers((prev) => [...prev, { ...formData, key: prev.length }]);
    setFormData({
      roleId: "",
      email: "",
      name: "",
      password: "",
      phone: "",
      login_id: "",
    });
    message.success("User added successfully.");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f4f9ff" }}>
      <div className="flex-1 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
          User Management
        </h1>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Create User" key="1">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  select
                  label="Role"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  error={!!errors.roleId}
                  helperText={errors.roleId}
                  fullWidth
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />

                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />

                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  fullWidth
                />

                <TextField
                  label="Login ID"
                  name="login_id"
                  value={formData.login_id}
                  onChange={handleChange}
                  error={!!errors.login_id}
                  helperText={errors.login_id}
                  fullWidth
                />
              </div>

              <div className="mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save User
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="User Listing" key="2">
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
                  {users.map((user, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-3">{user.roleId}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">{user.name}</td>
                      <td className="px-6 py-3">{user.phone}</td>
                      <td className="px-6 py-3">{user.login_id}</td>
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

export default UserManagement;
