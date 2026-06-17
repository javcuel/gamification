import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { Game } from '../../shared/api/domain/game';
import { GameSessionStart } from '../../shared/api/domain/game-session'; 
import { gameSessionRepository } from '../../shared/api/repository/game-session.repository';

import '../styles/game-item.css';
import StorageService from '../../../services/storage-service';

/**
 * @property {Game} game - The game to display.
 * @property {number} subjectId - The ID of the subject from which the game is accessed.
 */
interface GameProps {
	game: Game;
    subjectId: number; 
}

/**
 * GameItem component
 */
const GameItem: React.FC<GameProps> = ({ game, subjectId }) => {
	if (!game.isVisible) return null;

	const navigate = useNavigate();

	const handleClick = async () => {
		if (game.isOpen) {
			try {
				const sessionId = StorageService.getItem('sessionId');
				
				if (sessionId) {
					const sessionData = new GameSessionStart(
						Number(sessionId),
						game.id,
						subjectId
					);
					
					const gameSessionId = await gameSessionRepository.start(sessionData);
					
					sessionStorage.setItem('activeGameSessionId', gameSessionId.toString());
				}
			} catch (error) {
				console.error("Could not register game session", error);
			}

			navigate(ROUTES.PLAY(game.id));
		}
	};

	const gameClassName = game.isOpen ? 'game-item' : 'game-item-disabled';

	return (
		<div className={gameClassName} onClick={() => handleClick()}>
			<img
				className='game-item-img'
				src={game.img}
				onError={e => {
					e.currentTarget.src = '/images/default_game_image.png';
				}}
				alt={game.name}
			/>
			<div className='game-item-img-overlay'>
				<div>
					{game.isOpen ? (
						<>
							{game.name}
						</>
					) : (
						'🔒Closed!'
					)}
				</div>
			</div>
		</div>
	);
};

export default GameItem;