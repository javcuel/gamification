import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { Game } from '../../shared/api/domain/game';

import '../styles/game-item.css';

/**
 * @property {Game} game - The game to display.
 */
interface GameProps {
	game: Game;
}

/**
 * GameItem component
 *
 * Renders a single game card with an image and name.
 * - If the game is marked as visible, it is displayed; otherwise, it is not rendered.
 * - If the game is open, clicking the card navigates to the `PLAY` route for that game.
 * - Displays a fallback image if the game image fails to load.
 * - Shows a locked message if the game is closed.
 *
 * @param game - The game object to display
 * @returns A styled React element representing a game item, or null if not visible
 */
const GameItem: React.FC<GameProps> = ({ game }) => {
	if (!game.isVisible) return null;

	const navigate = useNavigate();

	/**
	 * handleClick
	 *
	 * Navigates to the game play route if the game is open.
	 */
	const handleClick = () => {
		if (game.isOpen) navigate(ROUTES.PLAY(game.id));
	};

	// Apply different class styles depending on whether the game is open
	const gameClassName = game.isOpen ? 'game-item' : 'game-item-disabled';

	return (
		<div className={gameClassName} onClick={() => handleClick()}>
			<img
				className='game-item-img'
				src={game.img}
				onError={e => {
					// Fallback image if the original source fails to load
					e.currentTarget.src = '/images/default_game_image.png';
				}}
				alt={game.name}
			/>
			<div className='game-item-img-overlay'>
				<div>
					{game.isOpen ? (
						<>
							{game.name}
							<hr />
							Max Score: {game.maxScore}
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
