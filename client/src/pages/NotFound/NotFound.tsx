import React from 'react';
import SpaceBackground from '../../components/SpaceBackground';
import FloatingText from '../../components/ui/FloatingText';
import WavesText from '../../components/ui/WavesText';

const NotFound: React.FC = () => {
  return (
    <div className="container min-vh-100 custom-flex-center text-center">
      <SpaceBackground />
      <div className="container">
        <div className="row">
          <WavesText text="Not-Found" />
        </div>
        <div className="row">
          <FloatingText text="This page doesnt exist" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
