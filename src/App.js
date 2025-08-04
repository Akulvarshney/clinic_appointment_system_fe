import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ClientRegistration from "./pages/ClientRegistration";
import DoctorManagement from "./pages/doctorManagement";
import ClientTable from "./pages/ClientTable";
import RoleManagement from "./pages/RoleCreation";
import UserMgmt from "./pages/EmployeeManagement";

import LoggedOutLayout from "./layouts/LoggedOutLayout";
import LoggedInLayout from "./layouts/LoggedInLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import Login from "./pages/SuperAdmin/Login";
import { useAuth } from "./layouts/AuthContext";
import DashboardSAPage from "./pages/SuperAdmin/DashboardSApage";
import OrganisationListing from "./pages/SuperAdmin/OrganisationListing";
import ResourceManagement from "./pages/ResourceManagement";

import "../src/App.css";
import { message } from "antd";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [role, setRole] = useState(null);

  const { isLoggedIn, role, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return null; // Or show a loading spinner
  }

  return (
    <Routes>
      {isLoggedIn && role === "SUPERADMIN" ? (
        <Route element={<SuperAdminLayout />}>
          <Route path="/superadmin/dashboard" element={<DashboardSAPage />} />
          <Route
            path="/sa/organisationListing"
            element={<OrganisationListing />}
          />
          <Route path="*" element={<Navigate to="/superadmin/dashboard" />} />
        </Route>
      ) : isLoggedIn ? (
        <Route element={<LoggedInLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/registerClient" element={<ClientRegistration />} />
          <Route path="/clients" element={<ClientTable />} />
          <Route path="/roleManagement" element={<RoleManagement />} />
          <Route path="/employeeManagement" element={<UserMgmt />} />
          <Route path="/doctorManagement" element={<DoctorManagement />} />
          <Route path="/resourceManagement" element={<ResourceManagement />} />
          {/* <Route path="/reports" element={<div>Reports Page</div>} /> */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      ) : (
        <Route element={<LoggedOutLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/superAdmin/login" element={<Login />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
