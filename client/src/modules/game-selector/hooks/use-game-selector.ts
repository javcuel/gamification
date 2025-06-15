import { useEffect, useState } from 'react';
import { Game } from '../../shared/api/domain/game';
import { gameRepository } from '../../shared/api/repository/game.repository';

/**
 * useGameSelector hook
 *
 * Fetches a list of games based on a given subject ID.
 * - Initiates a request to the repository when the component mounts or subject ID changes.
 * - Stores the resulting games in local state.
 * - Handles loading and error conditions.
 *
 * @param subjectId - The ID of the subject used to filter the games
 * @returns An object containing:
 * - `games`: Array of game entities matching the subject
 * - `error`: An error message if the fetch fails
 * - `loading`: Boolean indicating the loading state
 */
const useGameSelector = (subjectId: number) => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		/**
		 * loadGames
		 *
		 * Asynchronously fetches games for the specified subject ID and updates state.
		 */
		const loadGames = async () => {
			try {
				const data = await gameRepository.getById(subjectId);
				setGames(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError('An unknown error occurred');
				}
			} finally {
				setLoading(false);
			}
		};

		loadGames();
	}, [subjectId]);

	return { games, error, loading };
};

export default useGameSelector;
