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

/**
 * GameManagementItem component
 *
 * Displays a single game entry within the game management panel.
 * - Allows toggling game visibility and accessibility (open/closed).
 * - Supports in-place editing via a modal.
 * - Handles game deletion with confirmation.
 * - Displays feedback via toast messages.
 *
 * @param game - The game entity to render and manage
 * @param onGameDeleted - Callback triggered after a successful deletion
 */
const GameManagementItem: React.FC<GameManagementItemProps> = ({
	game,
	onGameDeleted
}) => {
	const [isEditing, setIsEditing] = useState(false);

	/**
	 * Hook to handle updating game data.
	 * Automatically closes the edit modal on successful update.
	 */
	const {
		updateGame,
		loading: updateLoading,
		error: updateError
	} = useUpdateGame(() => {
		setIsEditing(false);
	});

	/**
	 * Hook to handle toggling game open/locked state.
	 */
	const {
		isOpen,
		error: openError,
		toggleOpenState
	} = useToggleGameOpenState(game);

	/**
	 * Hook to handle toggling game visibility state.
	 */
	const {
		isVisible,
		error: visibleError,
		toggleVisibleState
	} = useToggleGameVisibleState(game);

	/**
	 * Hook to handle deleting a game.
	 * Triggers the onGameDeleted callback after successful deletion.
	 */
	const {
		deleteGame,
		loading: deleteLoading,
		error: deleteError
	} = useDeleteGame(onGameDeleted);

	/**
	 * Submits updated game data to the update hook.
	 *
	 * @param updatedData - The modified game values from the modal
	 */
	const handleSaveGame = (updatedData: GameUpdate) => {
		updateGame(game.id, updatedData);
	};

	/**
	 * Opens the edit modal for the current game.
	 */
	const handleEditClick = () => {
		setIsEditing(true);
	};

	/**
	 * Prompts for confirmation and deletes the game if confirmed.
	 */
	const handleDeleteClick = () => {
		if (window.confirm('Are you sure you want to delete this game?')) {
			deleteGame(game.id);
		}
	};

	return (
		<div className='game-management-item'>
			<div className='d-flex justify-content-between align-items-center'>
				{/* Game image */}
				<img
					src={game.img}
					onError={e => {
						e.currentTarget.src = '/images/default_game_image.png';
					}}
					alt={game.name}
					width='5%'
					className='game-management-item-image me-3'
				/>

				{/* Game info */}
				<div className='flex-grow-1'>
					{game.name} - Max Score: {game.maxScore}
				</div>

				{/* Action buttons */}
				<div className='game-item-buttons'>
					<Button type={isOpen ? 'unlock' : 'lock'} onClick={toggleOpenState} />
					<Button
						type={isVisible ? 'visible' : 'hidden'}
						onClick={toggleVisibleState}
					/>
					<Button type='edit' onClick={handleEditClick} />
					<Button
						type='delete'
						onClick={handleDeleteClick}
						disabled={deleteLoading}
					/>
				</div>
			</div>

			{/* Toasts and loading state feedback */}
			{visibleError && <Toast type='error' message={visibleError} />}
			{openError && <Toast type='error' message={openError} />}
			{updateError && <Toast type='error' message={updateError} />}
			{deleteError && <Toast type='error' message={deleteError} />}
			{updateLoading && <div>Loading update...</div>}

			{/* Edit modal */}
			{isEditing && (
				<GameEditModal
					data={{
						idSubject: game.idSubject,
						name: game.name,
						img: game.img,
						maxScore: game.maxScore
					}}
					onClose={() => setIsEditing(false)}
					onSave={handleSaveGame}
				/>
			)}
		</div>
	);
};

export default GameManagementItem;
