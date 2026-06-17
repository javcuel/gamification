import { useEffect, useState } from 'react';
import { Game } from '../../shared/api/domain/game';
import { gameRepository } from '../../shared/api/repository/game.repository';

/**
 * useRankingGames hook
 *
 * Custom hook to fetch all available games linked to a specific subject.
 * - Loads game data on initial mount or when subjectId changes.
 * - Handles loading and error states.
 *
 * @param subjectId - The ID of the currently selected subject.
 * @returns An object containing:
 * - `games`: Array of fetched game entities.
 * - `error`: Error message if the fetch fails.
 * - `loading`: Boolean indicating whether the data is still loading.
 */
const useRankingGames = (subjectId: number) => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadGames = async () => {
			if (subjectId === 0) {
				setGames([]);
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const fetchedGames = await gameRepository.getBySubject(subjectId);
				setGames(fetchedGames);
			} catch (err) {
				if (err instanceof Error) setError(err.message);
				else setError('An unknown error occurred');
			} finally {
				setLoading(false);
			}
		};

		loadGames();
	}, [subjectId]); 

	return { games, error, loading };
};

export default useRankingGames;