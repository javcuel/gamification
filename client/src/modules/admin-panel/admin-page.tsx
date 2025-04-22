import React from 'react';
import NavBar from '../shared/components/NavBar/NavBar';
import AdminPanel from './admin-panel';

const AdminPage: React.FC = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <NavBar webName="Gamispace" />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;
