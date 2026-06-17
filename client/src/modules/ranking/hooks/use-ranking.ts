import { useEffect, useState } from 'react';
import { RANKING_TYPES } from '../../../constants/ranking-types';
import { PlayerRankingEntry, GroupRankingEntry } from '../api/domain/ranking';
import { rankingRepository } from '../api/repository/ranking.repository';

const useRankings = (subjectId: number, rankingType: string, gameId: number) => {
	const [rankings, setRankings] = useState<(PlayerRankingEntry | GroupRankingEntry)[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadRankingData = async () => {
			setLoading(true);
			try {
				let data;
				switch (rankingType) {
					case RANKING_TYPES.PLAYERS:
						data = await rankingRepository.getPlayersBySubject(subjectId);
						break;
					case RANKING_TYPES.GROUPS:
						data = await rankingRepository.getGroupsBySubject(subjectId);
						break;
					case RANKING_TYPES.PLAYERS_BY_GAME:
						data = await rankingRepository.getPlayersByGame(subjectId, gameId);
						break;
					case RANKING_TYPES.GROUPS_BY_GAME:
						data = await rankingRepository.getGroupsByGame(subjectId, gameId);
						break;
					default:
						throw new Error('Invalid ranking type');
				}
				if (data) setRankings(data);
			} catch (error: unknown) {
				setError(error instanceof Error ? error.message : 'An unknown error occurred');
			} finally {
				setLoading(false);
			}
		};

		if (subjectId) {
            loadRankingData();
        }
	}, [subjectId, rankingType, gameId]); 

	return { rankings, error, loading };
};

export default useRankings;