import { useEffect, useState } from 'react';
import { Game } from '../../../entities/game';
import { fetchGames } from '../adapters/api/gameService';

const useGamesInfo = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlanets = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (error) {
        setError('Failed to load Subjects');
      }
    };

    loadPlanets();
  }, []);

  return { games, error };
};

export default useGamesInfo;
