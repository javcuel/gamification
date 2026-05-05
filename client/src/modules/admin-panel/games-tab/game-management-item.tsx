import React, { useState } from 'react';
import { Game, GameUpdate } from '../../shared/api/domain/game';
import Button from '../../shared/components/ui/Button';
import Toast from '../../shared/components/ui/toast';
import GameEditModal from './components/game-edit-modal'; 
import useDeleteGame from './hooks/use-delete-game';
import useUpdateGame from './hooks/use-update-game'; 

interface GameManagementItemProps {
	game: Game;
	onDelete: (id: number) => void;
}

const GameManagementItem: React.FC<GameManagementItemProps> = ({ game, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);

	const { updateGame, loading: updateLoading, error: updateError } = useUpdateGame(() => {
		setIsEditing(false);
	});

	const { deleteGame, loading: deleteLoading, error: deleteError } = useDeleteGame(onDelete);

	const handleSave = (updatedData: GameUpdate) => {
		updateGame(game.id, updatedData);
	};

	return (
		<li className='user-management-item'>
			<div className='user-management-item-buttons'>
				<Button type='edit' onClick={() => setIsEditing(true)} />
				<Button type='delete' onClick={() => deleteGame(game.id)} disabled={deleteLoading} />
			</div>

			{isEditing && (
				<GameEditModal 
					data={game} 
					onClose={() => setIsEditing(false)} 
					onSave={handleSave} 
				/>
			)}

			{(updateError || deleteError) && (
				<Toast type='error' message={updateError || deleteError || ''} />
			)}
			{updateLoading && <div>Updating...</div>}
		</li>
	);
};