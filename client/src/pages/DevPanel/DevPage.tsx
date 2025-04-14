import React from 'react';
import NavBar from '../shared/NavBar/NavBar';
import DevPanel from './DevPanel';

const DevPage: React.FC = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <NavBar webName="Gamispace" />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <DevPanel />
      </div>
    </div>
  );
};

export default DevPage;
