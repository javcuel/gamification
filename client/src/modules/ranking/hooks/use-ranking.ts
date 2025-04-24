import { useEffect, useState } from 'react';

import { Ranking } from '../api/domain/ranking';
import { rankingRepository } from '../api/repository/ranking.repository';
import { RANKING_TYPES } from '../../../constants/ranking-types';

const useRankings = (rankingType: string, gameId: number) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadRankingData = async () => {
      try {
        let data;

        switch (rankingType) {
          case RANKING_TYPES.PLAYERS:
            /*        data = [
              {
                userName: 'Juan',
                userGroup: 'x1',
                userCompletedSubjects: 4,
                userTotalScore: 600,
              },
              {
                userName: 'Mario',
                userGroup: 'x3',
                userCompletedSubjects: 1,
                userTotalScore: 6002,
              },
            ]; */

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
