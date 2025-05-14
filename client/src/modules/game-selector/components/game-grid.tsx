import React from 'react';
import { useParams } from 'react-router-dom';

import Toast from '../../shared/components/ui/toast';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import useGameSelector from '../hooks/use-game-selector';
import GameItem from './game-item';

/**
 * The GameGrid component renders a grid of games by using the `GameItem` component
 * for each visible game.
 *
 * @component
 *
 * @returns {JSX.Element} A grid of games with visible games displayed as individual
 * `GameItem` components. If an error occurs, an alert message is shown.
 */
const GameGrid: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { games, error, loading } = useGameSelector(Number(subjectId));

  return (
    <div className="container">
      {loading ? (
        <div className="row custom-flex-center text-center">
          <LoadingMsg message="Loading Games..." />
        </div>
      ) : (
        <div className="row custom-flex-center text-center">
          {error && <Toast type="error" message={error} />}

          {games
            .filter((game) => game.isVisible)
            .map((game, index) => (
              <div className="col-auto" key={index}>
                <GameItem game={game} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GameGrid;
