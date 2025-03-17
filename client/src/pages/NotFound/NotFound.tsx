import React from 'react';
import SpaceBackground from '../shared/ui/SpaceBackground';
import FloatingText from '../shared/ui/FloatingText';
import WavesText from '../shared/ui/WavesText';

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
