import React from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../shared/NavBar/NavBar';
import SpaceBackground from '../shared/ui/SpaceBackground';
import Iframe from './Iframe';
import usePlay from './usePlay';

const Play: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const data = usePlay(Number(gameId));

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
          {data.game ? (
            <Iframe selectedGame={data.game} />
          ) : (
            <p>No Game founded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Play;
