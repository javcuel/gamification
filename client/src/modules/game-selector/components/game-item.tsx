import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { Game } from '../../shared/api/domain/game';

import '../styles/game-item.css';

interface GameProps {
  game: Game;
}

/**
 * The GameItem component renders an individual game item, which includes an image
 * and its name. If the game is visible and open, the item is clickable, and navigating
 * to the `PLAY` route for the given game ID occurs upon click.
 *
 * @component
 *
 * @param {GameProps} props - The properties for the GameItem component.
 * @param {Game} props.game - The game to be displayed.
 *
 * @returns {JSX.Element|null} A clickable game item if visible, otherwise null.
 */
const GameItem: React.FC<GameProps> = ({ game }) => {
  if (!game.isVisible) return null;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.PLAY(game.id));
  };

  const gameClassName = game.isOpen ? 'game-item' : 'game-item-disabled';

  return (
    <div className={gameClassName} onClick={() => handleClick()}>
      <img
        className="game-item-img"
        src={game.img || '/images/no_image.jpg'}
        alt={game.name}
      ></img>
      <div className="game-item-img-overlay">
        <p>{game.isOpen ? game.name : '🔒'}</p>
      </div>
    </div>
  );
};

export default GameItem;
