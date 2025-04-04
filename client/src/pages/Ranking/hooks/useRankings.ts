import { useEffect, useState } from 'react';
import { Ranking, RankingApi } from '../../../api/ranking';
import { RANKING_TYPES } from '../../../constants/rankingTypes';

const useRankings = (rankingType: string, selectedGame: number) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingData = async () => {
      try {
        let data;
        if (rankingType === RANKING_TYPES.PLAYERS) {
          data = await RankingApi.getPlayers();
        } else if (RANKING_TYPES.GROUPS) {
          data = await RankingApi.getGroups();
        } else if (RANKING_TYPES.PLAYERS_BY_GAME) {
          data = await RankingApi.getPlayersByGame(selectedGame);
        } else if (RANKING_TYPES.GROUPS_BY_GAME) {
          data = await RankingApi.getGroupsByGame(selectedGame);
        }
        if (data) setRankings(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    loadRankingData();
  }, [rankingType, selectedGame]);

  return { rankings, error };
};

export default useRankings;
