import React, { useState } from 'react';
import { Game, GameUpdate } from '../../shared/api/domain/game';
import Button from '../../shared/components/ui/Button';
import Toast from '../../shared/components/ui/toast';
import GameEditModal from './components/game-edit-modal'; 
import useDeleteGame from './hooks/use-delete-game';
import useUpdateGame from './hooks/use-update-game'; 

// 1. ACTUALIZAMOS LA INTERFAZ PARA RECIBIR LAS PROPS DEL PADRE
interface GameManagementItemProps {
	game: Game;
	onGameDeleted: (id: number) => void; 
	onGameUpdated: () => void;           
}

const GameManagementItem: React.FC<GameManagementItemProps> = ({ 
    game, 
    onGameDeleted, // 2. LAS RECIBIMOS AQUÍ
    onGameUpdated 
}) => {
	const [isEditing, setIsEditing] = useState(false);

    // 3. EJECUTAMOS LA RECARGA AL CERRAR EL MODAL CON ÉXITO
	const { updateGame, loading: updateLoading, error: updateError } = useUpdateGame(() => {
		setIsEditing(false);
		onGameUpdated(); 
	});

    // 4. USAMOS EL NOMBRE CORRECTO PARA EL BORRADO
	const { deleteGame, loading: deleteLoading, error: deleteError } = useDeleteGame(onGameDeleted);

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
					data={{ name: game.name, img: game.img }} 
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

export default GameManagementItem;