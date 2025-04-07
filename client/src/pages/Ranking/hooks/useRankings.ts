import { useEffect, useState } from 'react';
import { Ranking } from '../../../api/ranking';
import { RANKING_TYPES } from '../../../constants/rankingTypes';

const useRankings = (rankingType: string, selectedGame: number) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingData = async () => {
      try {
        let data;

        switch (rankingType) {
          case RANKING_TYPES.PLAYERS:
            /*   data = await RankingApi.getPlayers(); */
            data = [
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
            ];
            break;
          case RANKING_TYPES.GROUPS:
            /*        data = await RankingApi.getGroups(); */
            data = [
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
            ];
            break;
          case RANKING_TYPES.PLAYERS_BY_GAME:
            /*       data = await RankingApi.getPlayersByGame(selectedGame); */
            data = [
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
            ];
            break;
          case RANKING_TYPES.GROUPS_BY_GAME:
            /*  data = await RankingApi.getGroupsByGame(selectedGame); */
            data = [
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
            ];
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
      }
    };

    loadRankingData();
  }, [rankingType, selectedGame]);

  return { rankings, error };
};

export default useRankings;
