import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SpaceBackground from '../../components/SpaceBackground';
import AdminAddGameTab from './AdminAddGameTab/AdminAddGameTab';
import AdminAddSubjectTab from './AdminAddSubjectTab/AddAddSubjectTab';
import AdminAddUserTab from './AdminAddUserTab/AdminAddUserTab';
import AdminManageUsersTab from './AdminManageUsersTab/AdminManageUsersTab';
import AdminThemeTab from './AdminThemeTab/AdminThemeTab';
import AdminWorldsGamesTab from './AdminWorldsGamesTab/AdminWorldsGamesTab';

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

  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <SpaceBackground />
      <div
        className="container-fluid d-flex flex-column"
        style={{ height: '100vh' }}
      >
        <div style={{ height: '15vh' }}>
          <NavBar webName="Gamispace" />
        </div>

        {/* Tabs + Contenido */}
        <div>
          {/* Tabs */}
          <div>
            <ul className="nav nav-tabs d-flex justify-content-center gap-5 fs-5">
              {' '}
              {/* Centrar los tabs y aumentar el tamaño del texto */}
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleTabChange('tab1')}
                >
                  Subjects
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleTabChange('tab2')}
                >
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleTabChange('tab3')}
                >
                  Add Subjects
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'tab4' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleTabChange('tab4')}
                >
                  Add Game
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'tab5' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleTabChange('tab5')}
                >
                  Add User
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'tab6' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleTabChange('tab6')}
                >
                  Add Theme
                </a>
              </li>
            </ul>
          </div>

          {/* Contenido dinámico */}
          <div
            className="d-flex justify-content-center align-items-center flex-grow-1 overflow-auto"
            style={{ minHeight: '80vh' }}
          >
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
