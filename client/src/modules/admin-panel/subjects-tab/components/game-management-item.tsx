import React, { useState } from 'react';
import { Game, GameUpdate } from '../../../shared/api/domain/game';
import useToggleGameOpenState from '../hooks/use-toggle-game-open-state';
import useToggleGameVisibleState from '../hooks/use-toggle-game-visible-state';

import Button from '../../../shared/components/ui/button';
import Toast from '../../../shared/components/ui/toast';
import useDeleteGame from '../hooks/use-delete-game';
import useUpdateGame from '../hooks/use-update-game';
import '../styles/game-management-item.css';
import GameEditModal from './game-edit-modal';

interface GameManagementItemProps {
  game: Game;
  onGameDeleted: (gameId: number) => void;
}

const GameManagementItem: React.FC<GameManagementItemProps> = ({
  game,
  onGameDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  //Update Game Data.
  const {
    updateGame,
    loading: updateLoading,
    error: updateError,
  } = useUpdateGame(() => {
    setIsEditing(false);
  });

  // Update Open Game State.
  const {
    isOpen,
    error: openError,
    toggleOpenState,
  } = useToggleGameOpenState(game);

  // Update Visible Game State.
  const {
    isVisible,
    error: visibleError,
    toggleVisibleState,
  } = useToggleGameVisibleState(game);

  // Delete Game
  const {
    deleteGame,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteGame(onGameDeleted);

  // Handles update Game
  const handleSaveGame = (updatedData: GameUpdate) => {
    const updatedGame = new GameUpdate(
      updatedData.idSubject,
      updatedData.name,
      updatedData.img,
      updatedData.maxScore
    );
    updateGame(game.id, updatedGame);
  };

  // Handles edit modal
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handles game deletion
  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      deleteGame(game.id);
    }
  };

  return (
    <div className="game-management-item">
      <div className="d-flex justify-content-between align-items-center">
        <img
          src={game.img}
          onError={(e) => {
            e.currentTarget.src = '/images/default_game_image.png';
          }}
          alt={game.name}
          width="5%"
          className="game-management-item-image me-3"
        />
        <div className="flex-grow-1">
          {game.name} - Max Score: {game.maxScore}
        </div>
        <div className="game-item-buttons">
          <Button type={isOpen ? 'unlock' : 'lock'} onClick={toggleOpenState} />
          <Button
            type={isVisible ? 'visible' : 'hidden'}
            onClick={toggleVisibleState}
          />
          <Button type="edit" onClick={handleEditClick} />
          <Button
            type="delete"
            onClick={handleDeleteClick}
            disabled={deleteLoading}
          />
        </div>
      </div>

      {/*  //TODO: meter el loadingmsg en vez de esto */}
      {visibleError && <Toast type="error" message={visibleError} />}
      {openError && <Toast type="error" message={openError} />}
      {updateError && <Toast type="error" message={updateError} />}
      {deleteError && <Toast type="error" message={deleteError} />}
      {updateLoading && <div>Loading update...</div>}
      {isEditing && (
        <GameEditModal
          data={{
            idSubject: game.idSubject,
            name: game.name,
            img: game.img,
            maxScore: game.maxScore,
          }}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveGame}
        />
      )}
    </div>
  );
};

export default GameManagementItem;
