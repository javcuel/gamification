import {
  faEye,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faTimes,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Game } from '../../../entities/game';
import useToggleGameOpenState from '../hooks/useToggleGameOpenState';
import useToggleGameVisibleState from '../hooks/useToggleGameVisibleState';
import '../styles/admin-panel.css';

interface GameItemProps {
  game: Game;
}

/**
 * GameItem Component
 * Represents a single game row within a world.
 */
const GameItem: React.FC<GameItemProps> = ({ game }) => {
  const [isOpen, toggleOpenState, openLoading] = useToggleGameOpenState(
    game.id,
    game.isOpen
  );

  const [isVisible, toggleVisibleState, visibleLoading] =
    useToggleGameVisibleState(game.id, game.isOpen);

  return (
    <div className="custom-admin-panel-game-item custom-flex-center">
      {/* TODO: IMAGEN PROVISIONAL, CAMBIAR POR src={game.imgUrl} */}
      <img
        src={'src/assets/images/imagesGames/marsMiners.png'}
        alt={game.name}
        width="60"
        className="me-3"
      />
      <div className="flex-grow-1">
        <strong>{game.name}</strong> - Max Score: {game.maxScore}
      </div>
      <div>
        {/* Locked Button */}
        <button
          className={'btn custom-button m-1'}
          onClick={toggleOpenState}
          disabled={openLoading} // Disable while toggling
        >
          <FontAwesomeIcon icon={isOpen ? faUnlock : faLock} />
        </button>

        {/* Visible Button */}
        <button
          className={'btn custom-button m-1'}
          onClick={toggleVisibleState}
          disabled={visibleLoading} // Disable while toggling
        >
          <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
        </button>

        {/* Modify button */}
        <button className="btn custom-button m-1">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>

        {/* Delete Button */}
        <button className="btn custom-button m-1">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default GameItem;
