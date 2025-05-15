import { useEffect, useState } from 'react';
import { Game } from '../../shared/api/domain/game';
import { gameRepository } from '../../shared/api/repository/game.repository';

const useRankingGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const fetchedGames = await gameRepository.getAll();
        setGames(fetchedGames);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return { games, error, loading };
};

export default useRankingGames;
