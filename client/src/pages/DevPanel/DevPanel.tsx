import React, { useState } from 'react';
import NavBar from '../shared/NavBar/NavBar';
import SpaceBackground from '../shared/ui/SpaceBackground';
import AddGameTab from '../shared/AddGameTab';

const DevPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'tab1':
        return <p>Subjects</p>;
      case 'tab2':
        return <AddGameTab />;
      default:
        return <p>Games</p>;
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
        <div>
          <div>
            <ul className="nav nav-tabs d-flex justify-content-center gap-5 fs-5">
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
                  Add Game
                </a>
              </li>
            </ul>
          </div>

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

export default DevPanel;
