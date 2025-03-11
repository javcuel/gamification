import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../api/game';

interface GameProps {
  game: Game;
}

const GameItem: React.FC<GameProps> = ({ game }) => {
  if (!game.isVisible) {
    return null;
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Play/${game.id}`);
  };

  const gameClassName = game.isOpen
    ? 'image-container'
    : 'image-container-disabled';

  return (
    <div className={gameClassName} onClick={() => handleClick()}>
      <img
        className="button-img"
        src={game.img || 'images/no_image.jpg'}
        alt={game.name}
      ></img>
      <div className="image-overlay">
        <p>{game.name}</p>
      </div>
    </div>
  );
};

export default GameItem;
