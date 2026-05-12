import React, { useState } from 'react';
import { Game, GameUpdate } from '../../../shared/api/domain/game';
import useToggleGameOpenState from '../../subjects-tab/hooks/use-toggle-game-open-state';
import useToggleGameVisibleState from '../../subjects-tab/hooks/use-toggle-game-visible-state';

import Button from '../../../shared/components/ui/Button';
import Toast from '../../../shared/components/ui/toast';
import useDeleteGame from '../hooks/use-delete-game';
import useUpdateGame from '../hooks/use-update-game';
import '../styles/game-management-item.css';
import GameEditModal from './game-edit-modal';

// 1. AÑADIMOS onGameUpdated A LA INTERFAZ
interface GameManagementItemProps {
	game: Game;
	onGameDeleted: (gameId: number) => void;
	onGameUpdated: () => void; 
}

const GameManagementItem: React.FC<GameManagementItemProps> = ({
	game,
	onGameDeleted,
	onGameUpdated // 2. LA RECIBIMOS COMO PROP
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const {
		updateGame,
		loading: updateLoading,
		error: updateError
	} = useUpdateGame(() => {
		setIsEditing(false);
		onGameUpdated(); // 3. LA EJECUTAMOS AL CERRAR EL MODAL
	});

	const {
		isOpen,
		error: openError,
		toggleOpenState
	} = useToggleGameOpenState(game);

	const {
		isVisible,
		error: visibleError,
		toggleVisibleState
	} = useToggleGameVisibleState(game);

	const {
		deleteGame,
		loading: deleteLoading,
		error: deleteError
	} = useDeleteGame(onGameDeleted);

	const handleSaveGame = (updatedData: GameUpdate) => {
		updateGame(game.id, updatedData);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

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
					{game.name}
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
						name: game.name,
						img: game.img
					}}
					onClose={() => setIsEditing(false)}
					onSave={handleSaveGame}
				/>
			)}
		</div>
	);
};

export default GameManagementItem;