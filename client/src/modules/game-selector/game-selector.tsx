import React from 'react';
import NavBar from '../shared/components/navbar/navbar';
import GameGrid from './components/game-grid';

/**
 * GameSelector component
 *
 * Main container for the game selection view.
 * - Renders a navigation bar with the application name.
 * - Displays a grid of available games, centred within the viewport.
 * - Uses a responsive, full-height layout to ensure a clean and accessible UI.
 *
 * @returns A React element representing the game selector screen.
 */
const GameSelector: React.FC = () => {
	return (
		<div className='container-fluid min-vh-100 d-flex flex-column'>
			<NavBar webName='Gamispace' />
			<div className='flex-grow-1 d-flex align-items-center justify-content-center'>
				<GameGrid />
			</div>
		</div>
	);
};

export default GameSelector;
