import React from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../shared/NavBar/NavBar';
import ErrorMsg from '../shared/ui/ErrorMsg';
import SpaceBackground from '../shared/ui/SpaceBackground';
import Iframe from './Iframe';
import usePlay from './usePlay';

const Play: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const data = usePlay(Number(gameId));

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <SpaceBackground />
      <NavBar webName="Gamispace" />
      {data.game ? (
        <Iframe selectedGame={data.game} />
      ) : (
        <ErrorMsg message={'No game founded'} />
      )}
    </div>
  );
};

export default Play;
