import React, { useState } from 'react';
import AdminAddGameTab from './AddGameTab/AdminAddGameTab';
import AdminAddSubjectTab from './AddSubjectTab/AddAddSubjectTab';
import AdminAddUserTab from './AddUserTab/AdminAddUserTab';
import AdminWorldsGamesTab from './SubjectsTab/AdminWorldsGamesTab';
import AdminThemeTab from './ThemeTab/AdminThemeTab';
import AdminManageUsersTab from './UsersTab/AdminManageUsersTab';
import './styles/AdminPanel.css';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'tab1':
        return <AdminWorldsGamesTab />;
      case 'tab2':
        return <AdminManageUsersTab />;
      case 'tab3':
        return <AdminAddSubjectTab />;
      case 'tab4':
        return <AdminAddGameTab />;
      case 'tab5':
        return <AdminAddUserTab />;
      case 'tab6':
        return <AdminThemeTab />;
      default:
        return <AdminWorldsGamesTab />;
    }
  };

  const tabs = [
    { id: 'tab1', label: 'Subjects' },
    { id: 'tab2', label: 'Users' },
    { id: 'tab3', label: 'Add Subjects' },
    { id: 'tab4', label: 'Add Game' },
    { id: 'tab5', label: 'Add User' },
    { id: 'tab6', label: 'Add Theme' },
  ];

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-nav">
          {tabs.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`sidebar-nav-link ${activeTab === id ? 'active' : ''}`}
                onClick={() => handleTabChange(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-content">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
