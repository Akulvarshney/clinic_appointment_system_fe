import React, { useEffect, useState } from "react";
import { FaChartBar, FaUser } from "react-icons/fa";
import { useAuth } from "../layouts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const storedOrgs = JSON.parse(
      localStorage.getItem("organizations") || "[]"
    );
    const storedSelected = localStorage.getItem("selectedOrganizationId");

    setOrganizations(storedOrgs);
    const selected = storedSelected || storedOrgs[0]?.organizationId;
    setSelectedOrgId(selected);

    if (selected) {
      const selectedOrg = storedOrgs.find(
        (org) => org.organizationId === selected
      );
      const roleTabs = selectedOrg?.roles?.[0]?.tabs || [];

      const validTabs = roleTabs.filter((tab) => tab.is_valid);
      setTabs(validTabs);
    }
  }, []);

  const handleOrgChange = (e) => {
    const newOrgId = e.target.value;
    setSelectedOrgId(newOrgId);
    localStorage.setItem("selectedOrganizationId", newOrgId);

    const selectedOrg = organizations.find(
      (org) => org.organizationId === newOrgId
    );
    const roleTabs = selectedOrg?.roles?.[0]?.tabs || [];
    const validTabs = roleTabs.filter((tab) => tab.is_valid);
    setTabs(validTabs);
  };

  return (
    <aside className="w-full md:w-64 bg-white p-6 shadow-2xl border-r border-gray-200 animate-fadeInUp">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-10 tracking-widest uppercase">
        Arogi
      </h2>

      <div className="mb-6">
        <label className="text-gray-600 text-sm block mb-1">
          Select Organization
        </label>
        <select
          value={selectedOrgId}
          onChange={handleOrgChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {organizations.map((org) => (
            <option key={org.organizationId} value={org.organizationId}>
              {org.organizationName || org.shortorgname}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-6 text-lg">
        {tabs.map((tab) => (
          <li
            key={tab.tab_id}
            className="flex items-center text-blue-600 font-bold hover:text-blue-800 transition duration-300 cursor-pointer"
          >
            <FaChartBar className="mr-3" />
            {tab.tab_name}
          </li>
        ))}

        <li
          className="flex items-center text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
          onClick={logout}
        >
          <FaUser className="mr-3" /> Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
