import React, { useEffect, useState } from 'react';
import AddGameTab from './add-game-tab/add-game-tab';
import AddSubjectTab from './add-subject-tab/add-subject.tab';
import AddUserTab from './add-user-tab/admin-add-user-tab';
import './styles/admin-panel.css';
import SubjectsTab from './subjects-tab/subjects-tab';
import ThemeTab from './theme-tab/admin-theme-tab';
import UsersTab from './users-tab/users-tab';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const tabs = [
    { id: 'tab1', label: 'Subjects' },
    { id: 'tab2', label: 'Users' },
    { id: 'tab3', label: 'Add Subject' },
    { id: 'tab4', label: 'Add Game' },
    { id: 'tab5', label: 'Add User' },
    { id: 'tab6', label: 'Add Theme' },
  ];

  return (
    <div className="admin-container">
      {isMobile && (
        <button
          className="sidebar-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {/* Barra lateral */}
      <div
        className={`sidebar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}
      >
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
        <div className="panel-content">
          {activeTab === 'tab1' && <SubjectsTab />}
          {activeTab === 'tab2' && <UsersTab />}
          {activeTab === 'tab3' && <AddSubjectTab />}
          {activeTab === 'tab4' && <AddGameTab />}
          {activeTab === 'tab5' && <AddUserTab />}
          {activeTab === 'tab6' && <ThemeTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
