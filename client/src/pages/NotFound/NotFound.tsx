import React from 'react';
import FloatingText from '../../components/ui/FloatingText';
import SpaceBackground from '../../components/SpaceBackground';

const NotFound: React.FC = () => {
  return (
    <div className="container min-vh-100 custom-flex-center text-center">
      <SpaceBackground />
      <div className="container">
        <div className="row">
          <FloatingText text="Not Found" />
        </div>
        <div className="row">
          <h1>This page doesnt exist</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
