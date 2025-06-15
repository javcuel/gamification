import { useEffect, useState } from 'react';
import { Game } from '../../shared/api/domain/game';

/**
 * usePlay hook
 *
 * Fetches the details of a specific game based on its ID.
 * Currently uses mocked data for the game object.
 * Handles loading errors gracefully and stores the game state.
 *
 * @param gameId - The ID of the game to retrieve
 * @returns An object containing:
 * - `game`: The fetched game object (if available)
 * - `error`: Error message if the fetch fails
 */
const usePlay = (gameId: number) => {
	const [game, setGame] = useState<Game>();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		/**
		 * loadGame
		 *
		 * Asynchronously loads the game data. Currently using a mocked game object.
		 * In production, replace with actual API call to fetch game by ID.
		 *
		 * @param gameId - The ID of the game to fetch
		 */
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const loadGame = async (gameId: number) => {
			try {
				// TODO: Replace with actual API call when ready
				// const data = await GameApi.getById(gameId);

				// Mocked game data
				const data = {
					id: 127,
					idSubject: 1,
					img: '',
					name: 'Cafetería',
					maxScore: 8000,
					isOpen: true,
					isVisible: true,
					position: 1,
					idUser: 2,
					isNew: true,
					uploaded: true
				};
				setGame(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError('An unknown error occurred');
				}
			}
		};

		loadGame(gameId);
	}, [gameId]);

	return { game, error };
};

export default usePlay;
