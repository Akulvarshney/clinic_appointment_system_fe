import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { Box } from "@mui/material";

const clients = [
  {
    name: "John Doe",
    mobile: "9876543210",
    address: "123 Main St, Delhi",
    dob: "1990-01-01",
    gender: "Male",
    occupation: "Engineer",
  },
  {
    name: "Priya Sharma",
    mobile: "9876512345",
    address: "456 Park Ave, Mumbai",
    dob: "1992-05-20",
    gender: "Female",
    occupation: "Doctor",
  },
  {
    name: "Rahul Kumar",
    mobile: "9812345678",
    address: "789 Sector 15, Noida",
    dob: "1988-03-12",
    gender: "Male",
    occupation: "Therapist",
  },
  {
    name: "Sneha Jain",
    mobile: "9898989898",
    address: "Bandra West, Mumbai",
    dob: "1995-11-30",
    gender: "Female",
    occupation: "Aesthetician",
  },
];

const ClientInfoTable = () => {
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.mobile.includes(search) ||
      client.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to right, #e6f0ff, #f8fbff)",
      }}
    >
      <Sidebar />

      <div className="flex-1 p-10 bg-transparent">
        {/* Heading */}
        <div className="mb-8 border-b-2 border-blue-200 pb-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-900">Clients</h1>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, mobile or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto border border-blue-100">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-900 font-semibold">
              <tr>
                <th className="px-6 py-4 border-b">Name</th>
                <th className="px-6 py-4 border-b">Mobile</th>
                <th className="px-6 py-4 border-b">Address</th>
                <th className="px-6 py-4 border-b">DOB</th>
                <th className="px-6 py-4 border-b">Gender</th>
                <th className="px-6 py-4 border-b">Occupation</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-6 text-center text-gray-400"
                  >
                    No matching clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-blue-50 transition duration-150"
                  >
                    <td className="px-6 py-4">{client.name}</td>
                    <td className="px-6 py-4">{client.mobile}</td>
                    <td className="px-6 py-4">{client.address}</td>
                    <td className="px-6 py-4">{client.dob}</td>
                    <td className="px-6 py-4">{client.gender}</td>
                    <td className="px-6 py-4">{client.occupation}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Box>
  );
};

export default ClientInfoTable;
