import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ClientRegistration from "./pages/ClientRegistration";
import ClientTable from "./pages/ClientTable";
import RoleManagement from "./pages/RoleCreation";
import UserMgmt from "./pages/UserCreation";

import LoggedOutLayout from "./layouts/LoggedOutLayout";
import LoggedInLayout from "./layouts/LoggedInLayout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {isLoggedIn ? (
        <Route
          element={<LoggedInLayout onLogout={() => setIsLoggedIn(false)} />}
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/registerclient" element={<ClientRegistration />} />
          <Route path="/clients" element={<ClientTable />} />
          <Route path="/rolemanagement" element={<RoleManagement />} />
          <Route path="/userCreation" element={<UserMgmt />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      ) : (
        <Route
          element={<LoggedOutLayout onLogin={() => setIsLoggedIn(true)} />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
