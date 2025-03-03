import React from 'react';
import { useParams } from 'react-router-dom';
import useGamesInfo from '../hooks/useGamesInfo';
import GameItem from './GameItem';

const SubjectGrid: React.FC = () => {
  /*TODO: EL FILTER DE SUBKECT EN BASE A SI ES VISIBLE O NO IGUAL NOS LO PODRIAMOS AHORRAR
  SI HACEMOS QUE EL ENDPOINT DEVUELVA DIRECTAMENTE SOLO LAS ASIGNATURAS QUE SEAN VISIBLES??*/
  const { subjectId } = useParams<{ subjectId: string }>();
  const { games, error } = useGamesInfo(Number(subjectId));

  return (
    <div className="container  ">
      <div className="row">
        {error && <div className="alert custom-alert">{error}</div>}
      </div>

      <div className="row  custom-flex-center text-center">
        {games
          .filter((game) => game.isVisible)
          .map((game, index) => (
            <div className="col-auto" key={index}>
              <GameItem game={game} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubjectGrid;
