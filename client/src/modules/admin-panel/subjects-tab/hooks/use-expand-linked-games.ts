import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

/**
 * useExpandLinked hook
 *
 * Manages the expanded/collapsed state of a subject row and fetches related games on demand.
 * - Fetches games only once when expanding for the first time.
 * - Provides loading and error state feedback during data retrieval.
 *
 * @param subjectId - The ID of the subject whose games are to be loaded
 * @returns An object containing:
 * - `games`: Array of games related to the subject
 * - `setGames`: Setter to manually update the games list if needed
 * - `isExpanded`: Boolean indicating if the subject is currently expanded
 * - `loading`: Boolean indicating whether games are being fetched
 * - `error`: String describing any fetch error
 * - `toggleExpand`: Function to toggle the expanded state and optionally trigger data loading
 */
const useExpandLinked = (subjectId: number) => {
	const [linkedGames, setLinkedGames] = useState<Game[]>([]); // Renombrado
	const [isExpanded, setIsExpanded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const toggleExpand = async () => {
		setIsExpanded(prev => !prev);
		if (!isExpanded && linkedGames.length === 0) {
			setLoading(true);
			setError(null);
			try {
				const data = await gameRepository.getLinkedGamesById(subjectId);
				setLinkedGames(data);
			} catch (error: unknown) {
				setError(error instanceof Error ? error.message : 'An unknown error occurred');
			} finally {
				setLoading(false);
			}
		}
	};

    // Ahora devuelve linkedGames y setLinkedGames
	return { linkedGames, setLinkedGames, isExpanded, loading, error, toggleExpand };
};

export default useExpandLinked;
