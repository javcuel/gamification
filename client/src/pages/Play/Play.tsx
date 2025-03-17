import React from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import SpaceBackground from '../../components/SpaceBackground';

const Play: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <SpaceBackground />
      <div
        className="container-fluid d-flex flex-column"
        style={{ height: '100vh' }}
      >
        <div style={{ height: '5vh' }}>
          <NavBar webName="Gamispace" />
        </div>
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <p>JUGANDO A: {gameId} </p>
        </div>
      </div>
    </div>
  );
};

export default Play;
