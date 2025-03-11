import { useEffect, useState } from 'react';
import {
  fetchRankingGG,
  fetchRankingGJ,
  fetchRankingJG,
  fetchRankingJJ,
} from '../adapters/api/rankingService';

interface RankingEntry {
  userName?: string;
  userGroup?: string;
  totalStars?: number;
  totalScore?: number;
}

const useRankings = (rankingType: string, selectedGame: number) => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingData = async () => {
      try {
        let data;
        if (rankingType === 'JG') {
          data = await fetchRankingJG();
        } else if (rankingType === 'GG') {
          data = await fetchRankingGG();
        } else if (rankingType === 'JJ') {
          data = await fetchRankingJJ(selectedGame);
        } else if (rankingType === 'GJ') {
          data = await fetchRankingGJ(selectedGame);
        }
        setRankings(data);
      } catch (error) {
        setError('Error loading rankings');
        console.error(error);
      }
    };

    loadRankingData();
  }, [rankingType, selectedGame]);

  return { rankings, error };
};

export default useRankings;
