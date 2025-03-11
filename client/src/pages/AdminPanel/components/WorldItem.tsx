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
import { World } from '../../../entities/world';
import useDeleteWorld from '../hooks/useDeleteWorld';
import useExpandWorld from '../hooks/useExpandWorld';
import useToggleWorldOpenState from '../hooks/useToggleWorldOpenState';
import useToggleWorldVisibleState from '../hooks/useToggleWorldVisibleState';
import '../styles/admin-panel.css';
import GameItem from './GameItem';

interface WorldItemProps {
  world: World;
  onWorldDeleted: (worldId: number) => void;
}

const WorldItem: React.FC<WorldItemProps> = ({ world, onWorldDeleted }) => {
  const { games, isExpanded, loading, error, toggleExpand } = useExpandWorld(
    world.id
  );
  const [isOpen, toggleOpenState, openLoading] = useToggleWorldOpenState(
    world.id,
    world.isOpen
  );
  const [isVisible, toggleVisibleState, visibleLoading] =
    useToggleWorldVisibleState(world.id, world.isVisible);
  const {
    handleDeleteWorld,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteWorld(onWorldDeleted);

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this world?')) {
      handleDeleteWorld(world.id);
    }
  };

  return (
    <div className="custom-admin-panel-world-item">
      {/* World Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div onClick={toggleExpand} style={{ cursor: 'pointer' }}>
          {/* TODO: Replace with actual world.imgWorldUrl */}
          <img
            src={'src/assets/images/imagesPlanets/purple_planet.png'}
            alt={world.name}
            width="60"
            className="me-3"
          />
          <strong>{world.name}</strong>
        </div>
        <div>
          {/* Locked Button */}
          <button
            className={'btn custom-button m-1'}
            onClick={toggleOpenState}
            disabled={openLoading}
          >
            <FontAwesomeIcon icon={isOpen ? faUnlock : faLock} />
          </button>

          {/* Visible Button */}
          <button
            className={'btn custom-button m-1'}
            onClick={toggleVisibleState}
            disabled={visibleLoading}
          >
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </button>

          {/* Modify Button */}
          <button className="btn custom-button m-1">
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>

          {/* Delete Button */}
          <button
            className="btn custom-button m-1"
            onClick={handleDeleteClick}
            disabled={deleteLoading}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {error && <div className="text-danger">{error}</div>}
      {deleteError && <div className="text-danger">{deleteError}</div>}

      {/* Loading Indicator */}
      {loading && <div>Loading games...</div>}

      {/* Game List */}
      {isExpanded &&
        games.map((game) => <GameItem key={game.id} game={game} />)}
    </div>
  );
};

export default WorldItem;
