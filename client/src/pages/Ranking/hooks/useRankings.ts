import { useEffect, useState } from 'react';
import {
  Ranking,
  fetchRankingPlayers,
  fetchRankingGroups,
  fetchRankingPlayersByGame,
  fetchRankingGroupsByGame,
} from '../api/ranking';
import { RANKING_TYPES } from '../../../constants/rankingTypes';

const useRankings = (rankingType: string, selectedGame: number) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingData = async () => {
      try {
        let data;
        if (rankingType === RANKING_TYPES.PLAYERS) {
          data = await fetchRankingPlayers();
        } else if (RANKING_TYPES.GROUPS) {
          data = await fetchRankingGroups();
        } else if (RANKING_TYPES.PLAYERS_BY_GAME) {
          data = await fetchRankingPlayersByGame(selectedGame);
        } else if (RANKING_TYPES.GROUPS_BY_GAME) {
          data = await fetchRankingGroupsByGame(selectedGame);
        }
        if (data) setRankings(data);
      } catch (error) {
        setError('Failed to load rankings');
        console.error(error);
      }
    };

    loadRankingData();
  }, [rankingType, selectedGame]);

  return { rankings, error };
};

export default useRankings;
