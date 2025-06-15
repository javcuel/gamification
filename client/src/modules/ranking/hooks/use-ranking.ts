import { useEffect, useState } from 'react';

import { RANKING_TYPES } from '../../../constants/ranking-types';
import { Ranking } from '../api/domain/ranking';
import { rankingRepository } from '../api/repository/ranking.repository';

/**
 * useRankings hook
 *
 * Fetches ranking data based on the selected ranking type and optional game ID.
 * Supports fetching players, groups, players by game, and groups by game.
 * Manages loading and error states internally.
 *
 * @param rankingType - The selected ranking type from RANKING_TYPES
 * @param gameId - The selected game ID used for game-specific rankings
 * @returns An object containing:
 * - `rankings`: An array of ranking data entries
 * - `error`: Error message string, if any
 * - `loading`: Boolean indicating whether the data is currently loading
 */
const useRankings = (rankingType: string, gameId: number) => {
	const [rankings, setRankings] = useState<Ranking[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		/**
		 * loadRankingData
		 *
		 * Determines the appropriate API call based on the ranking type and
		 * fetches the corresponding data from the ranking repository.
		 */
		const loadRankingData = async () => {
			try {
				let data;

				switch (rankingType) {
					case RANKING_TYPES.PLAYERS:
						data = await rankingRepository.getPlayers();
						break;
					case RANKING_TYPES.GROUPS:
						data = await rankingRepository.getGroups();
						break;
					case RANKING_TYPES.PLAYERS_BY_GAME:
						data = await rankingRepository.getPlayersByGame(gameId);
						break;
					case RANKING_TYPES.GROUPS_BY_GAME:
						data = await rankingRepository.getGroupsByGame(gameId);
						break;
					default:
						throw new Error('Invalid ranking type');
				}

				if (data) setRankings(data);
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

		loadRankingData();
	}, [rankingType, gameId]);

	return { rankings, error, loading };
};

export default useRankings;
