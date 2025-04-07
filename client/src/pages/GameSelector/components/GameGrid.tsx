import React from 'react';
import { useParams } from 'react-router-dom';

import ErrorMsg from '../../shared/ui/ErrorMsg';
import useGames from '../hooks/useGame';
import GameItem from './GameItem';

const GameGrid: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { games, error } = useGames(Number(subjectId));

  return (
    <div className="container">
      <div className="row custom-flex-center text-center">
        {error && <ErrorMsg message={error} />}

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

export default GameGrid;
