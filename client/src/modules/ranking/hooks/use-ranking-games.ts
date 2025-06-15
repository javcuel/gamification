import { useEffect, useState } from 'react';
import { Game } from '../../shared/api/domain/game';
import { gameRepository } from '../../shared/api/repository/game.repository';

/**
 * useRankingGames hook
 *
 * Custom hook to fetch all available games for use in ranking-related components.
 * - Loads game data on initial mount.
 * - Handles loading and error states.
 *
 * @returns An object containing:
 * - `games`: Array of fetched game entities.
 * - `error`: Error message if the fetch fails.
 * - `loading`: Boolean indicating whether the data is still loading.
 */
const useRankingGames = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		/**
		 * loadGames
		 *
		 * Asynchronously fetches all games from the repository and stores them in state.
		 * Handles any errors that may occur during the request.
		 */
		const loadGames = async () => {
			try {
				const fetchedGames = await gameRepository.getAll();
				setGames(fetchedGames);
			} catch (err) {
				if (err instanceof Error) setError(err.message);
				else setError('An unknown error occurred');
			} finally {
				setLoading(false);
			}
		};

		loadGames();
	}, []);

	return { games, error, loading };
};

export default useRankingGames;
