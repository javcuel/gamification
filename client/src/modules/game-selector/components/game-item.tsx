import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { Game } from '../../shared/api/domain/game';

import '../styles/game-item.css';

/**
 * @property {Game} game - The game to display.
 */
interface GameProps {
  game: Game;
}

/**
 * GameItem is a functional component that renders an individual game item, which includes an image
 * and its name. If the game is visible and open, the item is clickable, and navigating
 * to the `PLAY` route for the given game ID occurs upon click.
 */
const GameItem: React.FC<GameProps> = ({ game }) => {
  if (!game.isVisible) return null;

  const navigate = useNavigate();

  const handleClick = () => {
    if (game.isOpen) navigate(ROUTES.PLAY(game.id));
  };

  const gameClassName = game.isOpen ? 'game-item' : 'game-item-disabled';

  return (
    <div className={gameClassName} onClick={() => handleClick()}>
      <img
        className="game-item-img"
        src={game.img}
        onError={(e) => {
          e.currentTarget.src = '/images/default_game_image.png';
        }}
        alt={game.name}
      ></img>
      <div className="game-item-img-overlay">
        <div>
          {game.isOpen ? (
            <>
              {game.name}
              <hr />
              Max Score: {game.maxScore}
            </>
          ) : (
            '🔒Closed!'
          )}
        </div>
      </div>
    </div>
  );
};

export default GameItem;
