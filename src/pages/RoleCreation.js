import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Sidebar from "../components/SideBar";
import { Tabs, Table, message } from "antd";

const { TabPane } = Tabs;

const RoleManagement = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    roleDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.roleName.trim()) newErrors.roleName = "Role name is required";
    if (!formData.roleDescription.trim())
      newErrors.roleDescription = "Role description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setRoles((prev) => [...prev, { ...formData, key: prev.length }]);
    setFormData({ roleName: "", roleDescription: "" });
    setErrors({});
    message.success("Role added successfully.");
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Role Description",
      dataIndex: "roleDescription",
      key: "roleDescription",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f4f9ff" }}>
      <div className="flex-1 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
          Role Management
        </h1>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Create Role" key="1">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow max-w-4xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <TextField
                    label="Role Name"
                    name="roleName"
                    value={formData.roleName}
                    onChange={handleChange}
                    error={!!errors.roleName}
                    helperText={errors.roleName}
                    fullWidth
                  />
                </div>
                <div className="w-full">
                  <TextField
                    label="Role Description"
                    name="roleDescription"
                    value={formData.roleDescription}
                    onChange={handleChange}
                    error={!!errors.roleDescription}
                    helperText={errors.roleDescription}
                    fullWidth
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className="mt-2"
                >
                  Save Role
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="Role Listing" key="2">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-100 text-blue-900 font-semibold">
                  <tr>
                    <th className="px-6 py-4 border-b">Role Name </th>
                    <th className="px-6 py-4 border-b">Role Desc</th>
                  </tr>
                </thead>
              </table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Box>
  );
};

export default RoleManagement;
