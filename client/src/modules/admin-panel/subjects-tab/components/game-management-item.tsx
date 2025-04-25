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
import { Game } from '../../../shared/api/domain/game';
import useToggleGameOpenState from '../hooks/use-toggle-game-open-state';
import useToggleGameVisibleState from '../hooks/use-toggle-game-visible-state';

import '../../styles/game-management-item.css';

interface GameManagementItemProps {
  game: Game;
}

const GameManagementItem: React.FC<GameManagementItemProps> = ({ game }) => {
  const {
    isOpen,
    error: openError,
    toggleOpenState,
  } = useToggleGameOpenState(game);

  const {
    isVisible,
    error: visibleError,
    toggleVisibleState,
  } = useToggleGameVisibleState(game);

  return (
    <div className="game-management-item">
      <div className="d-flex justify-content-between align-items-center">
        <img
          src={'images/no_image.jpg'}
          alt={game.name}
          width="5%"
          className="game-management-item-image me-3"
        />
        <div className="flex-grow-1">
          {game.name}- Max Score: {game.maxScore}
        </div>
        <div>
          <button
            className="game-management-item-button"
            onClick={toggleOpenState}
          >
            <FontAwesomeIcon icon={isOpen ? faUnlock : faLock} />
          </button>

          <button
            className="game-management-item-button"
            onClick={toggleVisibleState}
          >
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </button>

          <button className="game-management-item-button">
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>

          <button className="game-management-item-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
      {visibleError && <div className="text-danger">{visibleError}</div>}
      {openError && <div className="text-danger">{openError}</div>}
    </div>
  );
};

export default GameManagementItem;
