import React from 'react';
import { Game } from '../../shared/api/domain/game';

interface GameIframeProps {
	selectedGame: Game;
}

/**
 * Iframe component
 *
 * Embeds a selected game inside an iframe for inline play.
 * - Displays the game's name as a heading.s
 * - Constructs the iframe source path dynamically based on the game's ID.
 * - Applies styling for layout and responsiveness.
 *
 * @component
 *
 * @param selectedGame - The game object containing ID and name to load
 * @returns  {JSX.Element}  A React element rendering the embedded game
 */
const Iframe: React.FC<GameIframeProps> = ({ selectedGame }) => {
	return (
		<div className='mt-3'>
			<h2 className='text-center'>Playing: {selectedGame.name}</h2>
			<iframe
				className='container custom-flex-center'
				title={selectedGame.name}
				src={`/${selectedGame.id}/index.html`}
				width='70%'
				height='700px'
				style={{ border: 'none' }}
			/>
		</div>
	);
};

export default Iframe;
