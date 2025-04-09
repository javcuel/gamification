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
import { Game } from '../../../api/game';
import useToggleGameOpenState from '../hooks/useToggleGameOpenState';
import useToggleGameVisibleState from '../hooks/useToggleGameVisibleState';

interface GameItemProps {
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
  const {
    isOpen,
    error: openError,
    toggleOpenState,
  } = useToggleGameOpenState(game.id, game.isOpen);

  const {
    isVisible,
    error: visibleError,
    toggleVisibleState,
  } = useToggleGameVisibleState(game.id, game.isOpen);

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
        <button className={'btn custom-button m-1'} onClick={toggleOpenState}>
          <FontAwesomeIcon icon={isOpen ? faUnlock : faLock} />
        </button>

        <button
          className={'btn custom-button m-1'}
          onClick={toggleVisibleState}
        >
          <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
        </button>

        <button className="btn custom-button m-1">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>

        <button className="btn custom-button m-1">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      {visibleError && <div className="text-danger">{visibleError}</div>}
      {openError && <div className="text-danger">{openError}</div>}
    </div>
  );
};

export default GameItem;
