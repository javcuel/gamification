import React from 'react';
import { useParams } from 'react-router-dom';

import GameItem from './GameItem';
import useGames from '../hooks/useGame';

const GameGrid: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { games, error } = useGames(Number(subjectId));

  return (
    <div className="container">
      <div className="row">
        {error && <div className="alert custom-alert">{error}</div>}
      </div>

      <div className="row custom-flex-center text-center">
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
