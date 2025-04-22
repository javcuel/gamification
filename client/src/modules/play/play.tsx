import React from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../shared/components/NavBar/NavBar';
import ErrorMsg from '../shared/components/ui/ErrorMsg';
import Iframe from './components/iframe';
import usePlay from './hooks/use-play';

const Play: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const data = usePlay(Number(gameId));

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
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
