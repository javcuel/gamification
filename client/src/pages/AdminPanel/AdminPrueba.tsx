import React from 'react';
import NavBar from '../shared/NavBar/NavBar';
import SpaceBackground from '../shared/ui/SpaceBackground';
import AdminPanel from './AdminPanel';

const AdminPrueba: React.FC = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <SpaceBackground />
      <NavBar webName="Gamispace" />
      <AdminPanel />
    </div>
  );
};

export default AdminPrueba;
