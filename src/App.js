import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ClientRegistration from "./pages/ClientRegistration";
import ClientTable from "./pages/ClientTable";
import RoleManagement from "./pages/RoleCreation";
import UserMgmt from "./pages/UserCreation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/registerclient" element={<ClientRegistration />} />
      <Route path="/clients" element={<ClientTable />} />
      <Route path="/rolemanagement" element={<RoleManagement />} />
      <Route path="/userCreation" element={<UserMgmt />} />
    </Routes>
  );
}

export default App;
