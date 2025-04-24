import React, { useState, useEffect } from 'react';
import AddGameTab from '../shared/components/AddGameTab/add-game-tab';

const DevPanel: React.FC = () => {
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
    { id: 'tab3', label: 'Add Subjects' },
    { id: 'tab4', label: 'Add Game' },
    { id: 'tab5', label: 'Add User' },
    { id: 'tab6', label: 'Add Theme' },
  ];

  return (
    <div className="admin-container">
      {isMobile && (
        <button
          className="mobile-menu-button"
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
          {activeTab === 'tab1' && <AddGameTab />}
        </div>
      </div>
    </div>
  );
};

export default DevPanel;
