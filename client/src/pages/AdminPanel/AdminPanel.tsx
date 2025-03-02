import React, { useState } from "react";
import useLogout from "../../hooks/useLogout";
import AdminAddGameTab from "./AdminAddGameTab/AdminAddGameTab";
import AdminAddUserTab from "./AdminAddUserTab/AdminAddUserTab";
import AdminAddWorldTab from "./AdminAddWorldTab/AdminAddWorldTab";
import AdminManageUsersTab from "./AdminManageUsersTab/AdminManageUsersTab";
import AdminWorldsGamesTab from "./AdminWorldsGamesTab/AdminWorldsGamesTab";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const logout = useLogout();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  /**
   * Handles the logout action.
   */
  const handleLogoutClick = () => {
    logout();
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "tab1":
        return <AdminWorldsGamesTab />;
      case "tab2":
        return <AdminManageUsersTab />;
      case "tab3":
        return <AdminAddWorldTab />;
      case "tab4":
        return <AdminAddGameTab />;
      case "tab5":
        return <AdminAddUserTab />;
      default:
        return <AdminWorldsGamesTab />;
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>AdminPanel</h2>
        <button
          onClick={handleLogoutClick}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs*/}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabChange("tab1")}
          >
            Worlds and Games
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabChange("tab2")}
          >
            Manage Users
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabChange("tab3")}
          >
            Add World
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "tab4" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabChange("tab4")}
          >
            Add Game
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "tab5" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabChange("tab5")}
          >
            Add User
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "tab6" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabChange("tab6")}
          ></a>
        </li>
      </ul>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default AdminPanel;
