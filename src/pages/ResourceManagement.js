import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message, Popconfirm } from "antd";
import axios from "axios";
import { Box, Alert, Typography } from "@mui/material";
import { BACKEND_URL } from "../assets/constants";

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newResource, setNewResource] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingResourceId, setLoadingResourceId] = useState(null);
  const [errorMsg, seterrorMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");

  const fetchResources = async () => {
    try {
      const orgId = localStorage.getItem("selectedOrgId");
      const res = await axios.get(
        `${BACKEND_URL}/clientadmin/resourceManagement/getResources?orgId=${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("resources>> ", res);
      setResources(res.data.response);
    } catch (err) {
      message.error("Failed to fetch resources");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAdd = async () => {
    if (!newResource.trim()) {
      message.warning("Resource name is required");
      return;
    }
    const orgId = localStorage.getItem("selectedOrgId");

    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/clientadmin/resourceManagement/createResource`,
        { resourceName: newResource, orgId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Resource added successfully");
      setIsModalVisible(false);
      setNewResource("");
      seterrorMsg("");
      setSuccessMsg("Resource Added Successfully");
      fetchResources();
    } catch (err) {
      seterrorMsg("Failed to add resource");
      setSuccessMsg("");
      message.error("Failed to add resource");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resources/${id}`); // Replace with your actual endpoint
      message.success("Resource deleted");
      fetchResources();
    } catch (err) {
      message.error("Failed to delete resource");
    }
  };

  const columns = [
    {
      title: "Resource Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this resource?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to right, #e6f0ff, #f8fbff)",
      }}
    >
      <div style={{ padding: 24 }}>
        <Typography
          variant="h4"
          sx={{ color: "#0047ab", fontWeight: "bold", mb: 4 }}
        >
          Resource Management
        </Typography>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Add Resource
        </Button>
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

        <table className="table-fixed w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-900 font-semibold">
            <tr>
              <th className="w-24 px-4 py-2 border-b">Id</th>
              <th className="w-40 px-4 py-2 border-b">Name</th>

              <th className="w-32 px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{resource.portal_id}</td>
                <td className="px-4 py-2">{resource.name}</td>

                <td className="px-4 py-2">
                  <select
                    value={resource.status}
                    onChange={async (e) => {
                      const updatedStatus = e.target.value;
                      setLoadingResourceId(resource.id);
                      try {
                        await axios.patch(
                          `${BACKEND_URL}/clientadmin/resourceManagement/updateResources?id=${resource.id}`,
                          {
                            status: updatedStatus,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        message.success("Status updated");
                        seterrorMsg("");
                        setSuccessMsg("Status Updated");
                        await fetchResources(); // refresh the list once
                      } catch (err) {
                        seterrorMsg("Failed to update status");
                        setSuccessMsg("");
                        message.error("Failed to update status");
                      } finally {
                        setLoadingResourceId(null); // stop loading
                      }
                    }}
                    disabled={loadingResourceId === resource.id}
                    className={`px-2 py-1 border rounded text-sm ${
                      loadingResourceId === resource.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <option value="ENABLED">ENABLED</option>
                    <option value="DISABLED">DISABLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          title="Add New Resource"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleAdd}
          confirmLoading={loading}
        >
          <Input
            placeholder="Enter resource name"
            value={newResource}
            onChange={(e) => setNewResource(e.target.value)}
          />
        </Modal>
      </div>
    </Box>
  );
};

export default ResourceManagement;
