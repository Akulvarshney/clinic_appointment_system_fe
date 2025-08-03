import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import Sidebar from "../components/SideBar";
import { Tabs, Table, message } from "antd";
import axios from "axios";

import { BACKEND_URL } from "../assets/constants";

const { TabPane } = Tabs;

const RoleManagement = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    roleDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const orgId = localStorage.getItem("selectedOrgId");
      console.log("orgId>>>> ", orgId);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BACKEND_URL}/clientAdmin/userMgmt/getRoles?orgId=${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setRoles(response.data.response || []);
      } else {
        message.error("Failed to fetch roles.");
      }
    } catch (err) {
      console.error("Error fetching roles:", err);
      message.error("Something went wrong while fetching roles.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.roleName.trim()) newErrors.roleName = "Role name is required";
    if (!formData.roleDescription.trim())
      newErrors.roleDescription = "Role description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const orgId = localStorage.getItem("selectedOrgId");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}/clientAdmin/userMgmt/createRole`,
        {
          roleName: formData.roleName,
          roleDesc: formData.roleDescription,
          orgId: orgId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setFormData({ roleName: "", roleDescription: "" });
        setErrors({});
        setErrorMsg("");
        setSuccessMsg("Role created successfully.");
        message.success("Role added successfully.");
      } else {
        message.error("Failed to add role.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setSuccessMsg("");
      setErrorMsg("Please try again later or with other Role Name");
      message.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
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

        <Tabs
          defaultActiveKey="1"
          onChange={(activeKey) => {
            if (activeKey === "2") {
              fetchRoles();
            }
            if (activeKey == "1") {
              setErrorMsg("");
              setSuccessMsg("");
            }
          }}
        >
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
              {errorMsg && (
                <Alert sx={{ mb: 2, mt: 2 }} severity="error">
                  {errorMsg}
                </Alert>
              )}
              {successMsg && (
                <Alert sx={{ mb: 2, mt: 2 }} severity="success">
                  {successMsg}
                </Alert>
              )}
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
                    <th className="px-6 py-4 border-b">Role Name</th>
                    <th className="px-6 py-4 border-b">Role Description</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <tr key={role.id}>
                        <td className="px-6 py-3 border-b">{role.name}</td>
                        <td className="px-6 py-3 border-b">
                          {role.description || "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No roles available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Box>
  );
};

export default RoleManagement;
