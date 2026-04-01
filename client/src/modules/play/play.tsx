import React from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../shared/components/NavBar/NavBar';
import Toast from '../shared/components/ui/toast';
import Iframe from './components/iframe';
import usePlay from './hooks/use-play';

/**
 * Play component
 *
 * Page responsible for displaying a playable game embedded via iframe.
 * - Retrieves the game ID from the URL parameters.
 * - Loads game data using the `usePlay` hook.
 * - Displays the game in an iframe if found.
 * - Shows an error toast if the game is not available.
 *
 * @returns A React element for the game play screen.
 */
const Play: React.FC = () => {
	const { gameId } = useParams<{ gameId: string }>();

	// Fetch game data using the custom hook
	const data = usePlay(Number(gameId));

	return (
		<div className='container-fluid min-vh-100 d-flex flex-column'>
			<NavBar webName='Gamispace' />
			{data.game ? (
				<Iframe selectedGame={data.game} />
			) : (
				<Toast type='error' message={'No game founded'} />
			)}
		</div>
	);
};

export default Play;
